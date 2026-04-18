# PRD — QuizBrasil: Jogo de Perguntas e Respostas

> **Versão:** 1.0  
> **Data:** 2026-04-18  
> **Status:** Aprovado para Desenvolvimento (MVP)

---

## 1. Visão Geral do Produto

### 1.1 Descrição

**QuizBrasil** é uma aplicação web de quiz educativo e de entretenimento, com perguntas sobre cultura geral, história, ciências, esportes, folclore e acontecimentos do Brasil e do mundo. Usuários se cadastram, respondem perguntas em rodadas cronometradas, acumulam pontos e evoluem em níveis com conquistas (badges).

### 1.2 Problema que Resolve

- Falta de plataformas de quiz educativo em português com conteúdo focado no Brasil e no mundo
- Público primário: crianças e jovens de **7 a 14 anos** interessados em aprendizado gamificado
- Conteúdo baseado em currículo escolar brasileiro adaptado para formato digital interativo

### 1.3 Público-Alvo

| Perfil | Faixa Etária | Motivação |
|---|---|---|
| Crianças do Ensino Fundamental I e II | **7–14 anos** (primário) | Aprendizado gamificado, curiosidade, diversão |
| Adultos curiosos | 15–40 anos (secundário) | Entretenimento, desafio intelectual |
| Professores | 25–50 anos | Ferramenta de aula dinâmica |

### 1.4 Proposta de Valor

- Quiz rápido e acessível (rodada de 10 perguntas em ~10 minutos)
- Conteúdo 100% em português, com foco no Brasil
- Sistema de progressão motivador (níveis + badges)
- Gratuito, sem barreiras de acesso

---

## 2. Objetivos de Negócio (MVP)

### 2.1 Metas do MVP

| Meta | Indicador de Sucesso |
|---|---|
| Lançar plataforma funcional | Deploy em produção com todas as funcionalidades core |
| Engajamento inicial | Usuário médio completa ≥ 3 rodadas por sessão |
| Retenção | ≥ 30% dos usuários cadastrados retornam em 7 dias |
| Base de perguntas | 150 perguntas ativas com 4 alternativas cada |

### 2.2 Métricas de Acompanhamento (KPIs)

- **DAU/MAU** — Usuários ativos diários e mensais
- **Taxa de conclusão de rodada** — % de rodadas iniciadas que são finalizadas
- **Pontuação média por rodada**
- **Taxa de cadastro** — Visitantes que criam conta
- **Distribuição de níveis** — Progressão da base de usuários

### 2.3 Modelo de Negócio

- **MVP:** 100% gratuito, sem anúncios
- **Futuro:** Possibilidade de planos premium com pacotes de perguntas temáticas, ranking de escolas, torneios ao vivo

---

## 3. Funcionalidades do Produto

### 3.1 Mapa de Funcionalidades (MVP)

```
QuizBrasil MVP
├── Autenticação
│   ├── Cadastro (email + senha)
│   ├── Login
│   └── Recuperação de senha
├── Jogo
│   ├── Rodada de quiz (10 perguntas aleatórias)
│   ├── Timer por pergunta (60 segundos)
│   ├── 4 alternativas por pergunta (1 correta + 3 incorretas)
│   ├── Feedback imediato (acerto/erro + resposta correta)
│   └── Tela de resultado ao final da rodada
├── Perfil do Usuário
│   ├── Dados básicos (nome, email, avatar padrão)
│   ├── Pontuação total acumulada
│   ├── Nível atual e progresso para o próximo
│   ├── Badges conquistados
│   └── Histórico das últimas rodadas
├── Ranking
│   └── Top 10 geral (todos os tempos)
└── Banco de Perguntas
    └── 150 perguntas, 12 temas, 3 dificuldades
```

### 3.2 Detalhamento das Funcionalidades

#### 3.2.1 Cadastro e Autenticação

- Formulário: nome de exibição, email, senha (mínimo 8 caracteres)
- Validação de email único
- Hash de senha com bcrypt
- Sessão via JWT (token no localStorage ou cookie httpOnly)
- Recuperação de senha via link por email (nodemailer)

#### 3.2.2 Mecânica do Jogo

**Seleção de perguntas:**
- Cada rodada tem exatamente **10 perguntas**
- Seleção **aleatória** do banco de 150 perguntas
- Perguntas não se repetem dentro da mesma rodada
- As perguntas vêm de temas e dificuldades variados (aleatório puro)

