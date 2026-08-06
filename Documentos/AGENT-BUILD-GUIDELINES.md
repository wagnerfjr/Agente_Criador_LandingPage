# Agent Build Guidelines
## Como o agente (Claude Code) deve se comportar durante o EXECUTE

**Status:** Regras de operação, não requisito de produto  
**Aplica-se a:** Qualquer sessão de Claude Code que execute FEATURE-LANDING-TASKS.md ou tasks futuras deste projeto

---

## Princípio Central

Existem dois tipos de decisão numa build, e o agente trata cada uma diferente:

| Tipo de Decisão | Quem decide | Como |
|---|---|---|
| **Decisão de negócio** (preço, oferta, nome, quem é o público) | O cliente/Wagner | Agente pergunta, de forma socrática, no momento certo do build |
| **Decisão técnica/UX** (comportamento de botão, padrão de scroll, biblioteca a usar) | O agente | Agente pesquisa best practice atual, decide, documenta o porquê |

**Regra simples:** Se a resposta muda o produto que o cliente está vendendo → pergunta. Se a resposta é "qual é a forma tecnicamente/UX-wise mais correta de fazer isso" → o agente é o especialista, decide e segue.

---

## 1. Decisões que exigem Pergunta Socrática ao Usuário

Isso NÃO é uma pergunta genérica de formulário — é uma pergunta feita no contexto certo, quando a task que precisa da resposta está prestes a ser implementada. Não pergunte tudo de uma vez no início.

### Exemplo: Preço da Consultoria (Task-005, Hero / Task-011, CTAFinal)

Quando o agente chegar na implementação do componente que exibe preço (se houver) ou dos textos de oferta, ele deve parar e perguntar algo como:

> "Estou implementando a seção [X] que menciona o valor da consultoria. Vocês já decidiram o modelo de cobrança?
> - (a) Valor fixo mensal (ex: R$297/mês)
> - (b) Pacote fechado (ex: R$997 por 12 semanas)
> - (c) Ainda não decidiram — uso um placeholder `[VALOR]` por enquanto e vocês me avisam depois?"

**Outras perguntas socráticas esperadas durante o build** (lista não-exaustiva, o agente deve identificar outras conforme aparecerem):
- Bio exata de cada trainer (texto de credencial)
- Quais das fotos antes/depois entram na seção Resultados (você já tem várias — quais destacar?)
- Se o casal quer aprovar o texto antes do deploy final

---

## 2. Decisões Técnicas/UX que o Agente Resolve Sozinho (Como Especialista)

O agente **não deve perguntar ao usuário** "como você acha que deveria funcionar tecnicamente". Em vez disso, ele deve ter e usar uma ferramenta de pesquisa (web search) pra checar a prática atual de mercado, decidir, e documentar a decisão + o porquê no código/commit.

### Exemplo Resolvido Agora: CTA "Começar Agora" no Hero

Em vez de perguntar pro Wagner "scroll ou WhatsApp direto?", o agente deveria ter pesquisado. Fazendo isso agora como exemplo de como o processo funciona:

**Prática de mercado para landing pages de serviço/consultoria (CTA no Hero):**
- Hero CTAs em landing pages de alta conversão **normalmente fazem scroll** para uma seção de prova social ou formulário — pular direto pra conversão (WhatsApp) sem mostrar prova social primeiro reduz a taxa de conversão, porque o visitante ainda não viu "por que confiar".
- A exceção é quando o tráfego já vem pré-qualificado (ex: alguém clicou o link no Insta da Renata, já viu prova social lá) — nesse caso, CTA direto tem menos fricção.

**Decisão do agente para este projeto:** Como o tráfego vem de Instagram Stories/Ads onde a prova social (resultados dos clientes) ainda não foi vista pelo visitante, o CTA do Hero faz **scroll até `#quem-somos`** (não direto pro WhatsApp). O CTA final (`CTAFinal.jsx`, após a seção Resultados) sim vai direto pro WhatsApp, porque a essa altura o visitante já viu prova social.

**Isso está refletido em:** FEATURE-LANDING-SPEC.md → FR-001 (atualizado)

### Outras decisões técnicas que o agente deve resolver sozinho (sem perguntar):
- Biblioteca de ícones a usar (Lucide, Heroicons, emoji simples)
- Formato de imagem (WebP vs JPEG, com fallback)
- Estrutura de pastas dentro de `src/`
- Nome de variáveis, convenções de código
- Qual abordagem de lazy-loading usar
- Versão exata de dependências (sempre a estável mais recente, verificada via pesquisa, nunca assumida de memória)

**Regra de ouro:** Se o agente não tem certeza sobre uma prática técnica atual (ex: "qual é a forma recomendada de configurar X em 2026"), ele pesquisa antes de decidir — nunca assume de memória desatualizada e nunca empurra a decisão técnica pro usuário resolver.

---

## 3. O Que Fazer Quando Não Há Certeza Nem com Pesquisa

