const digit = 2;

export function formatPercentage(value: number): number {
  return Math.round(value * 100 * Math.pow(10, digit)) / 100;
}

export function calcBuffer(r: number, n: number, c: number): string | number {
  if (c === 0) {
    return "-";
  } else if (n / c >= r) {
    let b = (n / r) - c;
    return Math.floor(b);
  } else {
    let b = (n - c * r) / (1 - r);
    return Math.floor(b);
  }
}

interface WfcResult {
  [key: string]: Set<string>;
}

export function wfc(
  wfc_20: string | null,
  wfc_30: string | null,
  wfc_40: string | null,
  wfc_60: string | null
): WfcResult {
  const set20 = wfc_20 ? new Set(wfc_20.split(',')) : new Set<string>();
  const set30 = wfc_30 ? new Set(wfc_30.split(',')) : new Set<string>();
  const set40 = wfc_40 ? new Set(wfc_40.split(',')) : new Set<string>();
  const set60 = wfc_60 ? new Set(wfc_60.split(',')) : new Set<string>();

  const filtered20 = new Set([...set20].filter(x => !set30.has(x)));
  const filtered30 = new Set([...set30].filter(x => !set40.has(x)));
  const filtered40 = new Set([...set40].filter(x => !set60.has(x)));

  return {
    '60分': set60,
    '40分': filtered40,
    '30分': filtered30,
    '20分': filtered20
  };
}
