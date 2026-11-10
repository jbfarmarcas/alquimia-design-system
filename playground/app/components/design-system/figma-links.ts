import type { CatalogSectionId } from "./catalog-sections";

/**
 * Onde cada componente do catálogo está no Figma ADS - Componentes.
 * Fonte: inventário do arquivo (inventory.csv), conferido nome a nome e pelo que o componente faz.
 * `figma: null` quer dizer que o inventário não tem component set nem componente solto para ele.
 */

export const FIGMA_FILE_URL = "https://www.figma.com/design/XL3wwjS5jSq43i81EMIyKA/ADS---Componentes";

export type FigmaNode = {
  /** Nome do component set ou do componente no Figma. */
  name: string;
  /** Node id com dois-pontos, como aparece no Figma. */
  nodeId: string;
  url: string;
};

export type FigmaComponentLink = {
  /** Componente do código, igual aos chips da seção. */
  component: string;
  /** Nó principal. `null` quando não existe no Figma. */
  figma: FigmaNode | null;
  /** Outros nós do mesmo componente, como um modo ou uma peça interna. */
  related?: readonly FigmaNode[];
  /** Correspondência por julgamento, sem nome igual no Figma. */
  uncertain?: boolean;
  /** Por que essa correspondência, ou por que não há nó. */
  note?: string;
};

const node = (name: string, nodeId: string): FigmaNode => ({
  name,
  nodeId,
  url: `${FIGMA_FILE_URL}?node-id=${nodeId.replace(":", "-")}`,
});

const absent = (component: string, note: string, uncertain = false): FigmaComponentLink => ({
  component,
  figma: null,
  note,
  ...(uncertain ? { uncertain } : {}),
});

/** Cores não entra: a paleta vem das variáveis do Figma, não de um componente. */
export type FigmaSectionId = Exclude<CatalogSectionId, "cores">;