**Interface da pergunta:**
- Exibe: número da pergunta (ex: "3/10"), tema, dificuldade (ícone colorido), enunciado, 4 alternativas (A, B, C, D), cronômetro regressivo
- Timer: **60 segundos** por pergunta
- Se o timer zerar: conta como resposta errada (0 pontos)
- Após responder: destaca a alternativa correta em verde e a errada em vermelho, exibe a explicação da resposta correta
- Botão "Próxima" aparece após resposta ou ao zerar o timer

**Alternativas:**
- Cada pergunta tem 1 resposta correta (do arquivo `game.md`) + 3 respostas incorretas geradas (seed do banco)
- Alternativas são embaralhadas a cada rodada (ordem aleatória)

#### 3.2.3 Sistema de Pontuação

**Pontos base por dificuldade:**

| Dificuldade | Pontos Base |
|---|---|
| 🟢 Fácil | 20 pts |
| 🟡 Médio | 40 pts |
| 🔴 Difícil | 60 pts |

**Bônus de velocidade** (aplicado apenas em respostas corretas):

```
Tempo restante > 45s  → bônus de 100% (pontos base × 2)
Tempo restante 30-45s → bônus de 50%  (pontos base × 1.5)
Tempo restante 15-30s → bônus de 25%  (pontos base × 1.25)
Tempo restante 0-15s  → sem bônus     (pontos base × 1)
Resposta errada       → 0 pontos
```

**Exemplo de pontuação numa rodada:**
- 3 perguntas fáceis certas em < 15s = 3 × 20 × 2 = 120 pts
- 4 perguntas médias certas em 30-45s = 4 × 40 × 1.5 = 240 pts
- 3 perguntas difíceis erradas = 0 pts
- **Total da rodada: 360 pts**

#### 3.2.4 Sistema de Níveis

| Nível | Nome | Pontuação Total Necessária | Badge |
|---|---|---|---|
| 1 | Curioso | 0 – 499 pts | 🌱 |
| 2 | Aprendiz | 500 – 1.999 pts | 📚 |
| 3 | Conhecedor | 2.000 – 4.999 pts | 🎓 |
| 4 | Especialista | 5.000 – 9.999 pts | 🏆 |
| 5 | Mestre | 10.000+ pts | 👑 |

- A pontuação é **acumulada** (soma de todas as rodadas)
- O nível sobe automaticamente ao atingir o threshold
- Ao subir de nível: notificação animada na tela

#### 3.2.5 Sistema de Badges (Conquistas)

| Badge | Nome | Critério |
|---|---|---|
| 🎯 | Primeira Resposta | Acertou a primeira pergunta |
| ✅ | Primeiro Quiz | Completou a primeira rodada |
| 🔥 | Em Chamas | 5 acertos consecutivos em uma rodada |
| ⚡ | Relâmpago | Respondeu 3 perguntas em menos de 10s cada |
| 🌟 | Nota 10 | Acertou todas as 10 perguntas de uma rodada |
| 📚 | Aprendiz | Alcançou o Nível 2 |
| 🎓 | Conhecedor | Alcançou o Nível 3 |
| 🏆 | Especialista | Alcançou o Nível 4 |
| 👑 | Mestre | Alcançou o Nível 5 |
| 🗺️ | Explorador | Completou 10 rodadas |
| 🏅 | Veterano | Completou 50 rodadas |

#### 3.2.6 Ranking Geral

- Exibe os **Top 10 jogadores** por pontuação total acumulada
- Colunas: posição, avatar, nome, nível, pontuação total
- Usuário logado vê sua posição mesmo que esteja fora do Top 10
- Atualização em tempo real após cada rodada

#### 3.2.7 Perfil do Usuário

- Nome de exibição
- Avatar (seleção de avatares pré-definidos — sem upload de imagem no MVP)
- Nível atual + barra de progresso para o próximo nível
- Pontuação total
- Total de rodadas jogadas
- Taxa de acerto (%)
- Badges conquistados
- Histórico das últimas 10 rodadas (data, pontuação, acertos/10)

---

## 4. Fluxo do Usuário

