---
name: nuxt-ui-tokens
description: Use sempre que um componente precisar de cor, espaço, raio ou fonte, ou ao checar se um valor fixo deveria ser um token.
---
# Tokens do projeto no Nuxt UI

Camadas:
1. Primitivos: app/assets/css/main.css, bloco @theme. Escalas --color-primary-*, --color-secondary-*, --color-success-*, --color-info-*, --color-warning-*, --color-error-*, --color-neutral-* (50 a 950), e --radius-sm/md, --font-sans.
2. Mapeamento: app/theme/ads-tokens.ts (valores brutos da página de tokens: RP, SU, OP, AT, WA, LI, MI, DA) e app/theme/ads-theme.ts (adsPalette: escalas semânticas do Nuxt UI preenchidas a partir do ads-tokens.ts).
3. Componentes: temas ads*Theme em app/theme/ads-theme.ts, registrados em app/app.config.ts.

Regras:
- Spacing (--ads-space-quark … --ads-space-giant), fontes (--ads-font-*) e raios (--ads-radius-*) ficam FORA do @theme de propósito: colocá-los lá sobrescreve xs/sm/md do Nuxt UI. Não mova sem revisar isso.
- Erro usa a escala WA (vermelho); aviso usa AT (âmbar). Não troque.
- Degrau de escala ausente repete o extremo oficial da escala (decisão registrada em ads-theme.ts). Não invente tons novos.
- Se um valor não existir em token, pare e sinalize ao UX em vez de inserir hex no componente.
