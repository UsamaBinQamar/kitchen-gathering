// Scale the leading numeric/fractional portion of an ingredient quantity string.
// Supports: "1", "2.5", "1/2", "1 1/2", optional trailing unit text ("1 cup").
export function scaleQuantity(qty: string | undefined, factor: number): string {
  if (!qty) return "";
  if (factor === 1) return qty;
  const trimmed = qty.trim();
  // Match: optional whole number + optional fraction, OR a decimal
  const re = /^(\d+(?:\.\d+)?)(?:\s+(\d+)\/(\d+))?|^(\d+)\/(\d+)/;
  const m = trimmed.match(re);
  if (!m) return qty;
  let value = 0;
  let matched = "";
  if (m[4] && m[5]) {
    value = Number(m[4]) / Number(m[5]);
    matched = m[0];
  } else {
    const whole = Number(m[1]);
    if (m[2] && m[3]) {
      value = whole + Number(m[2]) / Number(m[3]);
    } else {
      value = whole;
    }
    matched = m[0];
  }
  const scaled = value * factor;
  const rest = trimmed.slice(matched.length);
  return formatNumber(scaled) + rest;
}

function formatNumber(n: number): string {
  // Try common fractions for nicer display
  const whole = Math.floor(n);
  const frac = n - whole;
  const fractions: Array<[number, string]> = [
    [0, ""],
    [1 / 8, "1/8"],
    [1 / 4, "1/4"],
    [1 / 3, "1/3"],
    [1 / 2, "1/2"],
    [2 / 3, "2/3"],
    [3 / 4, "3/4"],
    [1, ""],
  ];
  let best = fractions[0];
  let bestDiff = Math.abs(frac - best[0]);
  for (const f of fractions) {
    const d = Math.abs(frac - f[0]);
    if (d < bestDiff) {
      bestDiff = d;
      best = f;
    }
  }
  if (bestDiff < 0.04) {
    const w = best[0] === 1 ? whole + 1 : whole;
    if (best[1] === "") return String(w);
    return w === 0 ? best[1] : `${w} ${best[1]}`;
  }
  return (Math.round(n * 100) / 100).toString();
}