Se o agente pesquisar e ainda encontrar divergência real de opinião entre especialistas (não é o caso do CTA acima, mas pode acontecer), ele deve:
1. Apresentar as 2-3 opções de forma objetiva
2. Recomendar uma com justificativa
3. Seguir com a recomendação, deixando claro no commit/documentação que pode ser revisitado

Não trava o build esperando uma resposta perfeita.

---

## 4. Socratic Question Map (Mapa Exato de Perguntas)

Isso substitui "o agente vai perguntar quando achar necessário" por algo determinístico: cada task sabe exatamente qual pergunta fazer, quando, e o que fazer se não tiver resposta ainda.

| Task | Campo em `content.json` | Pergunta Exata | Se Não Responder Agora |
|---|---|---|---|
| 1.5 (Assets) | `transformacoes[].clientName` | "Posso usar o primeiro nome do [cliente] na seção Resultados, ou vocês preferem anônimo (ex: 'Cliente há 6 meses')?" | Usa "Cliente [N]" genérico, marca `STATUS: PENDENTE` |
| 1.5 (Assets) | `transformacoes[].result` | "Qual foi o resultado principal dessa transformação? (ex: 'Perdeu 8kg em 12 semanas')" | Deixa `STATUS: PENDENTE`, placeholder some da seção até preencher |
| 5 (Hero) / 8 (QuemSomos) | `trainers.renata/leandro.bio` | "Me passa 2-3 linhas sobre a Renata/Leandro: formação, especialidade, tempo de experiência?" | `STATUS: PENDENTE`, card usa foto+nome só, sem bio |
| 5 (Hero) / 8 (QuemSomos) | `trainers.*.credential` | "Qual credencial curta aparece embaixo do nome? (ex: 'Pós-grad em Nutrição Funcional')" | Mesmo tratamento acima |
| 8 (QuemSomos) | `trainers.*.phone` | Já respondido por Wagner — confirmar formato: "Me confirma os 2 números com DDD, pra eu formatar certo pro link do WhatsApp (formato: 5511999999999)" | Bloqueia Task 8 se realmente ausente (é campo crítico) |
| 8 / 12 (Footer) | `trainers.*.instagram` | "Qual o @ do Instagram de cada um, pra eu linkar no Footer?" | Remove o link do Footer até preencher, não quebra o layout |
| 5 / 11 (CTAFinal) | `oferta.modelo` + `oferta.valor` | "Vocês já decidiram o modelo de cobrança? (a) mensal fixo (b) pacote fechado (c) ainda não decidiram — uso `[VALOR]` por enquanto?" | Mantém `[VALOR]` visível — **mas Task 17 (QA) deve alertar que isso não pode ir pro ar assim** |
| 15 (SEO) | `seo.description` | Não pergunta — deriva automaticamente do `hero.body` + `brand.tagline`, já definidos. Só confirma com Wagner se quer revisar antes do deploy final | N/A, não é bloqueante |

**Regra de execução:** o agente faz essas perguntas **uma de cada vez, no momento em que a task que precisa do dado começa** — nunca todas de uma vez no início (isso é o "efeito formulário" que cansa o usuário e quebra o fluxo).

---

## 5. Research Trigger Map (Quando o Agente Vai Pesquisar Sozinho)

| Situação | Gatilho de Pesquisa | Exemplo de Query |
|---|---|---|
| Decisão de UX/comportamento sem consenso óbvio | Antes de implementar qualquer interação nova (CTA, scroll, animação) | "landing page CTA best practice conversion [ano atual]" |
| Versão de biblioteca/dependência | Sempre antes de `npm install X` — nunca assume versão de memória | "[nome da lib] latest stable version npm" |
| API externa (Meta Pixel, Meta Graph API) | Sempre antes de escrever código que chama a API — endpoints e parâmetros mudam | "Meta Pixel Conversions API [evento] parameters current" |
| Prática de acessibilidade específica | Ao implementar componente com potencial problema de contraste/foco (ex: botão gold em fundo dark) | "WCAG contrast ratio gold text dark background" |
| Formato/otimização de imagem | Ao decidir pipeline de assets (Task 1.5) | "best image format web performance 2026 WebP AVIF" |
| Qualquer coisa que a Knowledge Verification Chain do `tlc-spec-driven` já cobre | Segue a ordem: Codebase → Docs do projeto → Context7 MCP (se disponível) → Web search → Flag como incerto | (ver `tlc-spec-driven/SKILL.md` seção "Knowledge Verification Chain") |

**Regra:** o agente nunca escreve "acho que é assim" sem pesquisar primeiro quando a pergunta é técnica e pesquisável. Só marca como incerto (Step 5 da chain) se a pesquisa genuinamente não trouxer resposta clara.

---

## 6. Skills & Tooling Map (O Que Cada Task Usa)

