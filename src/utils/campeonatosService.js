const STORAGE_KEY = 'ff_campeonatos';

function safeParse(json){
  try { return JSON.parse(json); } catch { return null; }
}

export function getCampeonatos(){
  const raw = localStorage.getItem(STORAGE_KEY) || '[]';
  const arr = safeParse(raw);
  return Array.isArray(arr) ? arr : [];
}

export function setCampeonatos(list){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { void e }
}

function slugify(str=''){
  return str
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}]+/gu,'-')
    .replace(/(^-|-$)/g,'')
    .toLowerCase();
}

export function addCampeonato(data){
  const list = getCampeonatos();
  const now = Date.now();
  const id = slugify(data.nome) + '-' + now.toString(36);
  const obj = {
    id,
    createdAt: now,
    updatedAt: now,
    status: data.status || 'planejado',
    nome: data.nome,
    local: data.local,
    inicio: data.inicio,
    fim: data.fim,
    categoria: data.categoria,
    publicoAlvo: data.publicoAlvo,
    vagas: Number(data.vagas) || 0,
    premio: data.premio || '',
    taxa: data.taxa ? Number(data.taxa) : 0,
    descricao: data.descricao || '',
    inscricoes: [],
    jogos: []
  };
  list.unshift(obj);
  setCampeonatos(list);
  return obj;
}

export function updateCampeonato(id, patch){
  const list = getCampeonatos();
  const i = list.findIndex(c => c.id === id);
  if(i === -1) return null;
  list[i] = { ...list[i], ...patch, updatedAt: Date.now() };
  setCampeonatos(list);
  return list[i];
}

export function getCampeonatoById(id){
  return getCampeonatos().find(c => c.id === id) || null;
}

export function addInscricao(campId, atleta){
  const camp = getCampeonatoById(campId);
  if(!camp) return null;
  const list = getCampeonatos();
  const i = list.findIndex(c => c.id === campId);
  const inscricao = {
    id: (atleta.email || 'anon').toLowerCase()+ '-' + Date.now().toString(36),
    atletaNome: atleta.nome,
    atletaEmail: (atleta.email || '').toLowerCase(),
    criadoEm: Date.now(),
    campos: atleta.campos || {}
  };
  list[i] = { ...list[i], inscricoes: [...(list[i].inscricoes||[]), inscricao], updatedAt: Date.now() };
  setCampeonatos(list);
  return inscricao;
}

export function removeInscricao(campId, inscricaoId){
  const list = getCampeonatos();
  const i = list.findIndex(c => c.id === campId);
  if(i === -1) return null;
  list[i] = { ...list[i], inscricoes: list[i].inscricoes.filter(ins => ins.id !== inscricaoId), updatedAt: Date.now() };
  setCampeonatos(list);
  return list[i];
}

export function gerarJogosAutomaticos(campId){
  const list = getCampeonatos();
  const i = list.findIndex(c => c.id === campId);
  if(i === -1) return null;
  const camp = list[i];
  const inscritos = camp.inscricoes || [];
  if(inscritos.length < 2) return camp;
  const nomes = inscritos.map(ins => ins.atletaNome || ins.atletaEmail);
  if(nomes.length % 2 === 1) nomes.push('BYE');
  const n = nomes.length;
  const rounds = n - 1;
  const half = n / 2;
  let arr = [...nomes];
  const jogos = [];
  for(let r=0; r<rounds; r++){
    for(let m=0; m<half; m++){
      const a = arr[m];
      const b = arr[n-1-m];
      if(a !== 'BYE' && b !== 'BYE'){
        jogos.push({ id: `j-${r}-${m}-${Date.now().toString(36)}`, rodada: r+1, timeA: a, timeB: b });
      }
    }
    arr = [arr[0], ...arr.slice(-1), ...arr.slice(1, -1)];
  }
  list[i] = { ...camp, jogos, updatedAt: Date.now() };
  setCampeonatos(list);
  return list[i];
}

export function computeCampeonatoStats(){
  const list = getCampeonatos();
  const today = new Date();
  const ativos = list.filter(c => c.status === 'ativo');
  const acontecendo = ativos.filter(c => {
    const ini = new Date(c.inicio);
    const fim = new Date(c.fim);
    return ini <= today && fim >= today;
  });
  const futuros = list.filter(c => c.status === 'planejado' && new Date(c.inicio) > today);
  const cancelados = list.filter(c => c.status === 'cancelado');
  const encerrados = list.filter(c => c.status === 'encerrado');
  return {
    total: list.length,
    ativos: ativos.length,
    acontecendo: acontecendo.length,
    futuros: futuros.length,
    cancelados: cancelados.length,
    encerrados: encerrados.length
  };
}
