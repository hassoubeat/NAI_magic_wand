export async function copy(value) {
  return await navigator.clipboard.writeText(value);
}