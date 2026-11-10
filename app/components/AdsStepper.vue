<template>
  <nav :aria-label="ariaLabel">
    <!-- Stepper Simples: barras horizontais -->
    <div v-if="variant === 'simple'" class="flex items-start gap-4" role="list">
      <component
        :is="clickable ? 'button' : 'div'"
        v-for="(step, index) in steps"
        :key="index"
        :type="clickable ? 'button' : undefined"
        role="listitem"
        :aria-current="index === modelValue ? 'step' : undefined"
        :aria-label="step.label ? `${step.label} — ${stepAriaState(index)}` : `Passo ${index + 1} — ${stepAriaState(index)}`"
        :disabled="clickable ? index > modelValue && !allowForward : undefined"
        class="flex min-w-0 flex-1 flex-col items-start gap-2 rounded-[var(--ads-radius-sm)] text-left enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ads-border-focused)] focus-visible:ring-offset-2"
        @click="onStepClick(index)"
      >
        <span
          class="block h-1 w-full rounded-[2px] transition-colors"
          :class="index <= modelValue ? 'bg-[var(--ads-text-brand)]' : 'bg-[var(--ads-button-secondary-hover)]'"
        />
        <span
          v-if="showLabels && step.label"
          class="w-full truncate text-[length:var(--ads-font-size-xxs)] leading-[1.3] transition-colors"
          :class="simpleLabelClass(index)"
        >
          {{ step.label }}
        </span>
      </component>
    </div>

    <!-- Stepper Visual vertical: círculo à esquerda, título e descrição à direita -->
    <div v-else-if="orientation === 'vertical'" class="flex flex-col items-start" role="list">
      <component
        :is="clickable ? 'button' : 'div'"
        v-for="(step, index) in steps"
        :key="index"
        :type="clickable ? 'button' : undefined"
        role="listitem"
        :aria-current="index === modelValue ? 'step' : undefined"
        :aria-label="step.label ? `${step.label} — ${stepAriaState(index)}` : `Passo ${index + 1} — ${stepAriaState(index)}`"
        :disabled="clickable ? index > modelValue && !allowForward : undefined"
        class="flex w-full items-start gap-4 rounded-[var(--ads-radius-sm)] text-left enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ads-border-focused)] focus-visible:ring-offset-2"
        @click="onStepClick(index)"
      >
        <span class="flex w-12 shrink-0 flex-col items-center">
          <span
            v-if="index > 0"
            class="h-6 w-0.5 rounded-[1px] transition-colors"
            :class="index <= modelValue ? 'bg-[var(--ads-text-brand)]' : 'bg-[var(--ads-border-subtle)]'"
            aria-hidden="true"
          />
          <span
            class="flex size-12 items-center justify-center rounded-[var(--ads-radius-circular)] transition-colors"
            :class="circleClass(index)"
          >
            <UIcon v-if="index < modelValue" name="i-lucide-check" class="size-6" />
            <UIcon v-else-if="indicator === 'icon' && step.icon" :name="step.icon" class="size-6" />
            <span v-else class="text-[length:var(--ads-font-size-xs)] font-bold leading-[1.3]">{{ index + 1 }}</span>
          </span>
        </span>

        <span
          v-if="showLabels && (step.label || step.description)"
          class="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.3]"
          :class="{ 'pt-9': index > 0 }"
        >
          <span
            v-if="step.label"
            class="text-[length:var(--ads-font-size-xs)] font-bold transition-colors"
            :class="titleClass(index)"
          >
            {{ step.label }}
          </span>
          <span
            v-if="step.description"
            class="text-[length:var(--ads-font-size-xxs)] transition-colors"
            :class="index > modelValue ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-text-secondary)]'"
          >
            {{ step.description }}
          </span>
        </span>
      </component>
    </div>

    <!-- Stepper Visual: círculos com ícone ou número -->
    <div v-else class="flex items-start gap-2" role="list">
      <template v-for="(step, index) in steps" :key="index">
        <!-- Conector: centrado no círculo de 48px -->
        <span
          v-if="index > 0"
          class="flex h-12 min-w-10 flex-1 flex-col justify-center"
          aria-hidden="true"
        >
          <span
            class="h-0.5 w-full rounded-[1px] transition-colors"
            :class="index <= modelValue ? 'bg-[var(--ads-text-brand)]' : 'bg-[var(--ads-border-subtle)]'"
          />
        </span>

        <component
          :is="clickable ? 'button' : 'div'"
          :type="clickable ? 'button' : undefined"
          role="listitem"
          :aria-current="index === modelValue ? 'step' : undefined"
          :aria-label="step.label ? `${step.label} — ${stepAriaState(index)}` : `Passo ${index + 1} — ${stepAriaState(index)}`"
          :disabled="clickable ? index > modelValue && !allowForward : undefined"
          class="flex shrink-0 flex-col items-center gap-3 rounded-[var(--ads-radius-sm)] enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ads-border-focused)] focus-visible:ring-offset-2"
          :class="{ 'min-w-[120px]': showLabels }"
          @click="onStepClick(index)"
        >
          <span
            class="flex size-12 items-center justify-center rounded-[var(--ads-radius-circular)] transition-colors"
            :class="circleClass(index)"
          >
            <UIcon v-if="index < modelValue" name="i-lucide-check" class="size-6" />
            <UIcon v-else-if="indicator === 'icon' && step.icon" :name="step.icon" class="size-6" />
            <span v-else class="text-[length:var(--ads-font-size-xs)] font-bold leading-[1.3]">{{ index + 1 }}</span>
          </span>

          <span
            v-if="showLabels && (step.label || step.description)"
            class="flex flex-col items-center gap-0.5 whitespace-nowrap text-center leading-[1.3]"
          >
            <span
              v-if="step.label"
              class="text-[length:var(--ads-font-size-xs)] font-bold transition-colors"
              :class="titleClass(index)"
            >
              {{ step.label }}
            </span>
            <span
              v-if="step.description"
              class="text-[length:var(--ads-font-size-xxs)] transition-colors"
              :class="index > modelValue ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-text-secondary)]'"
            >
              {{ step.description }}
            </span>
          </span>
        </component>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
