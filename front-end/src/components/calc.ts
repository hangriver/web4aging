export function CRcalc(scale: number): number {
  const val1 = Math.round(scale * 174);
  const val2 = Math.round(255 - scale * 174);
  return Number(((RLcalc(val2) + 0.05) / (RLcalc(val1) + 0.05)).toFixed(2));
}

export function RLcalc(v: number): number {
  return 0.2126 * (v / 255) + 0.7152 * (v / 255) + 0.0722 * (v / 255);
}
