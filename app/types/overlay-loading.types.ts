export type OverlayVariant =
  | "loading"
  | "success"
  | "error"
  | "search"
  | "info";

export type OverlayClosableVariant = "success" | "error";

export interface OverlayLoadingOptions {
  title?: string;
  description?: string;
  hint?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: OverlayVariant;
  iconSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
  onUserClose?: () => void;
  closableVariants?: OverlayClosableVariant[];
}

export interface OverlayLoadingProps extends OverlayLoadingOptions {
  isVisible: boolean;
}
