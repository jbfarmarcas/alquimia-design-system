export type DocsProp = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type DocsEvent = {
  name: string;
  payload: string;
  description: string;
};

export type DocsSlot = {
  name: string;
  description: string;
};

export type DocsMethod = {
  name: string;
  signature: string;
  description: string;
};

export type DocsApi = {
  name: string;
  summary?: string;
  propColumns?: {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  };
  props: DocsProp[];
  events?: DocsEvent[];
  slots?: DocsSlot[];
  methods?: DocsMethod[];
};

export type DocsBlock = {
  language: "vue" | "css" | "ts";
  code: string;
  apis: DocsApi[];
};

const prop = (
  name: string,
  type: string,
  defaultValue: string,
  description: string,
): DocsProp => ({ name, type, defaultValue, description });

const buttonColors = "primary | success | attention | warning | new | blocked | neutral";
const pillStatuses = "default | success | attention | warning | new | blocked";

/** Propriedades, eventos e slots de cada seção, uma por componente. As chaves são os ids de `catalog-sections.ts`. O código vem dos parâmetros de cada demonstração. */
export const docsApis = {
  cores: [
    {
      name: "Tokens de uso",
      summary: "A escala acima é a matéria-prima e tem classes próprias: bg-ads-<grupo>-<passo>, text-ads-… e border-ads-… (ex.: bg-ads-radar-500). Na interface, prefira o token semântico.",
      propColumns: {
        name: "Token",
        type: "Classe",
        defaultValue: "Valor",
        description: "Uso",
      },
      props: [
        prop("--ads-text-primary", "text-ads-text-primary", "#061938", "Texto principal."),
        prop("--ads-text-secondary", "text-ads-text-secondary", "#505f79", "Texto de apoio."),
        prop("--ads-text-tertiary", "text-ads-text-tertiary", "#5e6c84", "Placeholder e texto terciário."),
        prop("--ads-text-brand", "text-ads-text-brand", "#006ff7", "Link e destaque da marca."),
        prop("--ads-text-brand-strong", "text-ads-text-brand-strong", "#074ac6", "Link e destaque da marca em texto escuro."),
        prop("--ads-text-ai", "text-ads-text-ai", "#613dda", "Texto e ícone no modo IA."),
        prop("--ads-text-contrast", "text-ads-text-contrast", "#ffffff", "Texto sobre fundo de marca."),
        prop("--ads-surface-main", "bg-ads-surface-main", "#fafbfc", "Fundo da página."),
        prop("--ads-surface-card", "bg-ads-surface-card", "#ffffff", "Fundo de cartão e campo."),
        prop("--ads-surface-brand", "bg-ads-surface-brand", "#006ff7", "Fundo da marca."),
        prop("--ads-surface-ai", "bg-ads-surface-ai", "#f3f0ff", "Fundo do modo IA."),
        prop("--ads-border-subtle", "border-ads-border-subtle", "#e5e8eb", "Borda de divisória e cartão."),
        prop("--ads-border-input", "border-ads-border-input", "#7a869a", "Borda de campo de formulário."),
      ],
    },
  ],
  button: [
    {
      name: "AdsButton",
      summary: "Ação de tela. Sem rótulo, o botão fica quadrado e mostra só o ícone.",
      props: [
        prop("type", "filled | outline | unfilled | secondary | ia", "filled", "Visual do botão. Outline e unfilled não têm pressed. IA ignora a cor: um brilho de gradiente gira em volta da borda e usa text/ai."),
        prop("color", buttonColors, "primary", "Cor do status. Neutral é ação sem status. ⚠️ Só no código: o Figma não tem eixo de cor."),
        prop("size", "md | sm", "md", "md no desktop, sm no mobile."),
        prop("label", "string", '""', "Rótulo. Vazio deixa o botão só com ícone."),
        prop("leading", "boolean", "false", "Ícone à esquerda. No exemplo, sparkles."),
        prop("trailing", "boolean", "false", "Ícone à direita. Sem trailingIcon, usa icon."),
        prop("icon", "string", "i-lucide-sparkles", "Nome do ícone Lucide."),
        prop("trailingIcon", "string", '""', "Ícone da direita. Vazio reutiliza icon."),
        prop("to", "RouteLocationRaw", "—", "Vira link. Sem valor, continua button."),
        prop("disabled", "boolean", "false", "Bloqueia o clique."),
        prop("loading", "boolean", "false", "Troca o ícone por spinner e bloqueia outro clique."),
        prop("nativeType", "button | submit | reset", "button", "Atributo type do button. A prop type já é o visual."),
        prop("state", "active | hover | pressed | disabled | null", "null", "Congela um estado na documentação. Sem valor, hover e pressed vêm do ponteiro."),
      ],
      slots: [{ name: "default", description: "Substitui o label." }],
    },
  ],
  "button-group": [
    {
      name: "AdsButtonGroup",
      summary: "Segmentos unidos. O valor escolhido fica em negrito e com fundo claro.",
      props: [
        prop("v-model", "string", "obrigatório", "Valor do segmento."),
        prop("options", "{ value, label }[]", "obrigatória", "Segmentos."),
        prop("ariaLabel", "string", "Grupo de botões", "Nome do grupo."),
      ],
    },
  ],
  "button-menu": [
    {
      name: "AdsButtonMenu",
      summary: "Painel do button dropdown. O gatilho fica fora do componente.",
      props: [
        prop("options", "{ value, title, subtitle?, icon? }[]", "obrigatória", "Linhas do menu."),
        prop("showSubtitles", "boolean", "true", "Figma Show subtitles."),
        prop("showIcons", "boolean", "true", "Figma Show icons."),
      ],
      events: [{ name: "select", payload: "string", description: "A linha foi escolhida." }],
    },
  ],
  input: [
    {
      name: "AdsInput",
      props: [
        prop("v-model", "string | number", '""', "Valor do campo."),
        prop("label", "string", '""', "Rótulo acima do campo."),
        prop("hint", "string", '""', "Texto de apoio. Some quando há error."),
        prop("error", "string", '""', "Mensagem de erro. Também marca o campo como inválido."),
        prop("info", "string", '""', "Tooltip do ícone de informação ao lado do rótulo."),
        prop("placeholder", "string", '""', "Texto enquanto o campo está vazio."),
        prop("disabled", "boolean", "false", "Impede a edição."),
        prop("icon", "string", '""', "Ícone à direita. Vazio esconde o ícone."),
        prop("type", "text | number", "text", "Tipo nativo do input."),
        prop("suffix", "string", '""', "Texto fixo à direita, como uma unidade."),
        prop("min", "string | number", "—", "Mínimo, quando type é number."),
        prop("step", "string | number", "—", "Passo, quando type é number."),
        prop("state", "default | active | focus | error | disabled | ai | null", "null", "Congela o estado na documentação."),
        prop("aiSuggestion", "boolean", "false", "Marca o valor como sugestão de IA. Erro e desabilitado têm prioridade. Quem usa volta para false quando a pessoa edita."),
      ],
      events: [
        { name: "focus", payload: "FocusEvent", description: "O campo recebe o foco." },
        { name: "blur", payload: "FocusEvent", description: "O campo perde o foco." },
      ],
    },
  ],
  "number-input": [
    {
      name: "AdsNumberInput",
      summary: "Campo numérico com setas de passo e sufixo.",
      props: [
        prop("v-model", "string | number", '""', "Valor do campo."),
        prop("label", "string", '""', "Rótulo acima do campo."),
        prop("hint", "string", '""', "Texto de apoio. Some quando há error."),
        prop("info", "string", '""', "Tooltip do ícone de informação ao lado do rótulo."),
        prop("error", "string", '""', "Mensagem de erro."),
        prop("placeholder", "string", '""', "Texto enquanto o campo está vazio."),
        prop("suffix", "string", '""', "Unidade à direita, como %."),
        prop("disabled", "boolean", "false", "Impede a edição e as setas."),
        prop("min", "string | number", "—", "Valor mínimo do passo."),
        prop("step", "string | number", "—", "Incremento das setas."),
        prop("state", "default | active | focus | error | disabled | ai | null", "null", "Congela o estado na documentação."),
        prop("aiSuggestion", "boolean", "false", "Marca o valor como sugestão de IA. Erro e desabilitado têm prioridade. Quem usa volta para false quando a pessoa edita."),
      ],
      events: [
        { name: "focus", payload: "FocusEvent", description: "O campo recebe o foco." },
        { name: "blur", payload: "FocusEvent", description: "O campo perde o foco." },
      ],
    },
  ],
  "search-input": [
    {
      name: "AdsSearchInput",
      props: [
        prop("v-model", "string", '""', "Texto da busca. Com valor, aparece o botão de limpar."),
        prop("placeholder", "string", "Pesquisar", "Texto enquanto a busca está vazia."),
        prop("ariaLabel", "string", '""', "Nome acessível. Sem valor, usa o placeholder."),
        prop("hint", "string", '""', "Texto de apoio abaixo do campo."),
        prop("disabled", "boolean", "false", "Impede a busca."),
        prop("icon", "string", "i-lucide-search", "Ícone à esquerda."),
        prop("size", "md | sm", "md", "md tem 45px; sm tem 40px."),
        prop("state", "default | active | focus | disabled | ai | null", "null", "Congela o estado na documentação. ⚠️ Só no código: o estado ai não existe no Figma para o campo de busca."),
        prop("aiSuggestion", "boolean", "false", "Marca o texto como sugestão de IA. Desabilitado tem prioridade. ⚠️ Só no código: o Figma não tem sugestão de IA no campo de busca."),
      ],
    },
  ],
  textarea: [
    {
      name: "AdsTextarea",
      props: [
        prop("v-model", "string", '""', "Texto longo."),
        prop("label", "string", '""', "Rótulo acima do campo."),
        prop("hint", "string", '""', "Texto de apoio. Some quando há error."),
        prop("error", "string", '""', "Mensagem de erro."),
        prop("placeholder", "string", '""', "Texto enquanto o campo está vazio."),
        prop("disabled", "boolean", "false", "Impede a edição."),
        prop("state", "default | active | focus | error | disabled | ai | null", "null", "Congela o estado na documentação. ⚠️ Só no código: o estado ai não existe no Figma para o texto longo."),
        prop("aiSuggestion", "boolean", "false", "Marca o valor como sugestão de IA. Erro e desabilitado têm prioridade. ⚠️ Só no código: o Figma não tem sugestão de IA no texto longo."),
      ],
    },
  ],
  "date-picker": [
    {
      name: "AdsDatePicker",
      summary: "Data única no v-model. Com range, o período vai em start e end. Figma: modos Day (padrão) e Day + Range (com range=true). Mês separado usa AdsMonthPicker.",
      props: [
        prop("v-model", "string", '""', "Data no formato AAAA-MM-DD. Ignorado quando range está ativo."),
        prop("v-model:start", "string", '""', "Início do período."),
        prop("v-model:end", "string", '""', "Fim do período."),
        prop("range", "boolean", "false", "Abre o calendário de período (Figma: Day + Range)."),
        prop("min", "string", "—", "Data mínima, AAAA-MM-DD."),
        prop("max", "string", "—", "Data máxima, AAAA-MM-DD."),
        prop("disabled", "boolean", "—", "Impede a escolha."),
        prop("readonly", "boolean", "—", "Mostra a data sem abrir o calendário."),
        prop("size", "sm | md | lg", "md", "Altura do campo."),
        prop("maximumDays", "number", "—", "Limite de dias do período, contando o início."),
        prop("class", "string", "—", "Classe no gatilho."),
        prop("aiSuggestion", "boolean", "false", "Marca a data como sugestão de IA. ⚠️ Só no código: o Figma não tem sugestão de IA no Date Picker."),
      ],
    },
  ],
  "month-picker": [
    {
      name: "AdsMonthPicker",
      summary: "Grade de meses, 290×284. O AdsSelect com type month embute esta peça.",
      props: [
        prop("v-model", "string", '""', "Mês no formato AAAA-MM."),
      ],
      events: [{ name: "pick", payload: "—", description: "Um mês foi escolhido. O valor fica no v-model." }],
    },
  ],
  select: [
    {
      name: "AdsSelect",
      summary: "Único componente de seleção (Figma Select + Super dropdown). Lista simples ou múltipla, ou mês. Gatilho em campo, próprio (#trigger) ou nenhum (inline). Rótulo longo ganha reticências e tooltip.",
      props: [
        prop("v-model", "string | string[]", "obrigatório", "checkbox usa string[]. radio e month usam string."),
        prop("type", "checkbox | radio | month", "obrigatória", "Múltipla (checkbox), simples (radio) ou mês."),
        prop("label", "string", "—", "Rótulo acima do campo."),
        prop("hint", "string", "—", "Texto de apoio. Some quando há error."),
        prop("error", "string", "—", "Mensagem de erro."),
        prop("placeholder", "string", "Selecione", "Texto sem valor."),
        prop("disabled", "boolean", "false", "Impede a abertura."),
        prop("options", "AdsSelectOption[]", "[]", "{ value, label, subtitle?, badge?: { label, tone?: brand | ai, icon? }, disabled? }. month não usa options. A busca procura no título e no subtítulo."),
        prop("searchable", "boolean | null", "null", "null busca só no checkbox."),
        prop("selectAll", "boolean | null", "null", "null mostra “selecionar todos” só no checkbox."),
        prop("selectAllLabel", "string", "Selecionar todos", "Rótulo da ação de marcar todos."),
        prop("allSelectedLabel", "string", "Todos selecionados", "Texto do gatilho quando tudo está marcado."),
        prop("emptyLabel", "string", "Nenhum resultado", "Lista vazia depois da busca."),
        prop("searchPlaceholder", "string", "Pesquisar", "Placeholder da busca interna."),
        prop("block", "boolean", "false", "O gatilho ocupa a largura do campo."),
        prop("inline", "boolean", "false", "Só a lista, sem gatilho nem popover. label, hint e error não aparecem."),
        prop("panelWidthClass", "string", "w-[320px] max-w-full", "Largura da lista."),
        prop("aiSuggestion", "boolean", "false", "Marca a seleção como sugestão de IA. Erro e desabilitado têm prioridade; aberto mostra o foco. Quem usa volta para false quando a pessoa altera."),
      ],
      events: [{ name: "pick", payload: "string | string[]", description: "Escolha feita. No radio e no month o popover fecha." }],
      slots: [{ name: "trigger", description: "Gatilho próprio. Recebe { open, label, hasValue }." }],
    },
  ],

  tabs: [
    {
      name: "AdsTabs",
      summary: "Faixa de links para trocar a visão da mesma tela.",
      props: [
        prop("v-model", "string | number", "—", "Valor da aba ativa."),
        prop("items", "TabsItem[]", "obrigatória", "Rótulo e valor de cada aba."),
        prop("content", "boolean", "true", "false deixa só a faixa, sem painel."),
        prop("defaultItem", "TabsItem", "—", "Aba inicial quando não há v-model."),
        prop("listClass", "string", '""', "Classes extras na lista, como um recuo lateral."),
      ],
      slots: [
        { name: "trailing", description: "Conteúdo depois do rótulo da aba." },
        { name: "content", description: "Painel da aba ativa." },
      ],
    },
  ],
  "segmented-tabs": [
    {
      name: "AdsSegmentedTabs",
      summary: "Filtro curto em pílula (Switch Tabs). Não renderiza painel. Limite de 8 abas.",
      props: [
        prop("v-model", "string | number", "obrigatório", "Valor do segmento ativo."),
        prop("items", "AdsSegmentedTabsItem[]", "obrigatória", "Rótulo e valor de cada segmento. Opcionais por item: icon (Lucide, 24px à esquerda) e subtitle (12px regular secundário, abaixo do rótulo). Com eles, a aba cresce além dos 30px."),
        prop("ariaLabel", "string", "—", "Nome do grupo, lido pelo leitor de tela."),
      ],
    },
  ],
  toast: [
    {
      name: "AdsToast",
      summary: "Toast Header (faixa clara) e Toast Alert (reporte escuro). O toast flutuante usa useToast do Nuxt UI.",
      props: [
        prop("status", "success | error | warning | attention | neutral | loading", "error", "Cor e ícone. Na faixa (banner): success, error, warning, attention, neutral. No reporte (status): success, error, warning, loading."),
        prop("appearance", "banner | status", "banner", "banner é a faixa clara (Toast Header). status é o reporte escuro (Toast Alert)."),
        prop("app", "boolean", "false", "Faixa estreita de 331px, a variação App. Ignorado em status."),
        prop("message", "string", "—", "Texto da faixa. O slot padrão substitui."),
        prop("description", "string", "—", "Descrição complementar abaixo da mensagem na faixa (banner)."),
        prop("title", "string", "—", "Título do reporte escuro. Sem valor, usa a mensagem do status."),
        prop("subtitle", "string", "—", "Linha opcional do reporte escuro."),
        prop("icon", "string", "—", "Ícone Lucide. Sem valor, segue o status."),
        prop("closable", "boolean", "true", "Mostra o botão de fechar."),
        prop("actionLabel", "string", "—", "Rótulo da ação em link. Sem valor, esconde o link."),
      ],
      events: [
        { name: "close", payload: "—", description: "O botão de fechar foi acionado." },
        { name: "action", payload: "—", description: "A ação em link foi acionada." },
      ],
      slots: [{ name: "default", description: "Substitui a mensagem." }],
    },
  ],
  "file-card": [
    {
      name: "AdsFileCard",
      props: [
        prop("name", "string", "obrigatória", "Nome do arquivo."),
        prop("detail", "string", "—", "Linha de apoio, como o tamanho."),
        prop("status", "success | error", "success", "success confirma o envio; error mostra a mensagem acima do arquivo e destaca a borda. O ícone segue o status."),
        prop("message", "string", "—", "Texto do problema, acima do arquivo."),
        prop("icon", "string", "—", "Só no código: no Figma o ícone segue o status e não é trocável. A prop existe para compatibilidade."),
        prop("removable", "boolean", "false", "Mostra a ação de remover."),
        prop("removeLabel", "string", "Remover arquivo", "Nome acessível da ação de remover."),
      ],
      events: [{ name: "remove", payload: "—", description: "A ação de remover foi acionada." }],
    },
  ],
  "empty-state": [
    {
      name: "AdsEmptyState",
      props: [
        prop("title", "string", "Título do empty state", "Título."),
        prop("subtitle", "string", "texto de apoio", "Some se vazio."),
        prop("small", "boolean", "false", "Figma Small=Yes."),
        prop("showActions", "boolean", "true", "Dois botões. O slot padrão substitui. ⚠️ Só no código: o Figma não tem os botões como propriedade."),
        prop("primaryLabel", "string", "Button Test", "Botão preenchido. ⚠️ Só no código."),
        prop("secondaryLabel", "string", "Button Test", "Botão sem fundo. ⚠️ Só no código."),
      ],
    },
  ],
  pagination: [
    {
      name: "AdsPagination",
      props: [
        prop("v-model:page", "number", "1", "Página atual."),
        prop("totalPages", "number", "1", "Total. Acima de 7, entram reticências."),
        prop("prevLabel", "string", "Anterior", "Ação anterior."),
        prop("nextLabel", "string", "Próximo", "Ação seguinte."),
      ],
    },
  ],
  tooltip: [
    {
      name: "AdsTooltip",
      summary: "Balão com título e descrição brancos. Abre no hover e no foco do gatilho.",
      props: [
        prop("wing", "up | down | left | right", "up", "Lado da seta."),
        prop("title", "string", "Título", "Some com showTitle falso."),
        prop("description", "string", "Descrição", "Some com showDescription falso."),
        prop("showTitle", "boolean", "true", "Mostra o título."),
        prop("showDescription", "boolean", "true", "Mostra a descrição."),
        prop("align", "start | center | end", "center", "Alinhamento do balão em relação ao gatilho."),
        prop("disabled", "boolean", "false", "Não abre o balão. Útil para texto que só aparece quando é cortado."),
        prop("delayDuration", "number", "150", "Espera antes de abrir, em milissegundos."),
      ],
      slots: [{ name: "default", description: "Gatilho. O balão abre no hover e no foco. Sem slot, o balão fica fixo na tela, só para documentação." }],
    },
  ],
  steptip: [
    {
      name: "AdsSteptip",
      props: [
        prop("step", "number", "1", "Passo atual."),
        prop("totalSteps", "number", "3", "No último passo o botão vira concluir."),
        prop("title", "string", "Título do passo", "Título."),
        prop("description", "string", "—", "Texto do passo."),
        prop("side", "top | right | bottom | left", "bottom", "Lado do gatilho onde o passo abre. Só vale com slot."),
        prop("delayDuration", "number", "150", "Espera antes de abrir, em milissegundos."),
      ],
      slots: [{ name: "default", description: "Elemento que o passo explica. O passo abre no hover e no foco. Sem slot, fica fixo na tela." }],
      events: [
        { name: "skip", payload: "—", description: "Pular o passo." },
        { name: "back", payload: "—", description: "Voltar um passo." },
        { name: "next", payload: "—", description: "Avançar." },
        { name: "finish", payload: "—", description: "Concluir no último passo." },
      ],
    },
  ],
  charttip: [
    {
      name: "AdsCharttip",
      props: [
        prop("title", "string", "Título", "Título central."),
        prop("rows", "{ label, value, colorClass? }[]", "3 séries", "Linhas do gráfico."),
        prop("wing", "up | down | left | right", "down", "Com slot, lado em que o painel abre. A seta não é desenhada."),
        prop("delayDuration", "number", "150", "Espera antes de abrir, em milissegundos."),
      ],
      slots: [{ name: "default", description: "Ponto do gráfico, como uma barra. O painel abre no hover e no foco. Sem slot, fica fixo na tela." }],
    },
  ],
  smalltip: [
    {
      name: "AdsSmalltip",
      props: [
        prop("text", "string", "Clique para ver mais", "Linha de 10px."),
        prop("delayDuration", "number", "150", "Espera antes de abrir, em milissegundos."),
      ],
      slots: [{ name: "default", description: "Gatilho, como um ícone de info. A dica abre no hover e no foco. Sem slot, fica fixa na tela." }],
    },
  ],
  loading: [
    {
      name: "AdsLoading",
      props: [
        prop("variant", "spinner | skeleton | shimmer | logo", "spinner", "spinner na área vazia, skeleton quando o formato já é conhecido, shimmer num bloco cinza com brilho, logo usa o loader do Radar para a página ou uma seção."),
        prop("size", "sm | md | lg", "md", "sm na tabela, md na seção, lg no modal. Spinner 16/24/40 px, linhas do skeleton 8/12/16 px, shimmer 40/80/120 px, logo 41/98/136 px de altura."),
        prop("tone", "primary | muted", "primary", "primary no dado principal, muted em áreas secundárias (cinza mais claro)."),
        prop("region", "boolean", "false", "Centraliza o spinner ou logo numa seção vazia. Só no código: o Figma não tem esse eixo."),
        prop("label", "string", '""', "Rótulo: à direita do spinner, acima do logo."),
        prop("lines", "number", "3", "Linhas do skeleton. Zero desenha um bloco; a class define altura e largura. Só no código: o Figma define 3 linhas fixas."),
        prop("overlay", "boolean", "false", "Shimmer só com o brilho, por cima do conteúdo do pai (relative e overflow-hidden). Só no código."),
      ],
    },
  ],
  "overlay-loading": [
    {
      name: "useOverlayLoading",
      summary: "Cobre a página quando o processo não tem uma área própria. As opções abaixo são passadas para show() e update().",
      props: [
        prop("title", "string", "—", "Título do overlay."),
        prop("description", "string", "—", "Texto de apoio."),
        prop("hint", "string", "—", "Linha auxiliar."),
        prop("showProgress", "boolean", "—", "Mostra a barra de progresso."),
        prop("progress", "number", "—", "Percentual, de 0 a 100."),
        prop("variant", "loading | success | error | search | info", "—", "Estado do processo."),
        prop("iconSrc", "string", "—", "Ícone próprio."),
        prop("actionLabel", "string", "—", "Rótulo da ação, como fechar no sucesso."),
        prop("onAction", "() => void", "—", "Callback da ação."),
        prop("onUserClose", "() => void", "—", "Callback quando a pessoa fecha."),
        prop("closableVariants", "('success' | 'error')[]", "—", "Variantes em que a pessoa pode fechar o overlay."),
      ],
      methods: [
        { name: "show", signature: "(options) => symbol | null", description: "Abre o overlay. Se já houver um aberto, ele fecha antes." },
        { name: "update", signature: "(options: Partial) => void", description: "Mescla as opções no overlay aberto. As props precisam ser planas." },
        { name: "close", signature: "() => void", description: "Fecha o overlay aberto." },
        { name: "isOpen", signature: "() => boolean", description: "Diz se há um overlay aberto." },
        { name: "getCurrentId", signature: "() => symbol | null", description: "Id do overlay aberto." },
      ],
    },
  ],
  "progress-bar-loading": [
    {
      name: "ProgressBarLoading",
      props: [
        prop("title", "string", '""', "Título do trabalho."),
        prop("description", "string", '""', "Texto de apoio."),
        prop("icon", "string", "i-lucide-loader-circle", "Ícone de 18px ao lado do título. No sucesso vira o check verde."),
        prop("showIcon", "boolean", "true", "Mostra o ícone."),
        prop("spinIcon", "boolean", "true", "Gira o ícone."),
        prop("indeterminate", "boolean", "false", "Sem percentual conhecido: mostra — e um trecho da barra atravessando a trilha. Estado Indeterminado do Figma."),
        prop("percent", "number", "0", "Andamento de 0 a 100. 100 corresponde ao estado Sucesso."),
        prop("showPercent", "boolean", "true", "Mostra o número do percentual."),
        prop("showElapsedTime", "boolean", "true", "Mostra \"Tempo decorrido: 00:42\" abaixo da barra."),
        prop("ariaLabel", "string", '""', "Nome acessível da barra."),
        prop("variant", "primary | success", "primary", "Cor da barra. Use primary durante o andamento e success ao concluir. A variante error foi removida (não existe no Figma)."),
        prop("rootClass", "string", "flex w-full flex-col gap-3", "Classe do contêiner."),
      ],
    },
  ],
  "table-skeleton": [
    {
      name: "AdsTableSkeleton",
      summary: "Skeleton da tabela de produtos. Promovido a componente da biblioteca.",
      props: [
        prop("rows", "number", "4", "Linhas do skeleton, de 1 a 8. Corresponde a Linha 1–8 do Figma."),
        prop("variant", "skeleton | logo", "skeleton", "skeleton exibe barras de placeholder; logo exibe o loader do Radar centralizado na área da tabela."),
        prop("columns", "(left | center | right)[]", "—", "Alinhamento de cada coluna da tabela real. Quando informado, desenha só as linhas, sem cabeçalho próprio. O AdsTable preenche sozinho."),
        prop("cell-class", "string", "h-16 px-4", "Altura e respiro das células, iguais aos da linha de dados. Só com columns."),
      ],
    },
  ],
  badge: [
    {
      name: "AdsBadge",
      props: [
        prop("color", "primary | success | attention | warning | new | blocked", "primary", "Cor do contador. ⚠️ Só no código: o Figma tem só Context (Secondary, Notifications)."),
        prop("mini", "boolean", "false", "Ponto de 8px, sem número."),
        prop("value", "string | number", "2", "Número ou texto do contador. Ignorado no mini."),
      ],
    },
  ],
  pill: [
    {
      name: "AdsPill",
      summary: "Peça de status. A Small Pill do Figma é a mesma peça com size=\"sm\".",
      props: [
        prop("variant", "default | broadcast", "default", "broadcast é a pílula de transmissão do Figma (Broadcast): borda, ponto e texto em negrito. Só warning e success; ignora tone e size."),
        prop("status", pillStatuses, "default", "Cor do estado. 6 status: default, success, attention, warning, new, blocked."),
        prop("tone", "primary | secondary", "primary", "primary é sólido; secondary é a variação clara."),
        prop("size", "md | sm", "md", "md = Pill normal (24px). sm = Small Pill do Figma (18px)."),
        prop("label", "string", "—", "Texto. Sem valor, usa o nome do status (LIVE no broadcast)."),
        prop("icon", "string", "—", "Ícone Lucide à esquerda."),
        prop("iconClass", "string", "—", "Classes do ícone à esquerda, como o giro do carregamento."),
        prop("trailingIcon", "string", "—", "Ícone Lucide opcional à direita."),
      ],
    },
    {
      name: "AdsBroadcast",
      summary: "Atalho de compatibilidade para <AdsPill variant=\"broadcast\">. Prefira a Pill.",
      props: [
        prop("label", "string", "LIVE", "Texto da pílula."),
        prop("status", "warning | success", "warning", "Cor do ponto e do texto. ⚠️ Só no código: o Figma tem só uma variante de cor."),
      ],
    },
  ],
  "notability-pill": [
    {
      name: "AdsNotabilityPill",
      summary: "Atalho fino: traduz imagem/tráfego/lucro em cores e rótulo; renderiza AdsPill internamente.",
      props: [
        prop("notability", "string", "obrigatória", "image, traffic ou profit. Outro valor cai em image."),
        prop("label", "string", "—", "Texto. Sem valor, formata o nome da notabilidade."),
      ],
    },
  ],
  switch: [
    {
      name: "AdsSwitch",
      props: [
        prop("v-model", "boolean", "false", "Ligado ou desligado."),
        prop("label", "string", '""', "Texto ao lado. O slot padrão substitui."),
        prop("disabled", "boolean", "false", "Impede a troca. O visual muda para o estado desabilitado."),
      ],
      slots: [{ name: "default", description: "Substitui o label." }],
    },
  ],
  checkbox: [
    {
      name: "AdsCheckbox",
      props: [
        prop("v-model", "boolean", "false", "Marcado ou não."),
        prop("v-model:indeterminate", "boolean", "false", "Estado misto. O clique desmarca o misto e grava o valor."),
        prop("label", "string", '""', "Texto ao lado. O slot padrão substitui."),
        prop("disabled", "boolean", "false", "Impede a troca."),
      ],
      slots: [{ name: "default", description: "Substitui o label." }],
    },
  ],
  radio: [
    {
      name: "AdsRadio",
      summary: "Radios do mesmo grupo compartilham v-model e name.",
      props: [
        prop("v-model", "string | number | boolean", '""', "Valor escolhido no grupo."),
        prop("value", "string | number | boolean", "on", "Valor deste item."),
        prop("name", "string", '""', "Agrupa os radios no formulário. Vazio gera um nome."),
        prop("label", "string", '""', "Texto ao lado. O slot padrão substitui."),
        prop("disabled", "boolean", "false", "Impede a escolha deste item."),
      ],
      slots: [{ name: "default", description: "Substitui o label." }],
    },
  ],
  modal: [
    {
      name: "AdsModal",
      summary: "Confirmação que interrompe. dialog no centro; sheet preso à base, no app.",
      props: [
        prop("v-model:open", "boolean", "false", "Controla a abertura."),
        prop("title", "string", "obrigatória", "Título. O slot title substitui."),
        prop("description", "string", "—", "Texto de apoio."),
        prop("icon", "string", "—", "Ícone Lucide ao lado do título. Sem valor, o título fica só com o texto."),
        prop("cancelLabel", "string", "Cancelar", "Rótulo da ação secundária."),
        prop("confirmLabel", "string", "Continuar", "Rótulo da ação principal."),
        prop("variant", "dialog | sheet", "dialog", "dialog centraliza. sheet cola na base e arredonda só o topo."),
        prop("size", "md | lg | xl | 2xl | 3xl", "md", "Largura do cartão. md é o diálogo de confirmação, 532px. ⚠️ Só no código: o Figma não tem eixo de tamanho."),
        prop("scrollable", "boolean", "false", "Permite rolagem quando o conteúdo passa da tela."),
        prop("dismissible", "boolean", "true", "Overlay e Esc fecham."),
        prop("closable", "boolean", "true", "Mostra o X. Overlay e Esc continuam no dismissible."),
      ],
      events: [
        { name: "confirm", payload: "—", description: "A ação principal foi acionada." },
        { name: "cancel", payload: "—", description: "Ação Cancelar ou o X." },
        { name: "dismiss", payload: '"esc" | "outside"', description: "Fechou sem a ação principal." },
      ],
      slots: [
        { name: "title", description: "Substitui o título." },
        { name: "default", description: "Corpo. Quando existe, esconde as ações padrão." },
        { name: "footer", description: "Ações. Quando existe, esconde as ações padrão." },
      ],
    },
  ],
  "menu-bar": [
    {
      name: "AdsMenuBar",
      summary: "Barra vertical do RADAR. Itens internos não são exportados.",
      props: [
        prop("items", "AdsMenuBarItem[]", "menu default", "Rótulo, ícone e link. dividerBefore desenha o fio."),
        prop("activeId", "string", '""', "Item selecionado, em azul."),
        prop("openId", "string", '""', "Item aberto: faixa de 4px à esquerda."),
      ],
    },
  ],
  "navbar-app": [
    {
      name: "AdsNavbarApp",
      summary: "Barra inferior do app, 88px.",
      props: [
        prop("items", "AdsNavbarAppItem[]", "Home, Agenda, Apps, Tickets, Perfil", "Cinco destinos."),
        prop("activeId", "string", "home", "Destino ativo. O ícone ganha fundo #344563."),
      ],
    },
  ],
  "navbar-desk": [
    {
      name: "AdsNavbarDesk",
      summary: "Barra superior de 64px com marca, tag de produto e ações.",
      props: [
        prop("product", "AdsProductTagName | null", "performance", "Tag à direita da marca. null esconde."),
        prop("productLabel", "string", "performance", "Texto da tag."),
        prop("showBroadcast", "boolean", "true", "Pílula LIVE."),
        prop("avatarUrl", "string", '""', "Foto circular de 32px. Vazio mostra um ícone."),
      ],
    },
  ],
  "side-menu": [
    {
      name: "AdsSideMenu",
      summary: "Menu de 224px. Filho, mãe aberta e item regular seguem o Figma.",
      props: [
        prop("items", "AdsSideMenuItem[]", "obrigatória", "Árvore. children abre e fecha no clique."),
        prop("defaultOpen", "string[]", "[]", "Ids já abertos."),
      ],
    },
  ],
  footer: [
    {
      name: "AdsFooter",
      props: [prop("developerLabel", "string", "Desenvolvido por", "Texto ao lado da logo.")],
    },
  ],
  "product-tag": [
    {
      name: "AdsProductTag",
      summary: "Tag de produto da navbar. Mapeia o _Tags interno do Figma.",
      props: [
        prop("product", "AdsProductTagName", "performance", "Produto. A cor vem da escala de produtos Radar."),
        prop("label", "string", '""', "Texto. Vazio usa o nome do produto."),
      ],
    },
  ],
  "feature-card": [
    {
      name: "AdsFeatureCard",
      summary: "Entrada de um fluxo, com 396px: ícone, título, descrição e seta. Usa o AdsCard por baixo; só o conteúdo é próprio.",
      props: [
        prop("title", "string", "obrigatória", "Título do fluxo."),
        prop("description", "string", "obrigatória", "Texto de apoio. Se cortar, ganha tooltip."),
        prop("icon", "string", "obrigatória", "Ícone Lucide."),
        prop("color", "primary | success | attention | warning | new | blocked | ai", "primary", "Cor da caixa do ícone. ai usa surface-ai/text-ai. O hover não muda com a cor. ⚠️ Sem mapeamento no Figma."),
        prop("to", "RouteLocationRaw", "—", "Vira link. Sem valor, continua botão."),
        prop("disabled", "boolean", "false", "Fluxo ainda indisponível."),
        prop("hoverable", "boolean", "true", "Hover padrão dos cards: borda cinza mais escura, sombra leve e seta mais escura. false desliga."),
        prop("badges", "{ label: string; tone?: AdsPillTone; status?: AdsPillStatus }[]", "—", "Pílulas do rodapé."),
        prop("footerIcon", "string", "—", "Ícone do rodapé."),
        prop("footerText", "string", "—", "Texto do rodapé."),
      ],
      events: [{ name: "click", payload: "MouseEvent", description: "O cartão foi acionado enquanto não está desabilitado." }],
    },
  ],
  card: [
    {
      name: "AdsCard",
      summary: "Card Big Number nos tipos Container (título, período e conteúdo livre) e Detalhes (título e lista de informações). Substitui UCard.",
      props: [
        prop("type", "container | details", "container", "container recebe gráfico, tabela ou lista no slot padrão; details mostra rows."),
        prop("title", "string", "—", "16 regular no container, 20 bold no details. O slot header substitui."),
        prop("hint", "string", "—", "Texto do ícone de informação ao lado do título."),
        prop("period", "string", "—", "Datas no selo azul, como 01/12/2023 - 20/12/2023."),
        prop("periodLabel", "string", "Período:", "Rótulo antes do selo."),
        prop("rows", "AdsCardRow[]", "[]", "Linhas do details: { icon?, label, value }."),
        prop("selected", "boolean", "false", "Fundo azul claro, borda azul e sombra."),
        prop("loading", "boolean", "false", "Container mostra o loader do Radar; details vira skeleton."),
        prop("empty", "boolean", "false", "Mantém o cabeçalho e mostra o empty state pequeno."),
        prop("emptyMessage", "string", "Sem dados no período", "Título do empty state."),
        prop("emptyDescription", "string", "—", "Texto de apoio do empty state."),
        prop("as", "div | button | componente de link", "div", "button quando o cartão é a própria ação; um link, como NuxtLink, com to no card."),
        prop("disabled", "boolean", "false", "Só vale quando as é button."),
        prop("hoverable", "boolean", "true", "Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga."),
        prop("radius", "sm | md", "md", "md (12px) é o do Figma. ⚠️ sm é só no código."),
        prop("description", "string", "—", "Texto de apoio abaixo do cabeçalho. ⚠️ Só no código."),
        prop("footerText", "string", "—", "Linha no rodapé. O slot footer substitui. ⚠️ Só no código."),
      ],
      slots: [
        { name: "header", description: "Substitui o título." },
        { name: "actions", description: "Menu ou ações à direita do título." },
        { name: "default", description: "Conteúdo do container. No details, entra abaixo das linhas." },
        { name: "empty", description: "Substitui o empty state." },
        { name: "empty-actions", description: "Botões do empty state." },
        { name: "footer", description: "Rodapé. Substitui footerText." },
      ],
    },
  ],
  "metric-card": [
    {
      name: "AdsMetricCard",
      summary: "Card Big Number nos tipos KPI (ícone grande, título e valor), Pendência (número com unidade, bom para seleção) e Métrica (período, valor com variação e comparativo).",
      props: [
        prop("type", "kpi | pending | metric", "metric", "Escolhe o layout do card."),
        prop("title", "string", "obrigatória", "16 regular; em negrito na Pendência."),
        prop("value", "string", "—", "20 bold no KPI, 24 bold na Pendência e na Métrica."),
        prop("hint", "string", "—", "Texto do ícone de informação ao lado do título."),
        prop("icon", "string", "—", "Ícone Lucide: 24px no KPI, 16px na Pendência."),
        prop("unit", "string", "—", "Unidade ao lado do número na Pendência, como pendências."),
        prop("valueIcon", "string", "—", "Ícone de 24px antes do valor na Métrica."),
        prop("delta", "string", "—", "Variação ao lado do valor (KPI e Métrica), como 1,15%."),
        prop("deltaDirection", "up | down", "up", "Seta para cima ou para baixo."),
        prop("deltaTone", "positive | negative", "positive", "Verde quando a variação é boa, vermelho quando é ruim."),
        prop("period", "string", "—", "Datas no selo azul (Métrica)."),
        prop("periodLabel", "string", "Período:", "Rótulo antes do selo."),
        prop("comparisonLabel", "string", "—", "Rótulo do comparativo (Métrica). Sem ele, o comparativo some."),
        prop("comparisonValue", "string", "—", "Valor do comparativo, 16 regular."),
        prop("comparisonBadge", "string", "—", "Selo cinza ao lado do rótulo, como Set, Out e Nov."),
        prop("comparisonInline", "boolean", "false", "Rótulo e valor na mesma linha, sem divisória."),
        prop("divider", "boolean", "true", "Linha entre o valor e o comparativo empilhado."),
        prop("selected", "boolean", "false", "Fundo azul claro, borda azul e sombra. No Figma, só no KPI e na Pendência."),
        prop("loading", "boolean", "false", "Título e rótulos ficam; os valores viram skeleton."),
        prop("empty", "boolean", "false", "KPI e Pendência mostram — com a mensagem; Métrica mostra o empty state."),
        prop("emptyMessage", "string", "Sem dados no período", "Mensagem do estado Vazio."),
        prop("emptyDescription", "string", "—", "Texto de apoio do empty state da Métrica."),
        prop("as", "div | button", "div", "button quando o cartão é a própria ação, como numa Pendência selecionável."),
        prop("disabled", "boolean", "false", "Só vale quando as é button."),
        prop("hoverable", "boolean", "true", "Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga."),
      ],
      slots: [
        { name: "actions", description: "Menu à direita do título (Métrica)." },
        { name: "empty", description: "Substitui o empty state da Métrica." },
        { name: "empty-actions", description: "Botões do empty state da Métrica." },
      ],
    },
  ],
  "panel-card": [
    {
      name: "AdsPanelCard",
      summary: "Card Painel: card grande, em largura total, para gráfico ou tabela. Título, info, subtítulo e botões de alternar visualização opcionais.",
      props: [
        prop("title", "string", "—", "Título 16 regular. O slot header substitui."),
        prop("hint", "string", "—", "Texto do ícone de informação ao lado do título."),
        prop("subtitle", "string", "—", "Linha de apoio 12 regular abaixo do título."),
        prop("viewToggle", "boolean", "false", "Mostra os botões Gráfico e Tabela."),
        prop("v-model:view", "chart | table", "chart", "Visualização ativa. Troque o conteúdo do slot conforme o valor."),
        prop("radius", "sm | md", "sm", "sm (8px) é o do Figma. ⚠️ md é só no código."),
        prop("loading", "boolean", "false", "Shimmer sobre o painel. ⚠️ Só no código: o Figma não tem esse estado."),
      ],
      slots: [
        { name: "header", description: "Substitui título, info e subtítulo." },
        { name: "actions", description: "Ações à direita, antes dos botões de visualização." },
        { name: "default", description: "Corpo do painel: gráfico, tabela ou qualquer conteúdo." },
      ],
    },
  ],
  stepper: [
    {
      name: "AdsStepper",
      summary: "Indica o progresso em um fluxo de múltiplos passos. Variante simples usa barras; visual usa círculos com ícone ou número. Passos concluídos mostram check; atual fica destacado; pendentes em cor terciária.",
      props: [
        prop("steps", "AdsStepperStep[]", "obrigatória", "Lista de passos (mín. 2, máx. 6). Cada passo aceita label, icon e description (só no Stepper Visual)."),
        prop("orientation", "'horizontal' | 'vertical'", "'horizontal'", "Direção do Stepper Visual. Na horizontal, título e descrição ficam abaixo do círculo, com pelo menos 120px por passo. Na vertical, o círculo fica à esquerda, com título e descrição à direita."),
        prop("variant", "'simple' | 'visual'", "'simple'", "Estilo visual. simple: barras horizontais; visual: círculos conectados."),
        prop("indicator", "'icon' | 'number'", "'number'", "O que exibir no círculo de passos pendentes/atuais (Stepper Visual). Concluídos sempre mostram check."),
        prop("showLabels", "boolean", "true", "Exibe os rótulos: abaixo da barra no simples, junto do círculo no visual."),
        prop("clickable", "boolean", "false", "Permite navegar clicando nos passos."),
        prop("allowForward", "boolean", "false", "Permite clicar em passos futuros (só válido quando clickable=true)."),
        prop("ariaLabel", "string", "'Progresso'", "Rótulo acessível do elemento nav."),
      ],
      events: [
        { name: "update:modelValue", payload: "number", description: "Índice do novo passo atual (v-model)." },
      ],
    },
  ],
  "dropdown-menu": [
    {
      name: "AdsDropdownMenu",
      summary: "Menu suspenso de ações sobre o UDropdownMenu. Para escolher valores, use o AdsSelect.",
      props: [
        prop("items", "DropdownMenuItem[] | DropdownMenuItem[][]", "[]", "Ações. Arrays aninhados viram grupos com separador."),
        prop("content", "{ side?, align?, sideOffset? }", "—", "Posição do menu."),
      ],
      slots: [{ name: "default", description: "Gatilho do menu (ex.: UButton)." }],
    },
  ],
  table: [
    {
      name: "AdsTable",
      summary: "Tabela operacional sobre o UTable (TanStack Table). Cabeçalho e colunas fixos, linhas zebradas, 9 tipos de célula e carregamento com AdsTableSkeleton.",
      props: [
        prop("data", "T[]", "obrigatória", "Linhas da tabela."),
        prop("columns", "TableColumn<T>[]", "obrigatória", "Definição das colunas (TanStack Table). Use os helpers de adsTableColumn para metadados de estilo."),
        prop("sticky", "boolean | 'header' | 'all'", "false", "Fixa o cabeçalho (header) ou cabeçalho e colunas ao mesmo tempo (all). true = header."),
        prop("v-model:column-pinning", "{ left?: string[]; right?: string[] }", "—", "IDs das colunas a fixar à esquerda ou direita. O botão de fixar do cabeçalho depende do v-model."),
        prop("striped", "boolean", "false", "Linhas alternadas (zebra)."),
        prop("borders", "none | lines | grid", "lines", "Bordas horizontais (lines) ou completa (grid)."),
        prop("density", "sm | md", "md", "Altura das linhas: sm compacto, md padrão."),
        prop("loading", "boolean", "false", "Exibe o skeleton de carregamento."),
        prop("skeleton-rows", "number", "4", "Linhas do AdsTableSkeleton. 1–8."),
        prop("skeleton-variant", "skeleton | logo", "skeleton", "Variante do AdsTableSkeleton."),
        prop("get-sub-rows", "(row: T) => T[] | undefined", "—", "Função de sub-linhas para árvore/depth."),
        prop("get-row-id", "(row: T) => string", "—", "ID único da linha, obrigatório com sub-linhas."),
        prop("v-model:expanded", "Record<string, boolean>", "—", "Estado de abertura das linhas pai."),
        prop("framed", "boolean", "true", "Borda e raio externos da tabela. Desative dentro de AdsCard."),
      ],
      slots: [
        { name: "#<colId>-header", description: "Cabeçalho customizado da coluna." },
        { name: "#<colId>-cell", description: "Célula customizada da coluna. Recebe { row }." },
        { name: "#<colId>-footer", description: "Rodapé customizado da coluna." },
        { name: "#loading", description: "Substitui o AdsTableSkeleton padrão." },
        { name: "#empty", description: "Substitui o estado vazio padrão." },
      ],
    },
    {
      name: "AdsTableHeaderCell",
      summary: "Título de coluna (_Table Header Cell). Ordenar e fixar vêm desligados; ligue quando a coluna permitir.",
      props: [
        prop("label", "string", "obrigatória", "Título. Também nomeia os botões para leitor de tela."),
        prop("column", "Column<T>", "—", "Coluna recebida na função header."),
        prop("align", "left | center | right", "left", "Acompanha o conteúdo: pills ao centro, ações à direita."),
        prop("sortable", "boolean", "false", "Mostra o botão de ordenar."),
        prop("pinnable", "boolean", "false", "Mostra o botão de fixar."),
        prop("pin-side", "left | right", "left", "Lado em que o botão fixa a coluna: left no início, right no final da tabela."),
        prop("hide-label", "boolean", "false", "Mantém o título só para leitor de tela."),
      ],
    },
  ],
  "heavy-table": [
    {
      name: "AdsHeavyTable",
      summary: "Tabela financeira (DRE, orçado × realizado). Estende AdsTable com cabeçalho em dois níveis e grupos de linhas em accordion (_Fin Group).",
      props: [
        prop("data", "T[]", "obrigatória", "Linhas raiz da tabela."),
        prop("columns", "TableColumn<T>[]", "obrigatória", "Colunas aninhadas por período. Use adsHeavyAccountColumn() e adsHeavyColumn."),
        prop("get-sub-rows", "(row: T) => T[] | undefined", "obrigatória para accordion", "Sub-linhas do _Fin Group."),
        prop("get-row-id", "(row: T) => string", "obrigatória para accordion", "ID da linha pai."),
        prop("v-model:expanded", "Record<string, boolean>", "—", "Estado de abertura dos grupos."),
        prop("v-model:column-pinning", "{ left?: string[]; right?: string[] }", "—", "Colunas fixas. O botão de fixar do cabeçalho depende do v-model."),
        prop("sticky", "boolean | 'header' | 'all'", "header", "Cabeçalho fixo por padrão."),
      ],
    },
    {
      name: "AdsHeavyAccountCell",
      summary: "Primeira coluna (_Fin Account Cell). Traz o botão de expandir, o recuo por nível e marca a linha para o fundo do grupo e a zebra.",
      props: [
        prop("row", "TableRow<T>", "obrigatória", "Linha recebida no slot da célula."),
        prop("label", "string", "obrigatória", "Nome da conta."),
      ],
    },
    {
      name: "AdsHeavyHeaderCell",
      summary: "Título de coluna (_Fin Header Cell), com ordenar e fixar. Grupos ordenam pela coluna indicada em sort-column.",
      props: [
        prop("label", "string", "obrigatória", "Título."),
        prop("column", "Column<T>", "—", "Coluna recebida na função header."),
        prop("sort-column", "Column<T>", "—", "Subcoluna que o título ordena."),
      ],
    },
  ],
} satisfies Record<string, DocsApi[]>;