| Task(s) | Skill/Tool Necessária | Por Quê |
|---|---|---|
| 0 (Pixel Bootstrap) | Nenhuma skill formal — script Python direto | Chamada de API simples, não precisa de skill de documento |
| 1 (Project Setup) | `frontend-design` (visão geral, antes de qualquer componente) | Define tokens de design, evita UI genérica/templated |
| 1.5 (Assets) | Bash/Node script (`sharp` ou equivalente) | Otimização de imagem é processamento local, não skill de documento |
| 2 (Design System) | `frontend-design` | Guia de tipografia, espaçamento, contraste — evita decisões arbitrárias |
| 5, 6, 7, 8, 9, 10, 11, 12 (Componentes) | `frontend-design` | Toda decisão visual nova (hover, sombra, hierarquia) deve consultar esse guia antes de inventar estilo |
| 14 (Meta Pixel Integration) | Nenhuma skill formal — segue `AGENT-BUILD-GUIDELINES.md` seção 5 (pesquisar API atual) | — |
| 16 (Performance) | Nenhuma skill formal — Lighthouse é ferramenta padrão, não skill do Claude | — |
| Qualquer task que gere Word/PDF/PPTX de relatório pro casal (ex: resumo semanal do Dashboard) | `docx` ou `pdf` (se decidirem formalizar o relatório manual da Opção A) | Só se decidirem sair do "print de tela" informal |

**Nota:** este projeto é majoritariamente código (React), então a maioria das skills de documento (`docx`, `pptx`, `xlsx`) não se aplica. A skill mais relevante ao longo de todo o projeto é `frontend-design`, que deveria ser consultada no início de qualquer task que crie um componente visual novo.

---

## 7. Orquestração — Como Rotear Entre Sub-Agentes

Seguindo o padrão de delegação do `tlc-spec-driven` (ver SKILL.md seção "Sub-Agent Delegation"):

### Tasks que DEVEM rodar como sub-agente (contexto isolado):
- **Tasks 5-12 (componentes individuais)** — cada componente é implementação isolada, não precisa do histórico de chat acumulado. O agente principal delega: "implementa `Hero.jsx` conforme Task 005 do TASKS.md + o schema de `CONTENT-SCHEMA.md`", recebe de volta só o resultado (arquivo criado, status, testes).
- **Task 16 (Performance)** — rodar Lighthouse, ajustar imagens, gera muito output de log que não precisa poluir o contexto principal.
- **Task 17 (Testing & QA)** — mesma lógica, roda os testes e retorna só o relatório final (pass/fail).

### Tasks que ficam no agente principal (orquestrador), NÃO delegam:
- **Task 0 e 1.5** (Pixel Bootstrap, Assets) — envolvem decisão + pergunta ao usuário, precisam do contexto da conversa
- **Task 2 (Design System)** — decisão estrutural que todas as outras tasks vão herdar, precisa ficar coerente no orquestrador
- **Task 13 (App Assembly)** — integra o trabalho de todos os sub-agentes anteriores, precisa ver o conjunto
- **Validação/planejamento entre tasks** — sempre no orquestrador, nunca delegado

### O que cada sub-agente recebe (nunca mais que isso):
- A definição exata da task (What/Where/Done When/Tests/Gate) do `FEATURE-LANDING-TASKS.md`
- O `CONTENT-SCHEMA.md` (pra saber de onde puxar texto)
- O `AGENT-BUILD-GUIDELINES.md` seção 6 (skill aplicável) e seção 2 (decisões técnicas que ele mesmo resolve)
- **NÃO recebe:** o histórico da conversa toda, as outras tasks, nem o `STATE.md` (a menos que a task referencie um blocker específico)

### O que cada sub-agente devolve pro orquestrador:
- Status: Completo | Bloqueado | Parcial
- Arquivos criados/alterados
- Resultado do Gate check (passou/falhou)
- Se ficou bloqueado por falta de resposta socrática: qual pergunta específica falta

**Resumo visual:**
```
Orquestrador (você + Claude Code principal)
│
├─ Task 0, 1.5, 2, 13 → resolve direto (precisa do contexto todo)
│
├─ Task 5 → delega sub-agente ─┐
├─ Task 6 → delega sub-agente ─┤
├─ Task 7 → delega sub-agente ─┼─► rodam em paralelo, cada um isolado
├─ Task 8 → delega sub-agente ─┤    devolvem status pro orquestrador
├─ ...                          ─┘
│
└─ Task 17 → delega sub-agente (QA isolado, devolve relatório)
```

---

**Resumo para quem for rodar o Claude Code:** Esse documento existe pra você não ser interrompido toda hora com perguntas técnicas que não são sua responsabilidade responder. Só espere ser perguntado sobre coisas de negócio (preço, textos, decisões de marca) — e agora com o Socratic Question Map (seção 4), você sabe exatamente quais perguntas virão e quando. O resto, o agente resolve, pesquisa quando precisa (seção 5), usa a skill certa (seção 6), e roteia entre si mesmo via sub-agentes (seção 7) — você só acompanha o resultado.
