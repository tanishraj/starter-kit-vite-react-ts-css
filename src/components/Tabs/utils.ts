export function toSafeId(value: string) {
  return value.replaceAll(/\s+/g, '-').toLowerCase();
}