```
[Landing Page]
    │
    ├── [Cadastro] → email + senha → [Confirmar] → [Dashboard]
    └── [Login] ──────────────────────────────────→ [Dashboard]

[Dashboard]
    ├── Pontuação atual, nível, badges recentes
    ├── Botão "Jogar Agora" → [Rodada de Quiz]
    ├── Link "Ranking" → [Ranking Geral]
    └── Link "Perfil" → [Perfil do Usuário]

[Rodada de Quiz]
    ├── Pergunta 1/10 → resposta → feedback → próxima
    ├── ...
    ├── Pergunta 10/10 → resposta → feedback
    └── [Tela de Resultado]
            ├── Pontos desta rodada
            ├── Acertos (X/10)
            ├── Pontuação total atualizada
            ├── Subiu de nível? → animação de level up
            ├── Badge nova? → animação de badge
            └── Botões: "Jogar Novamente" | "Ver Perfil" | "Ranking"
```

---

## 5. Especificações Técnicas

### 5.1 Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR/SSG, roteamento, performance |
| **Estilização** | TailwindCSS + shadcn/ui | Velocidade de desenvolvimento, design consistente |
| **Animações** | Framer Motion | Animações de nível up e badges |
| **Backend** | Next.js API Routes (Route Handlers) | Monorepo simplificado, serverless |
| **Banco de Dados** | PostgreSQL | Relacional, confiável, suporte a JSON |
| **ORM** | Prisma | Type-safe, migrations automáticas |
| **Autenticação** | NextAuth.js (Credentials Provider) | Integração nativa com Next.js |
| **Validação** | Zod | Validação de schemas no front e back |
| **Deploy** | Vercel (frontend + API) + Supabase (PostgreSQL) | Custo zero no MVP, stack global |

### 5.2 Arquitetura do Sistema

```
┌─────────────────────────────────────────────┐
│                  CLIENTE                     │
│           Next.js App (Browser)              │
│  React Components + TailwindCSS + shadcn/ui  │
└──────────────────┬──────────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────────┐
│               SERVIDOR                       │
│        Next.js API Routes (Vercel)           │
│  /api/auth  /api/game  /api/user  /api/rank  │
└──────────────────┬──────────────────────────┘
                   │ Prisma ORM
┌──────────────────▼──────────────────────────┐
│              BANCO DE DADOS                  │
│              PostgreSQL (Supabase)           │
│  users | questions | answers | game_sessions │
│  user_badges | badges                        │
└─────────────────────────────────────────────┘
```

### 5.3 Estrutura de Diretórios

```
quiz-brasil/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (game)/
│   │   ├── play/page.tsx          # Rodada de quiz
│   │   └── result/[sessionId]/page.tsx
│   ├── dashboard/page.tsx
│   ├── profile/page.tsx
│   ├── ranking/page.tsx
│   └── layout.tsx
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── game/
│   │   ├── start/route.ts         # Inicia rodada, sorteia 10 perguntas
│   │   ├── answer/route.ts        # Processa resposta + calcula pontos
│   │   └── finish/route.ts        # Finaliza rodada, atualiza perfil
│   ├── user/
│   │   ├── profile/route.ts
│   │   └── history/route.ts
│   └── ranking/route.ts
├── components/
│   ├── game/
│   │   ├── QuestionCard.tsx
│   │   ├── Timer.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── ResultScreen.tsx
│   ├── ui/                        # shadcn/ui components
│   ├── LevelBadge.tsx
│   ├── ProgressBar.tsx
│   └── RankingTable.tsx
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # NextAuth config
│   ├── scoring.ts                 # Lógica de pontuação e velocidade
│   ├── levels.ts                  # Thresholds de nível e badges
│   └── validators.ts              # Schemas Zod
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                    # Seed das 150 perguntas + respostas incorretas
└── public/
    └── avatars/                   # Avatares pré-definidos (SVG)
```

### 5.4 Modelo de Dados (Prisma Schema)

