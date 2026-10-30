<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['tooltip-nuxt-ui']">
    <template #preview>
      <UTooltip arrow text="Ação principal.">
        <AdsButton type="outline" label="Passe o mouse" />
      </UTooltip>
      <div class="w-48 max-w-full">
        <InvertedTooltip :text="TRUNCATED">
          <span tabindex="0" class="block truncate rounded-[var(--ads-radius-xsm)] text-sm text-[var(--ads-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]">
            {{ TRUNCATED }}
          </span>
        </InvertedTooltip>
      </div>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. Passe o mouse ou foque o botão para o UTooltip e o texto cortado para o InvertedTooltip.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, indent, joinBlocks } from "../../../utils/code-builder";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import InvertedTooltip from "../../../../../app/components/InvertedTooltip.vue";

const TRUNCATED = "Preço médio ponderado dos concorrentes mapeados nesta praça.";

const button = buildTag("AdsButton", [attr(true, "type", "outline"), attr(true, "label", "Passe o mouse")]);
const span = buildTag(
  "span",
  [attr(true, "tabindex", "0"), attr(true, "class", "block truncate text-sm text-[var(--ads-text-primary)]")],
  TRUNCATED,
);

const code = joinBlocks(
  buildTag("UTooltip", [attr(true, "arrow"), attr(true, "text", "Ação principal.")], indent(button)),
  buildTag("InvertedTooltip", [attr(true, "text", TRUNCATED)], indent(span)),
);
</script>
