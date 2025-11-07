# Liga das Campeãs – SPA React (Vite)

Aplicação SPA do projeto Liga das Campeãs migrada de HTML/CSS/JS para React + Vite, preservando o visual original. Inclui autenticação com papéis (usuário comum e organizador), formulário multi-etapas de Peneiras, módulo de Campeonatos (criação/edição/gestão), integração entre inscrições e campeonatos, e dashboard do organizador.

## Pré-requisitos

- Node.js 18+ (LTS recomendado)
- npm 9+
- VS Code (recomendado)

## Extensões recomendadas (VS Code)

- ESLint (dbaeumer.vscode-eslint)

## Instalação e execução

1) Instalar dependências

```powershell
npm install
```

2) Rodar em desenvolvimento (HMR)

```powershell
npm run dev
```

3) Build de produção

```powershell
npm run build
```

4) Lint (opcional)

```powershell
npm run lint
```

## Estrutura principal

- `src/main.jsx`: bootstrap do app e execução do seed default (roda 1x) para popular dados locais.
- `src/App.jsx`: rotas (React Router) e guardas por papel.
- `src/utils/`
	- `authService.js`: usuários e sessão (localStorage/sessionStorage).
	- `campeonatosService.js`: campeonatos (CRUD, inscrições, geração de jogos, estatísticas).
	- `jogadorasService.js`: agrega jogadoras a partir de inscrições e usuários (deduplicado por email).
- `src/seed/defaultSeed.js`: cria 10 campeonatos e 22 jogadoras (inscrições), sem duplicar, e salva snapshot.
- `src/pages/`: páginas da aplicação (listadas abaixo).
- `src/components/`: layout, UI e formulários (multietapas).

## Papéis e acesso

Usuário Comum (role: `comum`)
- Acesso: Início, Equipes, Notícias, Jogos, Classificação, Perfil, Peneiras.
- Pode preencher Peneiras (4 etapas) e enviar inscrições.

Organizador (role: `organizador`)
- Acesso: Dashboard, Novo Campeonato, Editar Campeonato, Gestão de Campeonatos.
- Pode criar/editar campeonatos (formulário multietapas), ativar campeonatos e gerar jogos automaticamente quando houver inscrições suficientes.

Guardas de rota
- `RequireCommon`: exige login e bloqueia organizadores nessas rotas.
- `RequireOrganizer`: exige login e papel organizador.

## Páginas e conteúdo

- `/` – Autenticação
	- Tabs Entrar/Criar conta.
	- Modal de recuperação de senha.
	- Modais: Termos de Uso e Política de Privacidade.

- `/inicio` – Início
	- Hero destaque do dia.
	- Cards: Próximos Jogos, Últimas Notícias, Resultados Recentes.

- `/equipes` – Equipes
	- Indicadores (contadores animados).
	- Tabs: Seleções (cards) e Clubes (escudos via API com cache) + “Time em destaque”.

- `/noticias` – Notícias
	- Manchete em destaque.
	- Trending (chips de filtro).
	- Lista de cards com imagem, categoria e resumo.

- `/jogos` – Jogos
	- Tabs: Hoje, Amanhã, Resultados.
	- Lista de jogos “agendado” e “ao vivo” (com placar/minuto).

- `/classificacao` – Classificação
	- Tabela de posições (times, pontos etc.).

- `/perfil` – Meu Perfil (usuário comum)
	- Informações pessoais (editar/salvar), preferências (times favoritos, notificações), exportar PDF.
	- Segurança: troca de senha.
	- Zona de risco: exclusão de conta (remove sessão e perfil salvo).

- `/peneiras` – Peneiras (usuário comum)
	- Métricas, filtros (chips) e busca.
	- Lista de Peneiras disponíveis derivadas dos campeonatos futuros.
	- Formulário multietapas (Dados, Esportivos, Documentos, Confirmação) com salvamento de rascunho.
	- Integração: ao enviar, cria inscrição no campeonato correspondente com os dados completos.
	- Abas: Disponíveis e Minhas inscrições.

- `/organizador` – Área do organizador (rota guardada)
	- Redireciona para o Dashboard.

- `/organizador/dashboard` – Dashboard do organizador
	- Cards: Jogadoras (inscrições), Jogadoras únicas, Campeonatos ativos, Acontecendo, Próximos, Cancelados, Encerrados.
	- Tabela de campeonatos com ações rápidas.

- `/organizador/campeonatos/novo` – Cadastro de campeonato
	- Formulário multietapas (Básicos, Inscrições, Descrição, Confirmação).

- `/organizador/campeonatos/:id/editar` – Edição de campeonato
	- Mesmo formulário; edição bloqueada enquanto o campeonato estiver acontecendo.

- `/organizador/campeonatos/gestao` – Gestão de campeonatos futuros
	- Lista inscrições por campeonato, botão para gerar jogos e ativar, prévia da tabela gerada.

## Dados e persistência

- Sessão: `ff_session` (localStorage ou sessionStorage, conforme “Lembrar”).
- Usuários: `ff_users`.
- Perfil complementar por usuário: `ff_profile_<email>`.
- Peneiras (rascunhos do usuário): `ff_peneira_<email>`.
- Campeonatos + inscrições + jogos: `ff_campeonatos`.
- Seed: `ff_seed_default_v1` (flag para não duplicar) e snapshot `ff_seed_snapshot_v1`.

## Seed automático (1ª execução)

O arquivo `src/seed/defaultSeed.js` roda na primeira carga do app e:
- Cria 10 campeonatos futuros (sem duplicar nomes existentes).
- Gera 22 jogadoras com dados pessoais/esportivos/documentos.
- Inscreve as jogadoras aleatoriamente entre os campeonatos.
- Salva um snapshot final em `ff_seed_snapshot_v1`.
- Marca `ff_seed_default_v1 = '1'` para não repetir.

Para reexecutar o seed: limpe `ff_seed_default_v1` (e opcionalmente `ff_campeonatos`) no localStorage e recarregue.

## Notas

- Projeto focado em prototipagem local com dados em localStorage/sessionStorage.
- Sem backend; substituível por API real com adaptações em `authService` e `campeonatosService`.
- UI responsiva com componentes “glass/gradientes”.