```prisma
model User {
  id            String         @id @default(cuid())
  name          String
  email         String         @unique
  passwordHash  String
  avatarId      Int            @default(1)
  totalScore    Int            @default(0)
  level         Int            @default(1)
  gamesPlayed   Int            @default(0)
  totalCorrect  Int            @default(0)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  sessions      GameSession[]
  userBadges    UserBadge[]
}

model Question {
  id              String    @id @default(cuid())
  number          Int       @unique  // 1-150, número original do game.md
  theme           String    // "Historia do Brasil", "Ciencias", etc.
  difficulty      String    // "easy" | "medium" | "hard"
  basePoints      Int       // 20 | 40 | 60
  questionText    String
  correctAnswer   String
  wrongAnswer1    String
  wrongAnswer2    String
  wrongAnswer3    String
  explanation     String    // Texto da resposta do game.md

  sessionAnswers  SessionAnswer[]
}

model GameSession {
  id          String          @id @default(cuid())
  userId      String
  user        User            @relation(fields: [userId], references: [id])
  score       Int             @default(0)
  correctCount Int            @default(0)
  status      String          @default("in_progress") // "in_progress" | "completed"
  startedAt   DateTime        @default(now())
  finishedAt  DateTime?

  answers     SessionAnswer[]
}

model SessionAnswer {
  id            String      @id @default(cuid())
  sessionId     String
  session       GameSession @relation(fields: [sessionId], references: [id])
  questionId    String
  question      Question    @relation(fields: [questionId], references: [id])
  chosenAnswer  String
  isCorrect     Boolean
  timeSpentMs   Int         // milissegundos gastos para responder
  pointsEarned  Int
  answeredAt    DateTime    @default(now())
}

model Badge {
  id          String      @id @default(cuid())
  key         String      @unique  // "first_answer", "perfect_game", etc.
  name        String
  description String
  icon        String      // emoji ou nome do ícone

  userBadges  UserBadge[]
}

model UserBadge {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  badgeId   String
  badge     Badge    @relation(fields: [badgeId], references: [id])
  earnedAt  DateTime @default(now())

  @@unique([userId, badgeId])
}
```

### 5.5 API Endpoints

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário | Não |
| POST | `/api/auth/login` | Login (NextAuth) | Não |
| POST | `/api/game/start` | Sorteia 10 perguntas, cria GameSession | Sim |
| POST | `/api/game/answer` | Processa resposta, retorna pontos | Sim |
| POST | `/api/game/finish` | Finaliza sessão, atualiza User, verifica badges | Sim |
| GET | `/api/user/profile` | Dados do perfil do usuário logado | Sim |
| GET | `/api/user/history` | Histórico das últimas 10 sessões | Sim |
| GET | `/api/ranking` | Top 10 + posição do usuário logado | Não |

### 5.6 Lógica de Pontuação (lib/scoring.ts)

```typescript
// Pontos base por dificuldade
const BASE_POINTS = { easy: 20, medium: 40, hard: 60 }

// Multiplicador por velocidade (timer de 60s)
function getSpeedMultiplier(timeSpentMs: number): number {
  const seconds = timeSpentMs / 1000
  if (seconds <= 15)  return 2.0   // respondeu nos primeiros 15s
  if (seconds <= 30)  return 1.5   // respondeu entre 15s e 30s
  if (seconds <= 45)  return 1.25  // respondeu entre 30s e 45s
  return 1.0                       // respondeu entre 45s e 60s
}

export function calculatePoints(
  difficulty: 'easy' | 'medium' | 'hard',
  isCorrect: boolean,
  timeSpentMs: number
): number {
  if (!isCorrect) return 0
  const base = BASE_POINTS[difficulty]
  const multiplier = getSpeedMultiplier(timeSpentMs)
  return Math.round(base * multiplier)
}
```

### 5.7 Verificação de Badges (lib/levels.ts)

Após cada rodada finalizada, o servidor verifica se o usuário desbloqueou novos badges:

```typescript
export async function checkAndAwardBadges(
  userId: string,
  session: GameSession,
  updatedUser: User
): Promise<Badge[]> {
  const newBadges: Badge[] = []
  
  // Verifica cada critério de badge
  // Retorna lista de badges recém conquistados
  // Persiste no banco via UserBadge
  // ...
}
```

### 5.8 Segurança

- Senhas com **bcrypt** (salt rounds: 12)
- JWT com expiração de **24h** (renovação automática via NextAuth)
- Validação de todas as entradas com **Zod** no servidor
- Rate limiting nas rotas de auth: máximo 10 tentativas/IP/minuto
- Resposta correta **nunca enviada ao cliente** antes da resposta do usuário
- IDs das sessões não previsíveis (CUID)
- Proteção CSRF via NextAuth

### 5.9 Performance

- Perguntas pré-carregadas no início da rodada (não uma a uma)
- Índice no banco: `Question(theme, difficulty)`, `User(totalScore)` para ranking
- Imagens de avatares em SVG (< 5KB cada)
- Next.js Image Optimization para qualquer asset visual

