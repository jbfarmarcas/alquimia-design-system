/**
 * Seções do catálogo (/design-system), uma por componente.
 * `group` é o subgrupo do menu lateral e o título no índice. Seções do mesmo grupo ficam juntas,
 * mesmo fora de ordem na lista; a ordem dos grupos é a da primeira seção de cada um.
 * A página e o menu lateral leem esta mesma lista, então um id novo entra nos dois lugares.
 */
export const catalogSections = [
  {
    id: "cores",
    label: "Cores",
    group: "Cores",
    purpose: "Escalas do ADS. O passo é o nome do token; o hex é o valor no código.",
    components: [],
  },

  {
    id: "button",
    label: "Botão",
    group: "Botões",
    purpose: "Ação de tela. O exemplo segue os parâmetros: tipo, cor, tamanho, conteúdo e estado. Outline e unfilled não têm pressed. No tipo IA, um brilho de gradiente gira em volta da borda. O estado de carregamento da ação também fica aqui.",
    components: ["AdsButton"],
  },
  {
    id: "button-group",
    label: "Grupo de botões",
    group: "Botões",
    purpose: "Segmentos unidos. O valor escolhido fica em negrito e com fundo claro.",
    components: ["AdsButtonGroup"],
  },
  {
    id: "button-menu",
    label: "Menu de botão",
    group: "Botões",
    purpose: "Painel do button dropdown, com título, subtítulo e ícone opcionais. O gatilho fica fora do componente.",
    components: ["AdsButtonMenu"],
  },

  {
    id: "input",
    label: "Input",
    group: "Campos",
    purpose: "Campo de formulário de uma linha. O rótulo fica acima do campo.",
    components: ["AdsInput"],
  },
  {
    id: "number-input",
    label: "Número",
    group: "Campos",
    purpose: "Campo numérico com setas de passo e sufixo.",
    components: ["AdsNumberInput"],
  },
  {
    id: "search-input",
    label: "Busca",
    group: "Campos",
    purpose: "Campo de busca, no tamanho padrão ou compacto.",
    components: ["AdsSearchInput"],
  },
  {
    id: "select",
    label: "Select",
    group: "Campos",
    purpose: "Seleção simples, múltipla ou de mês. Gatilho em campo, próprio ou só a lista; opções com subtítulo, selo e busca.",
    components: ["AdsSelect"],
  },
  {
    id: "textarea",
    label: "Texto longo",
    group: "Campos",
    purpose: "Texto em várias linhas. O rótulo fica acima do campo.",
    components: ["AdsTextarea"],
  },
  {
    id: "date-picker",
    label: "Data",
    group: "Campos",
    purpose: "Data única no v-model. Com range, o período vai em start e end.",
    components: ["AdsDatePicker"],
  },
  {
    id: "month-picker",
    label: "Mês",
    group: "Campos",
    purpose: "Grade de meses, 290×284. O filtro de mês embute esta peça.",
    components: ["AdsMonthPicker"],
  },
  {
    id: "tabs",
    label: "Abas",
    group: "Abas",
    purpose: "Faixa de links para trocar a visão da mesma tela.",
    components: ["AdsTabs"],
  },
  {
    id: "segmented-tabs",
    label: "Segmented",
    group: "Abas",
    purpose: "Filtro curto em pílula, na mesma tela. Não renderiza painel.",
    components: ["AdsSegmentedTabs"],
  },

  {
    id: "toast",
    label: "Toast",
    group: "Feedback",
    purpose: "Aviso na página, reporte escuro e o toast flutuante do useToast, com as cores de status do ADS.",
    components: ["AdsToast"],
  },
  {
    id: "empty-state",
    label: "Empty state",
    group: "Feedback",
    purpose: "Área sem conteúdo: título, texto de apoio e duas ações, no tamanho cheio ou small.",
    components: ["AdsEmptyState"],
  },
  {
    id: "tooltip",
    label: "Tooltip",
    group: "Feedback",
    purpose: "Balão com título e descrição brancos. Com slot, abre no hover.",
    components: ["AdsTooltip"],
  },
  {
    id: "steptip",
    label: "Steptip",
    group: "Feedback",
    purpose: "Balão de tour guiado: passo atual, pular, voltar e avançar. No último passo, o botão vira concluir.",
    components: ["AdsSteptip"],
  },
  {
    id: "charttip",
    label: "Charttip",
    group: "Feedback",
    purpose: "Balão de leitura de gráfico: título e uma linha por série.",
    components: ["AdsCharttip"],
  },
  {
    id: "smalltip",
    label: "Smalltip",
    group: "Feedback",
    purpose: "Dica de uma linha, em 10px. Com slot, abre no hover.",
    components: ["AdsSmalltip"],
  },
  {
    id: "loading",
    label: "Loading",
    group: "Carregamento",
    purpose: "Espera na tela. Spinner na área vazia, skeleton quando o formato já é conhecido, shimmer quando o conteúdo continua visível. A ação no botão usa o loading do AdsButton.",
    components: ["AdsLoading"],
  },
  {
    id: "overlay-loading",
    label: "Overlay de processo",
    group: "Carregamento",
    purpose: "Cobre a página quando o processo não tem uma área própria.",
    components: ["useOverlayLoading"],
  },
  {
    id: "progress-bar-loading",
    label: "Barra de progresso",
    group: "Carregamento",
    purpose: "Percentual de um trabalho longo, com resultado de sucesso ou erro.",
    components: ["ProgressBarLoading"],
  },
  {
    id: "table-skeleton",
    label: "Skeleton de tabela",
    group: "Carregamento",
    purpose: "Skeleton da tabela de produtos em duas variantes: barras de placeholder ou loader do Radar.",
    components: ["AdsTableSkeleton"],
  },

  {
    id: "badge",
    label: "Badge",
    group: "Pills",
    purpose: "Contador compacto. No mini, vira um ponto de 8px sem número.",
    components: ["AdsBadge"],
  },
  {
    id: "pill",
    label: "Pill",
    group: "Pills",
    purpose: "Estado em uma peça compacta, com tom, tamanho (md / sm) e ícone opcional. A Small Pill do Figma é size=\"sm\" e o Broadcast é variant=\"broadcast\".",
    components: ["AdsPill", "AdsBroadcast"],
  },
  {
    id: "notability-pill",
    label: "Pill de notabilidade",
    group: "Pills",
    purpose: "Notabilidade do produto: imagem, tráfego ou lucro.",
    components: ["AdsNotabilityPill"],
  },

  {
    id: "switch",
    label: "Switch",
    group: "Controles",
    purpose: "Liga e desliga. Texto de 14, regular, na cor secondary.",
    components: ["AdsSwitch"],
  },
  {
    id: "checkbox",
    label: "Checkbox",
    group: "Controles",
    purpose: "Marca, desmarca ou fica indeterminado. Texto de 14, regular, na cor secondary.",
    components: ["AdsCheckbox"],
  },
  {
    id: "radio",
    label: "Radio",
    group: "Controles",
    purpose: "Uma escolha no grupo. Radios do mesmo grupo compartilham v-model e name.",
    components: ["AdsRadio"],
  },

  {
    id: "modal",
    label: "Modal",
    group: "Modal",
    purpose: "Confirmação que interrompe: título, texto de apoio e duas ações.",
    components: ["AdsModal"],
  },

  {
    id: "menu-bar",
    label: "Menu bar",
    group: "Navegação",
    purpose: "Barra vertical do RADAR, com item ativo e item aberto.",
    components: ["AdsMenuBar"],
  },
  {
    id: "navbar-app",
    label: "Navbar app",
    group: "Navegação",
    purpose: "Barra inferior do app, 88px, com cinco destinos.",
    components: ["AdsNavbarApp"],
  },
  {
    id: "navbar-desk",
    label: "Navbar desk",
    group: "Navegação",
    purpose: "Barra superior de 64px com marca, tag de produto e ações.",
    components: ["AdsNavbarDesk"],
  },
  {
    id: "side-menu",
    label: "Menu lateral",
    group: "Navegação",
    purpose: "Menu de 224px. Filho, mãe aberta e item regular seguem o Figma.",
    components: ["AdsSideMenu"],
  },
  {
    id: "footer",
    label: "Footer",
    group: "Navegação",
    purpose: "Rodapé com a legenda de quem desenvolveu e a logo.",
    components: ["AdsFooter"],
  },
  {
    id: "product-tag",
    label: "Tag de produto",
    group: "Navegação",
    purpose: "Tag de produto da navbar. A cor vem da escala de produtos Radar.",
    components: ["AdsProductTag"],
  },

  {
    id: "dropdown-menu",
    label: "Menu de ações",
    group: "Navegação",
    purpose: "Menu suspenso de ações. Para escolher valores, use o Select.",
    components: ["AdsDropdownMenu"],
  },
  {
    id: "stepper",
    label: "Stepper",
    group: "Navegação",
    purpose: "Progresso em fluxo de múltiplos passos. Simples (barras) ou Visual (círculos), até 6 passos, com troca de passo.",
    components: ["AdsStepper"],
  },

  {
    id: "card",
    label: "Card",
    group: "Cards",
    purpose: "Cartão de conteúdo (tipos Container e Detalhes). Substitui UCard.",
    components: ["AdsCard"],
  },
  {
    id: "metric-card",
    label: "Card de métrica",
    group: "Cards",
    purpose: "Número em destaque (tipos KPI e Métrica). Rótulo 16 regular, valor 20 bold.",
    components: ["AdsMetricCard"],
  },
  {
    id: "panel-card",
    label: "Card painel",
    group: "Cards",
    purpose: "Card grande para gráfico ou tabela, com cabeçalho de título/subtítulo/ações e slot de conteúdo.",
    components: ["AdsPanelCard"],
  },
  {
    id: "file-card",
    label: "Arquivo",
    group: "Cards",
    purpose: "Arquivo enviado: nome, linha de apoio e, no erro, o problema acima do arquivo.",
    components: ["AdsFileCard"],
  },
  {
    id: "feature-card",
    label: "Feature card",
    group: "Cards",
    purpose: "Entrada de um fluxo: ícone, título, descrição e seta, com 396px.",
    components: ["AdsFeatureCard"],
  },

  {
    id: "table",
    label: "Table",
    group: "Tabelas",
    purpose: "Tabela operacional: cabeçalho e colunas fixos, linhas zebradas, 9 tipos de célula, carregamento (AdsTableSkeleton) e estado vazio.",
    components: ["AdsTable", "AdsTableToolbar", "AdsTableSkeleton"],
  },
  {
    id: "heavy-table",
    label: "Heavy Table",
    group: "Tabelas",
    purpose: "Tabela financeira: cabeçalho em dois níveis, grupos em accordion (_Fin Group), tons de variação e projeção.",
    components: ["AdsHeavyTable"],
  },
  {
    id: "pagination",
    label: "Paginação",
    group: "Tabelas",
    purpose: "Página atual e total. Acima de 7 páginas, entram reticências.",
    components: ["AdsPagination"],
  },
] as const;

export type CatalogSection = (typeof catalogSections)[number];
export type CatalogSectionId = CatalogSection["id"];

export type CatalogGroup = {
  name: string;
  sections: CatalogSection[];
};

/** Seções agrupadas por `group`, na ordem em que cada grupo aparece pela primeira vez. */
export const catalogGroups: CatalogGroup[] = catalogSections.reduce<CatalogGroup[]>((groups, section) => {
  const group = groups.find((item) => item.name === section.group);
  if (group) group.sections.push(section);
  else groups.push({ name: section.group, sections: [section] });
  return groups;
}, []);
