import { useState } from 'react'
import Layout from '../components/Layout'
import { getCampeonatos, gerarJogosAutomaticos, updateCampeonato } from '../utils/campeonatosService'
import Modal from '../components/ui/Modal'

function isFuturo(c){
  const now = new Date();
  return new Date(c.inicio) > now && c.status !== 'cancelado' && c.status !== 'encerrado';
}

export default function CampeonatoGestao(){
  const futuros = getCampeonatos().filter(isFuturo);
  const [viewInscricao, setViewInscricao] = useState(null)

  function handleGerar(c){
    if(!c.inscricoes || c.inscricoes.length < 2){
      alert('É necessário pelo menos 2 inscrições para gerar jogos.');
      return;
    }
    gerarJogosAutomaticos(c.id);
    updateCampeonato(c.id, { status: 'ativo' });
    window.location.reload();
  }

  return (
    <Layout>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🗂️</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Gestão de Campeonatos</h1>
          <p className="text-sm text-slate-500">Gerencie campeonatos que ainda vão acontecer e gere a tabela automaticamente.</p>
        </div>
      </div>

      {futuros.length === 0 ? (
        <section className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-500">Nenhum campeonato futuro encontrado.</p>
        </section>
      ) : futuros.map(c => (
        <section key={c.id} className="glass rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{c.nome}</h2>
              <p className="text-xs text-slate-500">{c.local} • {c.inicio} — {c.fim} • Vagas: {c.vagas}</p>
            </div>
            <div className="flex items-center gap-2">
              <a href={`/organizador/campeonatos/${c.id}/editar`} className="rounded-xl bg-slate-200 text-slate-700 px-3 py-1.5 text-sm font-semibold hover:bg-slate-300">Editar</a>
              <button onClick={()=>handleGerar(c)} className="rounded-xl bg-brand-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-brand-700">Gerar jogos e ativar</button>
            </div>
          </div>

          <div className="p-3 bg-white/60 rounded-xl border border-slate-200">
            <p className="text-sm font-semibold mb-2">Inscrições ({c.inscricoes?.length || 0})</p>
            {(c.inscricoes && c.inscricoes.length > 0) ? (
              <ul className="text-sm space-y-1">
                {c.inscricoes.map(ins => {
                  const dados = ins.campos?.dados || {}
                  const esporte = ins.campos?.esporte || {}
                  return (
                    <li key={ins.id} className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-1.5 border border-slate-200">
                      <div className="min-w-0">
                        <span className="font-medium truncate inline-block max-w-[160px]">{ins.atletaNome || dados.nome || ins.atletaEmail}</span>
                        {esporte.posicao && <span className="ml-2 text-xs text-slate-500">{esporte.posicao}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=> setViewInscricao({ camp: c, ins })} className="text-xs rounded-md bg-brand-50 text-brand-700 px-2 py-1 hover:bg-brand-100">Ver</button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Nenhuma inscrição até o momento.</p>
            )}
          </div>

          {c.jogos && c.jogos.length > 0 && (
            <div className="p-3 bg-white/60 rounded-xl border border-slate-200">
              <p className="text-sm font-semibold mb-2">Prévia de Jogos</p>
              <ul className="text-sm grid md:grid-cols-2 gap-2">
                {c.jogos.map(j => (
                  <li key={j.id} className="rounded-lg border border-slate-200 px-3 py-2">Rodada {j.rodada}: {j.timeA} x {j.timeB}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}
      <Modal
        open={!!viewInscricao}
        onClose={()=> setViewInscricao(null)}
        title={viewInscricao ? `Inscrição — ${viewInscricao.ins.atletaNome || viewInscricao.ins.atletaEmail}` : 'Inscrição'}
        size="md"
      >
        {viewInscricao && (
          <div className="text-sm space-y-3">
            {(() => {
              const d = viewInscricao.ins.campos?.dados || {}
              const e = viewInscricao.ins.campos?.esporte || {}
              const docs = viewInscricao.ins.campos?.docs || {}
              return (
                <>
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <h4 className="font-semibold mb-2 text-slate-700">Dados Pessoais</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Nome:</strong> {d.nome || viewInscricao.ins.atletaNome || '-'}</li>
                      <li><strong>Email:</strong> {d.email || viewInscricao.ins.atletaEmail || '-'}</li>
                      <li><strong>Telefone:</strong> {d.telefone || '-'}</li>
                      <li><strong>Idade:</strong> {d.idade || '-'}</li>
                      <li><strong>Altura:</strong> {d.altura || '-'}</li>
                      <li><strong>Cidade/Estado:</strong> {d.cidade || '-'}</li>
                      {d.resp_nome && <li><strong>Responsável:</strong> {d.resp_nome} ({d.resp_fone || '-'})</li>}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <h4 className="font-semibold mb-2 text-slate-700">Dados Esportivos</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Posição:</strong> {e.posicao || '-'}</li>
                      <li><strong>Pé dominante:</strong> {e.perna || '-'}</li>
                      <li><strong>Clube atual:</strong> {e.clubeAtual || '-'}</li>
                      <li><strong>Disponibilidade:</strong> {e.turno || '-'}</li>
                      <li><strong>Links:</strong> {e.links || '-'}</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <h4 className="font-semibold mb-2 text-slate-700">Documentos</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Documento ID:</strong> {docs.docName || '-'}</li>
                      <li><strong>Atestado médico:</strong> {docs.medicoName || '-'}</li>
                      <li><strong>Termos:</strong> {docs.termos ? 'Aceito' : 'Não aceito'}</li>
                      <li><strong>Uso de imagem:</strong> {docs.autorizo ? 'Autorizado' : 'Não autorizado'}</li>
                    </ul>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </Modal>
    </Layout>
  )
}
