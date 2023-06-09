export default function generateRange(low: number, high: number) {
  const range = [];
  for (let i = low; i <= high; i++) {
    range.push(i);
  }
  return range;
}
