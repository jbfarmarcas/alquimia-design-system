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

const buttonColors = "primary | success | attention | warning | new | innovation | blocked | neutral";
const pillStatuses = "default | success | attention | warning | new | blocked | innovation | neutral";

/** Propriedades, eventos e slots de cada seção. O código vem dos parâmetros de cada demonstração. */
export const docsApis = {
  cores: [
    {
      name: "Tokens de uso",
      summary: "A escala acima é a matéria-prima e tem classes próprias: bg-ads-<grupo>-<passo>, text-ads-… e border-ads-… (ex.: bg-ads-radar-pricing-500). Na interface, prefira o token semântico.",
      propColumns: {
        name: "Token",
        type: "Classe",
        defaultValue: "Valor",
        description: "Uso",
      },
      props: [
        prop("--ads-text-primary", "text-ads-text-primary", "#061938", "Texto principal."),
        prop("--ads-text-secondary", "text-ads-text-secondary", "#505f79", "Texto de apoio."),
        prop("--ads-text-tertiary", "text-ads-text-tertiary", "#a5adba", "Texto desabilitado ou secundário."),
        prop("--ads-text-brand", "text-ads-text-brand", "#006ff7", "Link e destaque da marca."),
        prop("--ads-text-contrast", "text-ads-text-contrast", "#ffffff", "Texto sobre fundo de marca."),
        prop("--ads-surface-main", "bg-ads-surface-main", "#fafbfc", "Fundo da página."),
        prop("--ads-surface-card", "bg-ads-surface-card", "#ffffff", "Fundo de cartão e campo."),
        prop("--ads-surface-brand", "bg-ads-surface-brand", "#006ff7", "Fundo da marca."),
        prop("--ads-border-subtle", "border-ads-border-subtle", "#e5e8eb", "Borda de divisória e cartão."),
      ],
    },
  ],
  botoes: [
    {
      name: "AdsButton",
      summary: "Ação de tela. Sem rótulo, o botão fica quadrado e mostra só o ícone.",
      props: [
        prop("type", "filled | outline | unfilled | secondary | ia", "filled", "Visual do botão. Outline e unfilled não têm pressed. IA ignora a cor: um brilho de gradiente gira em volta da borda."),
        prop("color", buttonColors, "primary", "Cor do status. Neutral é ação sem status."),
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
  campos: [
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
      ],
      events: [
        { name: "focus", payload: "FocusEvent", description: "O campo recebe o foco." },
        { name: "blur", payload: "FocusEvent", description: "O campo perde o foco." },
      ],
    },
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
        prop("state", "default | active | focus | error | disabled | null", "null", "Congela o estado na documentação."),
      ],
      events: [
        { name: "focus", payload: "FocusEvent", description: "O campo recebe o foco." },
        { name: "blur", payload: "FocusEvent", description: "O campo perde o foco." },
      ],
    },
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
        prop("state", "default | active | focus | disabled | null", "null", "Congela o estado na documentação."),
      ],
    },
    {
      name: "AdsTextarea",
      props: [
        prop("v-model", "string", '""', "Texto longo."),
        prop("label", "string", '""', "Rótulo acima do campo."),
        prop("hint", "string", '""', "Texto de apoio. Some quando há error."),
        prop("error", "string", '""', "Mensagem de erro."),
        prop("placeholder", "string", '""', "Texto enquanto o campo está vazio."),
        prop("disabled", "boolean", "false", "Impede a edição."),
        prop("state", "default | active | focus | error | disabled | null", "null", "Congela o estado na documentação."),
      ],
    },
    {
      name: "AdsDatePicker",
      summary: "Data única no v-model. Com range, o período vai em start e end.",
      props: [
        prop("v-model", "string", '""', "Data no formato AAAA-MM-DD. Ignorado quando range está ativo."),
        prop("v-model:start", "string", '""', "Início do período."),
        prop("v-model:end", "string", '""', "Fim do período."),
        prop("range", "boolean", "false", "Abre o calendário de período."),
        prop("min", "string", "—", "Data mínima, AAAA-MM-DD."),
        prop("max", "string", "—", "Data máxima, AAAA-MM-DD."),
        prop("disabled", "boolean", "—", "Impede a escolha."),
        prop("readonly", "boolean", "—", "Mostra a data sem abrir o calendário."),
        prop("size", "sm | md | lg", "md", "Altura do campo."),
        prop("maximumDays", "number", "—", "Limite de dias do período, contando o início."),
        prop("class", "string", "—", "Classe no gatilho."),
      ],
    },
  ],
  filtro: [
    {
      name: "AdsFilterSelect",
      summary: "Select com lista, busca ou calendário de mês. Rótulo longo ganha reticências e tooltip.",
      props: [
        prop("v-model", "string | string[]", "obrigatório", "checkbox usa string[]. radio e month usam string."),
        prop("type", "checkbox | radio | month", "obrigatória", "Lista múltipla, escolha única ou mês."),
        prop("label", "string", "—", "Rótulo acima do campo."),
        prop("hint", "string", "—", "Texto de apoio. Some quando há error."),
        prop("error", "string", "—", "Mensagem de erro."),
        prop("placeholder", "string", "Selecione", "Texto sem valor."),
        prop("disabled", "boolean", "false", "Impede a abertura."),
        prop("options", "{ value: string; label: string }[]", "[]", "Itens da lista. month não usa options."),
        prop("searchable", "boolean | null", "null", "null busca só no checkbox."),
        prop("selectAll", "boolean | null", "null", "null mostra “selecionar todos” só no checkbox."),
        prop("selectAllLabel", "string", "Selecionar todos", "Rótulo da ação de marcar todos."),
        prop("allSelectedLabel", "string", "Todos selecionados", "Texto do gatilho quando tudo está marcado."),
        prop("emptyLabel", "string", "Nenhum resultado", "Lista vazia depois da busca."),
        prop("searchPlaceholder", "string", "Pesquisar", "Placeholder da busca interna."),
        prop("block", "boolean", "false", "O gatilho ocupa a largura do campo."),
      ],
    },
  ],
  abas: [
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
    {
      name: "AdsSegmentedTabs",
      summary: "Filtro curto em pílula. Não renderiza painel.",
      props: [
        prop("v-model", "string | number", "obrigatório", "Valor do segmento ativo."),
        prop("items", "TabsItem[]", "obrigatória", "Rótulo e valor de cada segmento."),
        prop("ariaLabel", "string", "—", "Nome do grupo, lido pelo leitor de tela."),
      ],
    },
  ],
  feedback: [
    {
      name: "AdsToast",
      summary: "Faixa de aviso na página. O toast flutuante usa useToast do Nuxt UI.",
      props: [
        prop("status", "primary | success | error | warning | neutral", "error", "Cor e ícone da faixa."),
        prop("app", "boolean", "false", "Faixa estreita de 331px, a variação App."),
        prop("message", "string", "—", "Texto. O slot padrão substitui."),
        prop("icon", "string", "—", "Ícone Lucide. Sem valor, segue o status."),
        prop("closable", "boolean", "true", "Mostra o botão de fechar."),
        prop("actionLabel", "string", "—", "Rótulo da ação, como tentar de novo."),
        prop("actionIcon", "string", "i-lucide-refresh-cw", "Ícone da ação. Vazio esconde o ícone."),
      ],
      events: [
        { name: "close", payload: "—", description: "O botão de fechar foi acionado." },
        { name: "action", payload: "—", description: "A ação da faixa foi acionada." },
      ],
      slots: [{ name: "default", description: "Substitui a mensagem." }],
    },
    {
      name: "AdsFileCard",
      props: [
        prop("name", "string", "obrigatória", "Nome do arquivo."),
        prop("detail", "string", "—", "Linha de apoio, como o tamanho."),
        prop("status", "success | error", "success", "success confirma; error mostra o problema."),
        prop("message", "string", "—", "Texto do problema, acima do arquivo."),
        prop("icon", "string", "—", "Ícone. Sem valor, segue o status."),
        prop("removable", "boolean", "false", "Mostra a ação de remover."),
        prop("removeLabel", "string", "Remover arquivo", "Nome acessível da ação de remover."),
      ],
      events: [{ name: "remove", payload: "—", description: "A ação de remover foi acionada." }],
    },
    {
      name: "InvertedTooltip",
      summary: "Tooltip escuro para texto que não cabe na linha. O tooltip claro do exemplo é o UTooltip.",
      props: [
        prop("text", "string", "obrigatória", "Texto do tooltip. Vazio desliga o tooltip."),
        prop("delayDuration", "number", "150", "Espera antes de abrir, em milissegundos."),
        prop("disabled", "boolean", "false", "Não abre."),
        prop("content.side", "top | right | bottom | left", "top", "Lado em relação ao gatilho."),
        prop("content.align", "start | center | end", "start", "Alinhamento no lado escolhido."),
        prop("content.sideOffset", "number", "8", "Distância do gatilho, em pixels."),
      ],
      slots: [{ name: "default", description: "Gatilho. No texto truncado, o elemento precisa truncar." }],
    },
  ],
  carregando: [
    {
      name: "AdsLoading",
      props: [
        prop("variant", "spinner | skeleton | shimmer", "spinner", "spinner na área vazia, skeleton quando o formato já é conhecido, shimmer sobre o conteúdo."),
        prop("size", "sm | md | lg", "md", "sm na tabela, md na seção, lg no modal."),
        prop("tone", "primary | muted", "primary", "primary no dado da tela, muted numa tabela secundária."),
        prop("region", "boolean", "false", "Centraliza o spinner numa seção vazia."),
        prop("label", "string", '""', "Texto ao lado do spinner."),
        prop("lines", "number", "0", "Linhas do skeleton. Zero desenha um bloco; a class define altura e largura."),
      ],
    },
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
    {
      name: "ProgressBarLoading",
      props: [
        prop("title", "string", '""', "Título do trabalho."),
        prop("description", "string", '""', "Texto de apoio."),
        prop("icon", "string", "i-lucide-loader-circle", "Ícone ao lado do título."),
        prop("showIcon", "boolean", "true", "Mostra o ícone."),
        prop("spinIcon", "boolean", "true", "Gira o ícone."),
        prop("indeterminate", "boolean", "false", "Barra sem percentual conhecido."),
        prop("percent", "number", "0", "Andamento, de 0 a 100."),
        prop("showPercent", "boolean", "true", "Mostra o número do percentual."),
        prop("showElapsedTime", "boolean", "true", "Mostra o tempo decorrido."),
        prop("ariaLabel", "string", '""', "Nome acessível da barra."),
        prop("variant", "primary | success | error", "primary", "Cor da barra. Não altera o comportamento."),
        prop("rootClass", "string", "flex flex-col gap-3", "Classe do contêiner."),
      ],
    },
    {
      name: "ProductTableSkeleton",
      summary: "Mock local do playground. O bloco genérico continua AdsLoading.",
      props: [prop("rows", "number", "4", "Quantidade de linhas do esqueleto.")],
    },
  ],
  pills: [
    {
      name: "AdsBadge",
      props: [
        prop("color", "primary | success | attention | warning | new | innovation | blocked", "primary", "Cor do contador."),
        prop("mini", "boolean", "false", "Ponto de 8px, sem número."),
        prop("value", "string | number", "2", "Número ou texto do contador. Ignorado no mini."),
      ],
    },
    {
      name: "AdsBroadcast",
      props: [
        prop("label", "string", "LIVE", "Texto da pílula."),
        prop("status", "warning | success", "warning", "Cor do ponto e do texto."),
      ],
    },
    {
      name: "AdsPill",
      props: [
        prop("status", pillStatuses, "default", "Cor do estado."),
        prop("tone", "primary | secondary", "primary", "primary é sólido; secondary é a variação clara."),
        prop("label", "string", "—", "Texto. Sem valor, usa o nome do status."),
        prop("icon", "string", "—", "Ícone Lucide à esquerda."),
        prop("iconClass", "string", "—", "Classes do ícone, como o giro do carregamento."),
      ],
    },
    {
      name: "AdsNotabilityPill",
      props: [
        prop("notability", "string", "obrigatória", "image, traffic ou profit. Outro valor cai em image."),
        prop("label", "string", "—", "Texto. Sem valor, formata o nome da notabilidade."),
      ],
    },
    {
      name: "AdsMiniPill",
      props: [
        prop("type", "nao-iniciado | pausado | novo", "nao-iniciado", "Estado compacto."),
        prop("label", "string", "—", "Texto. Sem valor, usa o rótulo do type."),
      ],
    },
  ],
  controles: [
    {
      name: "AdsSwitch",
      props: [
        prop("v-model", "boolean", "false", "Ligado ou desligado."),
        prop("label", "string", '""', "Texto ao lado. O slot padrão substitui."),
        prop("disabled", "boolean", "false", "Impede a troca. O visual muda para o estado desabilitado."),
      ],
      slots: [{ name: "default", description: "Substitui o label." }],
    },
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
        prop("size", "md | lg | xl | 2xl | 3xl", "md", "Largura do cartão. md é o diálogo de confirmação, 532px."),
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
  card: [
    {
      name: "AdsFeatureCard",
      summary: "Entrada de um fluxo, com 396px: ícone, título, descrição e seta.",
      props: [
        prop("title", "string", "obrigatória", "Título do fluxo."),
        prop("description", "string", "obrigatória", "Texto de apoio. Se cortar, ganha tooltip."),
        prop("icon", "string", "obrigatória", "Ícone Lucide."),
        prop("color", "primary | success | attention | warning | new | blocked | innovation", "primary", "Cor do ícone, da seta e da borda. O ícone segue o pill secondary."),
        prop("to", "RouteLocationRaw", "—", "Vira link. Sem valor, continua botão."),
        prop("disabled", "boolean", "false", "Fluxo ainda indisponível."),
        prop("badges", "{ label: string; tone?: AdsPillTone; status?: AdsPillStatus }[]", "—", "Pílulas do rodapé."),
        prop("footerIcon", "string", "—", "Ícone do rodapé."),
        prop("footerText", "string", "—", "Texto do rodapé."),
      ],
      events: [{ name: "click", payload: "MouseEvent", description: "O cartão foi acionado enquanto não está desabilitado." }],
    },
    {
      name: "AdsCard",
      summary: "Cartão de conteúdo. Substitui UCard.",
      props: [
        prop("title", "string", "—", "Título em negrito. O slot header substitui."),
        prop("description", "string", "—", "Texto de apoio. O slot padrão substitui."),
        prop("footerText", "string", "—", "Linha curta no rodapé. O slot footer substitui."),
        prop("as", "div | button", "div", "button quando o cartão é a própria ação."),
        prop("disabled", "boolean", "false", "Só vale quando as é button."),
        prop("selected", "boolean", "false", "Realce de item escolhido."),
        prop("radius", "sm | md", "md", "sm tem 8px; md tem 12px."),
      ],
      slots: [
        { name: "header", description: "Substitui o título." },
        { name: "hint", description: "Conteúdo à direita do título." },
        { name: "actions", description: "Ações no cabeçalho." },
        { name: "default", description: "Corpo. Substitui description." },
        { name: "footer", description: "Rodapé. Substitui footerText." },
      ],
    },
    {
      name: "AdsMetricCard",
      summary: "Número em destaque. Rótulo 14 medium, valor 20 bold, variação 14 bold, legenda 12 regular.",
      props: [
        prop("title", "string", "obrigatória", "Rótulo acima do número."),
        prop("value", "string", "obrigatória", "Número ou frase principal."),
        prop("hint", "string", "—", "Texto do ícone de ajuda ao lado do rótulo."),
        prop("caption", "string", "—", "Linha curta abaixo do número, como o valor atual."),
        prop("empty", "boolean", "false", "Valor ausente: 16px medium, cor tertiary."),
        prop("as", "div | button", "div", "button quando o cartão é a própria ação."),
        prop("disabled", "boolean", "false", "Só vale quando as é button."),
        prop("selected", "boolean", "false", "Realce de item escolhido."),
      ],
      slots: [
        { name: "status", description: "Linha abaixo do rótulo." },
        { name: "delta", description: "Variação ao lado do valor. Some quando empty." },
        { name: "footer", description: "Conteúdo à direita da legenda." },
        { name: "default", description: "Corpo extra abaixo da legenda." },
      ],
    },
  ],
} satisfies Record<string, DocsApi[]>;
