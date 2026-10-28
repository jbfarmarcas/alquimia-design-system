/**
 * Formata um número como porcentagem para exibição.
 * Exibe casas decimais apenas quando o valor não for inteiro.
 * 
 * @param value - Valor numérico da porcentagem (ex: 3.25, 50, 100)
 * @returns String formatada com o símbolo % (ex: "3.25%", "50%", "100%")
 * 
 * @example
 * formatPercentage(3.25) // "3.25%"
 * formatPercentage(50) // "50%"
 * formatPercentage(100) // "100%"
 * formatPercentage(0) // "0%"
 */
export const formatPercentage = (value: number): string => {
  // Se for inteiro, não mostra casas decimais
  if (Number.isInteger(value)) {
    return `${value}%`;
  }
  
  // Caso contrário, mostra 2 casas decimais
  return `${value.toFixed(2)}%`;
};

/**
 * Formata um número como porcentagem com um número específico de casas decimais.
 * 
 * @param value - Valor numérico da porcentagem
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns String formatada com o símbolo %
 * 
 * @example
 * formatPercentageWithDecimals(3.256, 2) // "3.26%"
 * formatPercentageWithDecimals(50, 1) // "50.0%"
 */
export const formatPercentageWithDecimals = (
  value: number,
  decimals: number = 2
): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatPercentagePtBr = (
  value: number | undefined | null,
  decimals: number = 1
): string => {
  if (value == null || Number.isNaN(value)) return "-";

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${formatted}%`;
};