---

## 6. Banco de Perguntas

### 6.1 Estrutura das Perguntas

O arquivo `game.md` contém 150 perguntas organizadas em 12 temas:

| # | Tema | Fácil | Médio | Difícil |
|---|---|---|---|---|
| 1 | História do Brasil | 5 | 5 | 4 |
| 2 | História do Mundo | 3 | 3 | 3 |
| 3 | Guerras | 3 | 4 | 3 |
| 4 | Capitais do Mundo | 8 | 6 | 3 |
| 5 | Capitais Brasileiras | 6 | 5 | 3 |
| 6 | Folclore Brasileiro | 5 | 6 | 4 |
| 7 | Ciências | 5 | 5 | 4 |
| 8 | Geografia | 4 | 3 | 2 |
| 9 | Cultura & Arte | 4 | 4 | 3 |
| 10 | Matemática | 3 | 3 | 3 |
| 11 | Acontecimentos do Mundo | 5 | 6 | 5 |
| 12 | Esportes | 3 | 2 | 1 |
| **Total** | | **57** | **57** | **36** | **150** |

### 6.2 Respostas Incorretas

Cada pergunta no `game.md` possui apenas a resposta correta. O script de seed (`prisma/seed.ts`) populará o banco com **3 respostas incorretas plausíveis** por pergunta, geradas para:
- Serem plausíveis (não absurdas)
- Serem do mesmo domínio da pergunta
- Não serem óbvias como erradas

**Estratégia de geração:**
- Para perguntas de datas/anos: variações numéricas próximas
- Para perguntas de nomes/pessoas: outros personagens do mesmo contexto histórico
- Para perguntas de capitais: outras cidades do mesmo país ou região
- Para perguntas de ciências: conceitos relacionados mas distintos

### 6.3 Seed do Banco

O arquivo `prisma/seed.ts` deve:
1. Ler as 150 perguntas do `game.md` (ou de um JSON derivado)
2. Inserir todas as perguntas com as 3 respostas incorretas já definidas
3. Inserir os 11 badges disponíveis
4. Ser idempotente (upsert, não insert duplicado)

---

## 7. Interface do Usuário (UI/UX)

### 7.1 Paleta de Cores

| Token | Cor | Uso |
|---|---|---|
| `primary` | `#1E40AF` (azul) | Botões principais, links |
| `success` | `#16A34A` (verde) | Resposta correta |
| `error` | `#DC2626` (vermelho) | Resposta errada |
| `warning` | `#D97706` (âmbar) | Timer abaixo de 15s |
| `neutral` | `#1F2937` (cinza escuro) | Texto principal |
| `background` | `#F9FAFB` | Fundo |

### 7.2 Telas Principais

**Landing Page:**
- Logo + nome do jogo
- Descrição rápida + CTA "Jogar Agora"
- Preview do ranking (Top 3 anonimizado)

**Dashboard (pós-login):**
- Card de boas-vindas com nome, nível e barra de progresso
- Botão grande "Jogar Agora"
- Últimas badges conquistadas
- Link para Ranking e Perfil

**Tela de Jogo:**
- Header: progresso "3/10" + timer circular animado
- Área central: enunciado da pergunta
- 4 cards de alternativa (A, B, C, D) — clicável, hover com destaque
- Após resposta: feedback imediato + explicação resumida

**Tela de Resultado:**
- Placar da rodada (pontos + acertos/10)
- Animação de level up (se aplicável)
- Animação de badge (se desbloqueada)
- Botão "Jogar Novamente"

### 7.3 Design para Público Infantil (7–14 anos)

O produto é primariamente voltado a crianças. As decisões de UI devem priorizar clareza, diversão e acessibilidade cognitiva.

**Tipografia:**
- Fonte sem serifa, arredondada e legível (ex: `Nunito`, `Poppins` ou `Fredoka One` para títulos)
- Tamanho mínimo de texto: **18px** em mobile, **20px** em desktop
- Evitar parágrafos longos — máximo 2 linhas por enunciado de pergunta

**Botões e Alternativas:**
- Botões grandes com área de toque mínima de **48×48px**
- Alternativas em cards com ícone de letra (A, B, C, D) em destaque
- Hover e tap com feedback visual imediato (escala + cor)
- Nunca usar ícones ambíguos sem legenda

