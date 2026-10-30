/**
 * Seções do catálogo (/design-system), uma por componente.
 * `group` é o nome do antigo agrupamento: vira título não clicável no menu lateral e no índice.
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
    group: "Botão",
    purpose: "Ação de tela. O exemplo segue os parâmetros: tipo, cor, tamanho, conteúdo e estado. Outline e unfilled não têm pressed. No tipo IA, um brilho de gradiente gira em volta da borda. O estado de carregamento da ação também fica aqui.",
    components: ["AdsButton"],
  },
  {
    id: "button-group",
    label: "Grupo de botões",
    group: "Botão",
    purpose: "Segmentos unidos. O valor escolhido fica em negrito e com fundo claro.",
    components: ["AdsButtonGroup"],
  },
  {
    id: "button-menu",
    label: "Menu de botão",
    group: "Botão",
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
    id: "filter-select",
    label: "Select de filtro",
    group: "Filtro",
    purpose: "Select com lista, busca ou calendário de mês. Rótulo longo ganha reticências e tooltip.",
    components: ["AdsFilterSelect"],
  },
  {
    id: "list-dropdown",
    label: "Lista",
    group: "Filtro",
    purpose: "Lista de rádio com busca opcional. É o List Dropdown do Figma.",
    components: ["AdsListDropdown"],
  },
  {
    id: "filter-dropdown",
    label: "Painel de filtro",
    group: "Filtro",
    purpose: "Painel da lista, com busca, selecionar todos e divisores.",
    components: ["AdsFilterDropdown"],
  },
  {
    id: "filter-option",
    label: "Opção de filtro",
    group: "Filtro",
    purpose: "Linha da lista. Checkbox alinha a caixa; rádio selecionado fica em negrito.",
    components: ["AdsFilterOption"],
  },
  {
    id: "dropdown-menu",
    label: "Menu de ações",
    group: "Filtro",
    purpose: "Menu de ações do Nuxt UI com o tema ADS. Não é o painel de filtro.",
    components: ["AdsDropdownMenu"],
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
    id: "file-card",
    label: "Arquivo",
    group: "Feedback",
    purpose: "Arquivo enviado: nome, linha de apoio e, no erro, o problema acima do arquivo.",
    components: ["AdsFileCard"],
  },
  {
    id: "empty-state",
    label: "Empty state",
    group: "Feedback",
    purpose: "Área sem conteúdo: título, texto de apoio e duas ações, no tamanho cheio ou small.",
    components: ["AdsEmptyState"],
  },
  {
    id: "pagination",
    label: "Paginação",
    group: "Feedback",
    purpose: "Página atual e total. Acima de 7 páginas, entram reticências.",
    components: ["AdsPagination"],
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
    id: "tooltip-nuxt-ui",
    label: "Tooltip (Nuxt UI)",
    group: "Feedback",
    purpose: "UTooltip claro para dica curta em uma ação, e InvertedTooltip escuro para texto que não cabe na linha.",
    components: ["UTooltip", "InvertedTooltip"],
  },

  {
    id: "loading",
    label: "Loading",
    group: "Carregando",
    purpose: "Espera na tela. Spinner na área vazia, skeleton quando o formato já é conhecido, shimmer quando o conteúdo continua visível. A ação no botão usa o loading do AdsButton.",
    components: ["AdsLoading"],
  },
  {
    id: "overlay-loading",
    label: "Overlay de processo",
    group: "Carregando",
    purpose: "Cobre a página quando o processo não tem uma área própria.",
    components: ["useOverlayLoading"],
  },
  {
    id: "progress-bar-loading",
    label: "Barra de progresso",
    group: "Carregando",
    purpose: "Percentual de um trabalho longo, com resultado de sucesso ou erro.",
    components: ["ProgressBarLoading"],
  },
  {
    id: "product-table-skeleton",
    label: "Skeleton de tabela",
    group: "Carregando",
    purpose: "Esqueleto que segue as colunas da tabela de produtos. Mock local do playground.",
    components: ["ProductTableSkeleton"],
  },

  {
    id: "badge",
    label: "Badge",
    group: "Pills",
    purpose: "Contador compacto. No mini, vira um ponto de 8px sem número.",
    components: ["AdsBadge"],
  },
  {
    id: "broadcast",
    label: "Broadcast",
    group: "Pills",
    purpose: "Pílula LIVE, com o ponto e o texto na cor do status.",
    components: ["AdsBroadcast"],
  },
  {
    id: "pill",
    label: "Pill",
    group: "Pills",
    purpose: "Estado em uma peça compacta, com tom e ícone opcional.",
    components: ["AdsPill"],
  },
  {
    id: "notability-pill",
    label: "Pill de notabilidade",
    group: "Pills",
    purpose: "Notabilidade do produto: imagem, tráfego ou lucro.",
    components: ["AdsNotabilityPill"],
  },
  {
    id: "mini-pill",
    label: "Mini pill",
    group: "Pills",
    purpose: "Estado curto: não iniciado, pausado ou novo.",
    components: ["AdsMiniPill"],
  },
  {
    id: "farmarcas-pill",
    label: "Pill Farmarcas",
    group: "Pills",
    purpose: "Pill de departamento. Não substitui a pill de notabilidade.",
    components: ["AdsFarmarcasPill"],
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
    id: "feature-card",
    label: "Feature card",
    group: "Card",
    purpose: "Entrada de um fluxo: ícone, título, descrição e seta, com 396px.",
    components: ["AdsFeatureCard"],
  },
  {
    id: "card",
    label: "Card",
    group: "Card",
    purpose: "Cartão de conteúdo. Substitui UCard.",
    components: ["AdsCard"],
  },
  {
    id: "metric-card",
    label: "Card de métrica",
    group: "Card",
    purpose: "Número em destaque, com variação, legenda e estado sem dados.",
    components: ["AdsMetricCard"],
  },
] as const;

export type CatalogSection = (typeof catalogSections)[number];
export type CatalogSectionId = CatalogSection["id"];

export type CatalogGroup = {
  name: string;
  sections: CatalogSection[];
};

/** Seções agrupadas pelo nome do antigo grupo, na ordem da lista. */
export const catalogGroups: CatalogGroup[] = catalogSections.reduce<CatalogGroup[]>((groups, section) => {
  const last = groups.at(-1);
  if (last?.name === section.group) last.sections.push(section);
  else groups.push({ name: section.group, sections: [section] });
  return groups;
}, []);
