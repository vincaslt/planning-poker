export function roundToArray(values: number[], num: number) {
  return values.reduce(
    (min, value) => {
      const distance = Math.abs(value - num);
      return distance < min[0] ? [distance, value] : min;
    },
    [Math.abs(values[0] - num), values[0]]
  )[1];
}

export function average(values: number[]) {
  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}
