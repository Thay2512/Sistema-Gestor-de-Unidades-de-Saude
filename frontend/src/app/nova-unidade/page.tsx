'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function NovaUnidadePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idEdicao = searchParams.get("id");
  const ehEdicao = Boolean(idEdicao);
  
  const [cnes, setCnes] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [turno, setTurno] = useState("");

  const [telefone, setTelefone] = useState("");
  const [equipes, setEquipes] = useState("");
  const [equipamentos, setEquipamentos] = useState("");
  const [observacoes, setObservacoes] = useState("");
  
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (ehEdicao && idEdicao) {
      setCarregando(true);
      fetch(`http://localhost:3001/unidades/${idEdicao}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar unidade.");
          return res.json();
        })
        .then((dados) => {
          setCnes(dados.cnes ? String(dados.cnes) : "");
          setNome(dados.nome || "");
          setTipo(dados.tipo || "");
          setEndereco(dados.endereco || "");
          setTurno(dados.turno || "");
          setTelefone(dados.telefone || "");
          setEquipes(dados.equipes || "");
          setEquipamentos(dados.equipamentos || "");
          setObservacoes(dados.observacoes || "");
        })
        .catch((error) => console.error("Erro ao carregar dados para edição:", error))
        .finally(() => setCarregando(false));
    }
  }, [ehEdicao, idEdicao]);

  const handleConsultarAPI = async () => {
    if (!cnes) {
      alert("Por favor, digite o número do CNES primeiro para consultar!");
      return;
    }

    setCarregando(true);
    try {
      const resposta = await fetch(`http://localhost:3001/unidades/consulta-cnes/${cnes}`);
      
      if (!resposta.ok) {
        throw new Error("CNES não localizado na base nacional do SUS.");
      }
      
      const dados = await resposta.json();
      
      setNome(dados.nome || "");
      setTipo(dados.tipo || "");
      setEndereco(dados.endereco || "");
      setTurno(dados.turno || "");
      setTelefone(dados.telefone || "");
      
      alert("Dados carregados da API externa com sucesso! Você pode editá-los se quiser.");
    } catch (error: any) {
      alert("Não foi possível preencher via API (talvez o CNES não exista ou o DataSUS caiu). Você pode preencher todos os campos manualmente!");
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvarDefinitivo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cnes || !nome || !tipo || !turno || !endereco) {
      alert("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    const url = ehEdicao 
      ? `http://localhost:3001/unidades/${idEdicao}` 
      : "http://localhost:3001/unidades";

    const metodo = ehEdicao ? "PUT" : "POST";

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cnes: Number(cnes), 
          nome, 
          tipo, 
          turno, 
          endereco, 
          telefone: telefone || null, 
          observacoes: observacoes || null, 
          equipes: equipes || null, 
          equipamentos: equipamentos || null 
        }),
      });

      if (resposta.ok) {
        alert(ehEdicao ? "Unidade atualizada com sucesso!" : "Unidade gravada com sucesso no seu banco local!");
        router.push("/"); 
        router.refresh(); 
      } else {
        const erroJson = await resposta.json();
        alert(`Erro ao salvar: ${erroJson.error || "Verifique os dados."}`);
      }
    } catch (error) {
      alert("Erro de conexão com o servidor backend.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>
        {ehEdicao ? "EDITAR UNIDADE DE SAÚDE" : "CADASTRAR UNIDADE DE SAÚDE"}
      </h2>

      <form onSubmit={handleSalvarDefinitivo} className={styles.formulario}>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div className={styles.campo} style={{ flex: 1, marginBottom: 0 }}>
            <label>NÚMERO DO CNES *</label>
            <input 
              type="text" 
              value={cnes} 
              onChange={(e) => setCnes(e.target.value)} 
              placeholder="Digite o CNES (Ex: 5285550)" 
              disabled={ehEdicao}
              required
            />
          </div>
          {!ehEdicao && (
            <button 
              type="button" 
              onClick={handleConsultarAPI} 
              className={styles.btnSalvar} 
              style={{ height: '45px', backgroundColor: '#0056b3' }}
              disabled={carregando}
            >
              {carregando ? "Buscando..." : "🔍 Puxar da API"}
            </button>
          )}
        </div>

        <hr style={{ margin: '1.5rem 0', opacity: 0.15 }} />

        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Informações Básicas (Obrigatórias)</h3>
        
        <div className={styles.campo}>
          <label>NOME DA UNIDADE *</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome da unidade" required />
        </div>

        <div className={styles.campo}>
          <label>TIPO DE UNIDADE *</label>
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Ex: MUNICIPAL, COOPERATIVA" required />
        </div>

        <div className={styles.campo}>
          <label>ENDEREÇO COMPLETO *</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, Número - Bairro" required />
        </div>

        <div className={styles.campo}>
          <label>TURNO DE ATENDIMENTO *</label>
          <input type="text" value={turno} onChange={(e) => setTurno(e.target.value)} placeholder="Ex: MANHÃ E TARDE" required />
        </div>

        <h3 style={{ margin: '2rem 0 1rem 0', color: '#333' }}>Informações Adicionais (Opcionais)</h3>

        <div className={styles.campo}>
          <label>TELEFONE</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Ex: (35) 3621-XXXX" />
        </div>

        <div className={styles.campo}>
          <label>EQUIPES ATIVAS</label>
          <input type="text" value={equipes} onChange={(e) => setEquipes(e.target.value)} placeholder="Ex: Equipe de Saúde da Família 01, 02" />
        </div>

        <div className={styles.campo}>
          <label>EQUIPAMENTOS DISPONÍVEIS</label>
          <input type="text" value={equipamentos} onChange={(e) => setEquipamentos(e.target.value)} placeholder="Ex: Ultrassom, Eletrocardiograma, Raio-X" />
        </div>

        <div className={styles.campo}>
          <label>OBSERVAÇÕES GERAIS</label>
          <textarea 
            value={observacoes} 
            onChange={(e) => setObservacoes(e.target.value)} 
            placeholder="Alguma nota ou aviso interno sobre essa unidade..." 
            rows={4} 
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }}
          />
        </div>

        <div className={styles.zonaBotoes} style={{ marginTop: '2.5rem' }}>
          <Link href="/" className={styles.btnCancelar}>
            Cancelar
          </Link>
          <button type="submit" className={styles.btnSalvar} disabled={carregando}>
            {ehEdicao ? "Salvar Alterações" : "Salvar Unidade"}
          </button>
        </div>
      </form>
    </div>
  );
}