**Feedback de Resposta (regra crítica):**
- **Resposta correta:** card fica verde + ícone ✅ + som de acerto (opcional)
- **Resposta errada:** card escolhido fica vermelho + ícone ❌ + card correto fica verde automaticamente
- Exibir a explicação da resposta correta em linguagem simples e curta (máximo 2 linhas visíveis)
- O usuário deve sair de cada pergunta sabendo qual era a resposta certa, mesmo que tenha errado

**Cores e Visual:**
- Paleta vibrante e alegre (sem tons acinzentados dominantes)
- Ícones temáticos por categoria (ex: 🏆 Esportes, 🌎 Geografia, 🔬 Ciências)
- Uso de ilustrações simples ou emojis como apoio visual nos cards de nivel e badge
- Fundos com leve gradiente ou padrão suave — evitar fundo branco puro

**Linguagem:**
- Textos curtos, diretos e no vocabulário compatível com 7–14 anos
- Mensagens de encorajamento ao errar (ex: "Quase lá! A resposta era...")
- Mensagens de celebração ao acertar (ex: "Muito bem! +40 pontos!")
- Evitar termos técnicos no fluxo de jogo

**Animacoes:**
- Transicoes suaves entre perguntas (slide ou fade — 200ms)
- Animacao de level up com confetes ou estrelas
- Animacao de badge com brilho/pulso ao desbloquear
- Timer muda de cor: verde → amarelo → vermelho nos ultimos 15 segundos

### 7.4 Responsividade

- **Mobile-first:** layout otimizado para telas ≥ 375px
- **Tablet:** ajuste de grid em perguntas e ranking
- **Desktop:** max-width 1200px centrado

---

## 8. Roadmap

### MVP (Fase 1)

- [x] Definição do PRD
- [ ] Setup do projeto (Next.js + Prisma + PostgreSQL)
- [ ] Seed das 150 perguntas com respostas incorretas
- [ ] Sistema de autenticação (cadastro + login)
- [ ] Motor de jogo (sorteio + timer + pontuação)
- [ ] Perfil do usuário + histórico
- [ ] Sistema de níveis e badges
- [ ] Ranking geral (Top 10)
- [ ] UI completa e responsiva
- [ ] Deploy em Vercel + Supabase

### Fase 2 (Pós-MVP)

- [ ] Login com Google OAuth
- [ ] Modo de jogo por tema (escolher categoria)
- [ ] Ranking semanal
- [ ] Compartilhamento de resultado no WhatsApp/Instagram
- [ ] Novas perguntas adicionadas mensalmente
- [ ] Painel admin para gerenciar perguntas

### Fase 3 (Expansão)

- [ ] App mobile (PWA ou React Native)
- [ ] Modo multiplayer em tempo real
- [ ] Torneios semanais
- [ ] Integração com escolas (turmas + professor)

---

## 9. Critérios de Aceite (MVP)

| Funcionalidade | Critério |
|---|---|
| Cadastro | Usuário cria conta com email/senha e é redirecionado ao dashboard |
| Login | Usuário acessa com credenciais e sessão persiste por 24h |
| Rodada | 10 perguntas aleatórias são exibidas com timer de 60s cada |
| Timer | Ao zerar, pergunta avança automaticamente como errada |
| Pontuação | Pontos calculados corretamente por dificuldade + velocidade |
| Nível | Nível sobe automaticamente ao atingir threshold de pontuação |
| Badge | Badges são concedidas após critérios cumpridos e exibidas no perfil |
| Ranking | Top 10 exibe posições corretas; usuário vê sua posição |
| Responsividade | Todas as telas funcionam em mobile (375px) e desktop (1440px) |
| Segurança | Resposta correta não é exposta no payload da API antes da resposta |

---

## 10. Glossário

| Termo | Definição |
|---|---|
| **Rodada** | Sessão de 10 perguntas do quiz |
| **Pontuação total** | Soma de todos os pontos de todas as rodadas de um usuário |
| **Nível** | Indicador de progressão baseado na pontuação total acumulada |
| **Badge** | Conquista desbloqueada ao cumprir critério específico |
| **Bônus de velocidade** | Multiplicador de pontos baseado no tempo de resposta |
| **Alternativa correta** | Única resposta válida entre as 4 exibidas |
| **Seed** | Script que popula o banco de dados com dados iniciais |

---

*Documento gerado em: 2026-04-18 | QuizBrasil MVP v1.0*
