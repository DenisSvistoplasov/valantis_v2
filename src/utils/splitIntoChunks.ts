export function splitIntoChunks<T>(arr: T[], size: number) {
  const result: T[][] = [];

  const chunks = Math.ceil(arr.length / size);
  for (let i = 0; i < chunks; i++){
    result.push(arr.slice(i * size, (i + 1) * size));
  }

  return result;
}