export const figmaLinks = {
  button: [
    {
      component: "AdsButton",
      figma: node("Button", "5114:5293"),
      related: [node("Button Mobile", "5121:6411"), node("button IA", "7952:4453")],
      note: "O type ia segue o button IA.",
    },
  ],
  "button-group": [{ component: "AdsButtonGroup", figma: node("Group Button", "3249:2153") }],
  "button-menu": [
    { component: "AdsButtonMenu", figma: node("button_dropdown", "5629:2026"), note: "Seção Button + Dropdown da página Buttons." },
  ],
  input: [{ component: "AdsInput", figma: node("Input / Form", "5148:1338") }],
  "number-input": [
    {
      component: "AdsNumberInput",
      figma: node("Input Number", "8947:322"),
      related: [node("Input / Form", "5148:1338")],
      note: "Figma: 🔄 Atualizado: Inputs. 6 estados: Default, Actived, Focus, Error, Disable, AI Mode.",
    },
  ],
  "search-input": [{ component: "AdsSearchInput", figma: node("Input Search", "5148:1414") }],
  textarea: [
    {
      component: "AdsTextarea",
      figma: node("Input Text", "3237:14844"),
      uncertain: true,
      note: "O nome no Figma é Input Text, mas o set é o campo de várias linhas com alça de redimensionar.",
    },
  ],
  "date-picker": [
    {
      component: "AdsDatePicker",
      figma: node("Date Picker", "5709:19294"),
      related: [node("Range Date Picker", "5712:6691")],
      note: "Mode=Day no Date Picker. O modo range segue o Range Date Picker.",
    },
  ],
  "month-picker": [
    { component: "AdsMonthPicker", figma: node("Date Picker", "5709:19294"), note: "Mode=Month do Date Picker." },
  ],
  "filter-select": [{ component: "AdsFilterSelect", figma: node("Select", "5247:811") }],
  "list-dropdown": [{ component: "AdsListDropdown", figma: node("List Dropdown", "6513:6320") }],
  "filter-dropdown": [
    {
      component: "AdsFilterDropdown",
      figma: node("Dropdown", "5251:1009"),
      related: [node("_root_dropdown", "6506:4492")],
      note: "O Dropdown mostra os filtros montados. O _root_dropdown tem checkbox, rádio e busca.",
    },
  ],
  "filter-option": [
    {
      component: "AdsFilterOption",
      figma: node("_Itens Checkbox", "6507:2398"),
      related: [node("_Itens Radio", "6507:8696")],
    },
  ],
  tabs: [{ component: "AdsTabs", figma: node("Tabs", "3658:2419"), note: "Figma: 🔄 Atualizado: Tabs." }],
  "segmented-tabs": [
    { component: "AdsSegmentedTabs", figma: node("Switch Tabs", "3611:5505"), note: "Figma: 🔄 Atualizado: Tabs." },
  ],
  toast: [
    {
      component: "AdsToast",
      figma: node("Toast Header", "3943:2086"),
      related: [node("Toast Alert", "3644:1955")],
      note: "A aparência faixa clara segue o Toast Header; reporte escuro segue o Toast Alert.",
    },
  ],
  "file-card": [
    {
      component: "AdsFileCard",
      figma: node("File Card", "8949:116"),
      note: "Figma: 🆕 Novo: Cards. O ícone segue o status e não é trocável no Figma.",
    },
  ],
  "empty-state": [{ component: "AdsEmptyState", figma: node("Empty State", "3645:2513") }],
  pagination: [
    { component: "AdsPagination", figma: node("Pagination", "5263:41719"), related: [node("_numbers", "5263:41696")] },
  ],
  tooltip: [{ component: "AdsTooltip", figma: node("Tooltip", "5720:10263") }],
  steptip: [{ component: "AdsSteptip", figma: node("Steptip", "5722:8160") }],
  charttip: [
    { component: "AdsCharttip", figma: node("Charttip", "6471:852"), related: [node("_Charttip", "3482:2533")] },
  ],
  smalltip: [{ component: "AdsSmalltip", figma: node("Smalltips", "4107:1816") }],
  loading: [
    {
      component: "AdsLoading",
      figma: node("Loading", "8949:183"),
      note: "Figma: 🆕 Novo: Loading. Variante Logo incluída. Props region e lines não existem no Figma: skeleton tem 3 linhas fixas.",
    },
  ],
  "overlay-loading": [absent("useOverlayLoading", "Não há overlay de processo no inventário.")],
  "progress-bar-loading": [
    {
      component: "ProgressBarLoading",
      figma: node("Progress Bar", "8950:310"),
      note: "Figma: 🆕 Novo: Loading. Sem estado Erro. Estados: 0%, 25%, 50%, 75%, Indeterminado e Sucesso (100%).",
    },
  ],
  "table-skeleton": [
    {
      component: "AdsTableSkeleton",
      figma: node("Table Skeleton", "8984:134"),
      note: "Figma: 🆕 Novo: Loading. rows corresponde a Linha 1 a 8; variante Logo disponível.",
    },
  ],
  badge: [
    {
      component: "AdsBadge",
      figma: node("Badge", "3333:1960"),
      related: [node("Mini_Badge", "6616:4740")],
      note: "A prop mini segue o Mini_Badge.",
    },
  ],
  pill: [
    {
      component: "AdsPill",
      figma: node("Pill", "3334:2006"),
      related: [node("Small Pill", "6184:62"), node("Broadcast", "3333:1973")],
      note: "Pill normal (size=md). A Small Pill do Figma (size=sm) é o mesmo componente em tamanho compacto.",
    },
  ],
  "notability-pill": [
    absent(
      "AdsNotabilityPill",
      "O Pill do Figma tem Status=Default, Success, Attention, Warning, New e Blocked. Imagem, tráfego e lucro não aparecem.",
      true,
    ),
  ],
  switch: [{ component: "AdsSwitch", figma: node("Switch", "3249:814") }],
  checkbox: [{ component: "AdsCheckbox", figma: node("Checkbox", "5142:4992") }],
  radio: [{ component: "AdsRadio", figma: node("Radio", "5142:5104") }],
  modal: [{ component: "AdsModal", figma: node("Modal", "3611:9437") }],
  "menu-bar": [
    { component: "AdsMenuBar", figma: node("Menu bar", "3460:3986"), related: [node("_Itens_Menu_bar", "3460:3646")] },
  ],
  "navbar-app": [{ component: "AdsNavbarApp", figma: node("Navbar App", "3461:9083") }],
  "navbar-desk": [{ component: "AdsNavbarDesk", figma: node("Navbar Desk", "7930:2046") }],
  "side-menu": [
    {
      component: "AdsSideMenu",
      figma: node("Menu lateral", "6684:48355"),
      related: [node("_Item_lateral", "6684:47733"), node("_root_item", "6682:47601")],
    },
  ],
  footer: [{ component: "AdsFooter", figma: node("Footer", "3653:1005") }],
  "product-tag": [
    {
      component: "AdsProductTag",
      figma: node("_Tags", "5460:841"),
      note: "O _Tags ativo, da página RADAR. O _Tags 3647:3834 está arquivado.",
    },
  ],
  stepper: [
    {
      component: "AdsStepper",
      figma: node("Stepper Simples", "8941:144"),
      related: [node("Stepper Visual", "8942:978")],
      note: "Figma: 🆕 Novo: Stepper. Simples (barras) ou Visual (círculos com ícone ou número).",
    },
  ],
  "feature-card": [absent("AdsFeatureCard", "Sem mapeamento no Figma: continua sem nó.")],
  card: [
    {
      component: "AdsCard",
      figma: node("Card Big Number", "8905:357"),
      note: "Figma: 🆕 Novo: Cards. Tipos Container e Detalhes. Estados: Padrão, Selecionado, Carregando e Vazio.",
    },
  ],
  "metric-card": [
    {
      component: "AdsMetricCard",
      figma: node("Card Big Number", "8905:357"),
      note: "Figma: 🆕 Novo: Cards. Tipos KPI e Métrica. Rótulo Body 16 Regular. Estados: Carregando e Vazio.",
    },
  ],
  "panel-card": [
    {
      component: "AdsPanelCard",
      figma: node("Card Painel", "8907:1080"),
      note: "Figma: 🆕 Novo: Cards.",
    },
  ],
  "dropdown-menu": [
    {
      component: "AdsDropdownMenu",
      figma: node("Super dropdown", "8890:904"),
      related: [node("_Dropdown Item", "8890:780")],
      note: "Figma: 🔄 Atualizado: Select / Filter. Nó 8890:904 'Super dropdown' — componente Set que agrupa as variantes Simples e Checkbox. Não existe nó separado 'Dropdown Menu' neste arquivo.",
    },
  ],
  table: [
    {
      component: "AdsTable",
      figma: node("Table", "8870:1960"),
      related: [
        node("_Table Cell", "8869:2535"),
        node("_Table Header Cell", "8869:2327"),
      ],
      note: "Figma: 🆕 Novo: Table. 9 tipos de célula em _Table Cell. Cabeçalho fixo × Colunas fixas.",
    },
  ],
  "heavy-table": [
    {
      component: "AdsHeavyTable",
      figma: node("Heavy Table", "8879:3558"),
      related: [node("_Fin Group", "8879:763"), node("_Fin Header Cell", "8878:70")],
      note: "Figma: 🆕 Novo: Heavy Table. Cabeçalho em dois níveis, grupos em accordion, tons de variação.",
    },
  ],
} as const satisfies Record<FigmaSectionId, readonly FigmaComponentLink[]>;

export const figmaLinksFor = (id: CatalogSectionId): readonly FigmaComponentLink[] =>
  id === "cores" ? [] : figmaLinks[id];

/** A seção tem ao menos um nó no Figma. Muda sozinho quando `absent(...)` vira `node(...)` acima. */
export const hasFigmaNode = (id: CatalogSectionId): boolean => figmaLinksFor(id).some((link) => link.figma !== null);
