import { componentTokenCatalog, type TokenComponent } from "../../../../app/theme/component-tokens";
import { catalogGroups } from "./catalog-sections";

export type TokenGroup = {
  name: string;
  /** O grupo do catálogo tem várias seções: no menu ele vira subgrupo. */
  nested: boolean;
  components: TokenComponent[];
};

/**
 * Tokens na estrutura do catálogo: mesmos grupos e mesma ordem de catalog-sections.ts.
 * Cada TokenComponent aponta para a seção do catálogo em `catalog`.
 */
export const tokenGroups: TokenGroup[] = catalogGroups
  .map((group) => ({
    name: group.name,
    nested: group.sections.length > 1,
    components: group.sections.flatMap((section) =>
      componentTokenCatalog.filter((component) => component.catalog === section.id),
    ),
  }))
  .filter((group) => group.components.length > 0);

/** Ordem plana da página de tokens. */
export const orderedTokenComponents: TokenComponent[] = tokenGroups.flatMap((group) => group.components);

if (import.meta.dev) {
  const missing = componentTokenCatalog.filter((component) => !orderedTokenComponents.includes(component));
  if (missing.length) {
    console.warn(`[tokens] Sem seção do catálogo: ${missing.map((component) => component.id).join(", ")}`);
  }
}
