# QuizBrasil - Quiz Educacional Interativo 

**Versão:** 1.0  
**Data:** 18/04/2026  
**Demo:** [https://quiz-claude-code-projeto-pi.vercel.app/](https://quiz-claude-code-projeto-pi.vercel.app/)

## 📖 Descrição

Projeto pessoal criado Claude Code. O QuizBrasil é uma plataforma web interativa de quiz educacional desenvolvida para crianças entre 7 e 14 anos. O projeto oferece uma experiência gamificada com 145 questões sobre temas brasileiros, incluindo História, Geografia, Ciências, Folclore e mais.

O game mantém um sistema ranking de pontuação por 7 dias. O sistema utiliza o e-mail e nome como identificação do usuário, a maior pontuação do usuario fica disponivel no ranking. O objetivo maior é a criança ler, aprender e responder de forma correta. QUanto maior o acerto o nivel da pergunta aumenta.

## ✨ Características Principais

- **145 Questões Diversas:** Distribuídas em 12 temas diferentes, com 3 níveis de dificuldade (Fácil, Médio, Difícil)
- **Modo de Jogo:** 10 questões por round com timer de 60 segundos por questão
- **Sistema de Pontuação Inteligente:**
  - Bônus de velocidade aplicado apenas a respostas corretas
  - Multiplicador dinâmico (2.0x para ≤15s, 1.5x para 15-30s, 1.25x para 30-45s, 1.0x para 45-60s)
  
- **Design Responsivo:** Otimizado para mobile (375px+), tablet e desktop

## 🛠️ Stack Tecnológico

| Camada | Tecnologia | Propósito |
|--------|-----------|----------|
| **Frontend** | Next.js 14 (App Router) | SSR/SSG e integração com API |
| **Styling** | TailwindCSS + shadcn/ui | Design system e componentes |
| **Animações** | Framer Motion | Animações de level-up e badges |
| **Backend** | Next.js API Routes | Serverless e sem banco separado |
| **Banco de Dados** | PostgreSQL (Supabase) | Persistência relacional |
| **ORM** | Prisma | Queries type-safe e migrations |
| **Autenticação** | NextAuth.js | Credenciais com JWT (24h expiry) |
| **Validação** | Zod | Validação server-side com type inference |
| **Deploy** | Vercel + Supabase | Hosting global com CDN |

## 📁 Estrutura do Projeto

```
quiz-brasil/
├── app/                    # Páginas e layouts (Next.js App Router)
│   ├── (auth)/            # Login e registro
│   ├── dashboard/         # Dashboard principal (autenticado)
│   ├── (game)/play/       # Interface do quiz
│   ├── profile/           # Perfil do usuário
│   └── ranking/           # Leaderboard
├── api/                    # Rotas de API
│   ├── auth/              # Autenticação
│   ├── game/              # Lógica do game
│   ├── user/              # Perfil e histórico
│   └── ranking/           # Leaderboard
├── components/            # Componentes React
├── lib/                    # Utilitários (auth, scoring, validação)
├── prisma/                # Schema e seed do banco
└── public/                # Assets estáticos
```

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/igorqv/QuizClaudeCodeProjeto.git
cd QuizClaudeCodeProjeto

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com DATABASE_URL e NEXTAUTH_SECRET

# Executar migrations
npx prisma migrate dev

# Popular banco com questões
npx prisma db seed
```

### Desenvolvimento

```bash
npm run dev        # Inicia servidor em http://localhost:3000
npm run build      # Build para produção
npm start          # Inicia servidor de produção
```

### Banco de Dados

```bash
npx prisma studio # Abre GUI do Prisma Studio
npx prisma db seed # Re-popula dados (idempotente)
```

## 🎮 Fluxo do Jogo

1. **Login/Registro** → Criar conta com email e senha
2. **Dashboard** → Visualizar perfil, nível e histórico
3. **Iniciar Quiz** → 10 questões aleatórias carregadas
4. **Responder** → Timer de 60s por questão com bônus de velocidade
5. **Resultados** → Score, acertos e badges desbloqueadas
6. **Ranking** → Competir com outros jogadores

## 🎯 Temas Disponíveis

História, Geografia, Ciências, Folclore, Literatura, Arte, Esportes, Política, Economia, Tecnologia, Culinária e Natureza.


## 🔒 Segurança

- Senhas hash com bcrypt (12 salt rounds)
- JWT com expiração de 24h
- Resposta correta nunca é enviada ao cliente antes da submissão
- Pontuação calculada apenas no servidor

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ por igorqv** | Acesse a demo: [https://quiz-claude-code-projeto-pi.vercel.app/](https://quiz-claude-code-projeto-pi.vercel.app/)