export interface AdsStepperStep {
  /** Rótulo exibido abaixo da barra (Stepper Simples) ou do círculo (Stepper Visual). */
  label?: string;
  /** Texto abaixo do título. Só aparece no Stepper Visual. */
  description?: string;
  /** Ícone Lucide. Só usado quando indicator="icon" e passo não está concluído. */
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    /** Lista de passos. Mínimo 2, máximo 6. */
    steps: AdsStepperStep[];
    /** Estilo visual do stepper. */
    variant?: "simple" | "visual";
    /** Direção do Stepper Visual. O Stepper Simples é sempre horizontal. */
    orientation?: "horizontal" | "vertical";
    /** O que aparece no círculo do Stepper Visual (passos pendentes). Concluídos sempre mostram check. */
    indicator?: "icon" | "number";
    /** Exibe os rótulos dos passos. */
    showLabels?: boolean;
    /** Permite navegar clicando nos passos. */
    clickable?: boolean;
    /** Permite avançar clicando em passos futuros (só válido quando clickable=true). */
    allowForward?: boolean;
    /** Rótulo acessível da navegação. */
    ariaLabel?: string;
  }>(),
  {
    variant: "simple",
    orientation: "horizontal",
    indicator: "number",
    showLabels: true,
    clickable: false,
    allowForward: false,
    ariaLabel: "Progresso",
  },
);

const modelValue = defineModel<number>({ default: 0 });

const emit = defineEmits<{
  "update:modelValue": [step: number];
}>();

const onStepClick = (index: number) => {
  if (!props.clickable) return;
  if (index > modelValue.value && !props.allowForward) return;
  modelValue.value = index;
};

const stepAriaState = (index: number) => {
  if (index < modelValue.value) return "concluído";
  if (index === modelValue.value) return "atual";
  return "pendente";
};

/** Rótulo do Stepper Simples: atual em negrito, pendente em cor terciária. */
const simpleLabelClass = (index: number): string => {
  if (index < modelValue.value) return "font-medium text-[var(--ads-text-primary)]";
  if (index === modelValue.value) return "font-bold text-[var(--ads-text-primary)]";
  return "font-medium text-[var(--ads-text-tertiary)]";
};

/** Círculo do Stepper Visual: concluído e atual preenchidos com a marca, pendente com borda clara. */
const circleClass = (index: number): string =>
  index <= modelValue.value
    ? "bg-[var(--ads-text-brand)] text-white"
    : "border-2 border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] text-[var(--ads-text-tertiary)]";

/** Título do passo: atual com a cor da marca. */
const titleClass = (index: number): string => {
  if (index < modelValue.value) return "text-[var(--ads-text-primary)]";
  if (index === modelValue.value) return "text-[var(--ads-text-brand)]";
  return "text-[var(--ads-text-tertiary)]";
};
</script>
