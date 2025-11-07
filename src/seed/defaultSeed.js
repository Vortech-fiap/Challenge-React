import { getCampeonatos, addCampeonato, addInscricao } from '../utils/campeonatosService'

function seededFlagKey(){
  return 'ff_seed_default_v1'
}

function alreadySeeded(){
  try { return localStorage.getItem(seededFlagKey()) === '1' } catch { return false }
}

function markSeeded(){
  try { localStorage.setItem(seededFlagKey(), '1') } catch (e) { void e }
}

function randomPick(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}

function buildCampeonatos(){
  const today = new Date()
  const pad = (n)=> String(n).padStart(2,'0')
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n)
  const locais = ['São Paulo - SP','Rio de Janeiro - RJ','Belo Horizonte - MG','Curitiba - PR','Porto Alegre - RS','Recife - PE','Salvador - BA','Fortaleza - CE','Florianópolis - SC','Brasília - DF']
  const categorias = ['Sub-13','Sub-15','Sub-17','Sub-20','Adulto']
  const nomes = [
    'Copa Aurora Feminina',
    'Taça Brasil do Futuro',
    'Torneio Estrelas da Base',
    'Liga Diamante Feminina',
    'Copa Amazônica',
    'Troféu Atlântico',
    'Copa do Cerrado',
    'Taça do Litoral',
    'Copa das Campeãs',
    'Desafio Nacional Feminino'
  ]
  const out = []
  for(let i=0;i<10;i++){
    const ini = addDays(today, (i+1)*3)
    const fim = addDays(ini, 5)
    out.push({
      nome: nomes[i],
      local: locais[i],
      inicio: `${ini.getFullYear()}-${pad(ini.getMonth()+1)}-${pad(ini.getDate())}`,
      fim: `${fim.getFullYear()}-${pad(fim.getMonth()+1)}-${pad(fim.getDate())}`,
      categoria: randomPick(categorias),
      publicoAlvo: 'Jogadoras da região',
      vagas: 16,
      premio: 'Medalhas, troféu e kits esportivos',
      taxa: [0, 20, 30, 50][i % 4],
      descricao: 'Campeonato de demonstração para popular conteúdo inicial.',
      status: 'planejado'
    })
  }
  return out
}

function buildAtletas(){
  const nomes = [
    'Ana Souza','Beatriz Lima','Carla Mendes','Daniela Rocha','Elisa Martins','Fernanda Alves','Gabriela Santos','Helena Ribeiro','Isabela Castro','Juliana Freitas','Karina Duarte','Larissa Gomes','Marina Teixeira','Natalia Silva','Olivia Pires','Patricia Nunes','Quelen Moreira','Rafaela Costa','Sabrina Faria','Taina Oliveira','Ursula Campos','Valeria Rocha'
  ]
  const posicoes = ['Goleira','Zagueira','Lateral','Volante','Meia','Atacante']
  const turnos = ['Manhã','Tarde','Noite']
  const cidades = ['São Paulo - SP','Rio de Janeiro - RJ','Campinas - SP','Niterói - RJ','Santos - SP','Curitiba - PR','Fortaleza - CE']
  const out = nomes.map((n,idx)=>{
    const email = `${n.toLowerCase().replace(/[^a-z]/g,'')}${idx+1}@exemplo.com`
    return {
      nome: n,
      email,
      dados: {
        nome: n,
        email,
        telefone: `(11) 9${String(10000000 + Math.floor(Math.random()*89999999))}`,
        idade: String(14 + Math.floor(Math.random()*15)),
        altura: String(150 + Math.floor(Math.random()*35)),
        cidade: randomPick(cidades)
      },
      esporte: {
        posicao: randomPick(posicoes),
        perna: randomPick(['Direito','Esquerdo','Ambidestro']),
        clubeAtual: '',
        turno: randomPick(turnos),
        links: ''
      },
      docs: { docName: 'rg.pdf', medicoName: 'atestado.pdf', termos: true, autorizo: true }
    }
  })
  return out
}

export default function runDefaultSeed(){
  if(alreadySeeded()) return

  const existentes = getCampeonatos()
  const nomesExistentes = new Set(existentes.map(c=>c.nome))
  const novosCampsData = buildCampeonatos().filter(c=> !nomesExistentes.has(c.nome))

  const criados = []
  for(const data of novosCampsData){
    const camp = addCampeonato(data)
    criados.push(camp)
  }

  const atletas = buildAtletas()
  const todos = [...existentes, ...criados]
  if(todos.length){
    for(const atleta of atletas){
      const destino = randomPick(todos)
      addInscricao(destino.id, { nome: atleta.nome, email: atleta.email, campos: { dados: atleta.dados, esporte: atleta.esporte, docs: atleta.docs } })
    }
  }

  try {
    const snapshot = getCampeonatos()
    const payload = { campeonatos: snapshot }
    localStorage.setItem('ff_seed_snapshot_v1', JSON.stringify(payload))
  } catch (e) { void e }

  markSeeded()
}
