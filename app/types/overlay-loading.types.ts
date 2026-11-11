export type OverlayVariant =
  | "loading"
  | "success"
  | "error"
  | "search"
  | "info"
  | "warning";

export interface OverlayLoadingOptions {
  title?: string;
  description?: string;
  hint?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: OverlayVariant;
  iconSrc?: string;
  actionLabel?: string;
  /** Ícone Lucide do botão de ação. Sem valor: refresh-cw no erro, nenhum nos demais. */
  actionIcon?: string;
  onAction?: () => void;
  /** Segunda ação, em botão unfilled ao lado da primeira (ex.: "Fechar" junto de "Tentar novamente"). */
  secondaryActionLabel?: string;
  secondaryActionIcon?: string;
  /** Sem valor, a ação secundária fecha o overlay. */
  onSecondaryAction?: () => void;
  /** Disparado quando uma ação de fechar é acionada. */
  onUserClose?: () => void;
}

export interface OverlayLoadingProps extends OverlayLoadingOptions {
  isVisible: boolean;
}
