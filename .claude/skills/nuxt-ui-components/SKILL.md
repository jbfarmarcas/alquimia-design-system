---
name: nuxt-ui-components
description: "Use quando for implementar um componente com Nuxt UI: escolher o componente base, mapear variantes e estados, e customizar via tema (app.config.ts) em vez de CSS solto."
---
# Nuxt UI: componentes e temas neste projeto

1. Escolha primeiro o componente base do Nuxt UI (UButton, UInput, USelectMenu, UModal, UTable, UTabs, UToast, UTooltip, UCalendar, UInputDate...). Só crie algo novo se o Nuxt UI não cobrir.
2. Customize pelo tema: cada componente aceita um objeto de tema com slots e variantes (variants, compoundVariants, defaultVariants). Os temas do ADS estão em app/theme/ads-theme.ts e são registrados em app/app.config.ts.
3. Use as props do Nuxt UI (color, variant, size, disabled, loading, icon) antes de classes. Cores semânticas: primary, secondary, success, info, warning, error, neutral.
4. Ícones: coleção lucide (@iconify-json/lucide), no formato i-lucide-<nome>.
5. Evite sobrescrever o estilo interno do componente com seletores CSS; prefira slots e variantes.
6. Mantenha a API pública do componente ADS wrapper estável (props e eventos).
