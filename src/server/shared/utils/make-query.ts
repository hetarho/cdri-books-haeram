export function makeQuery(params: { key: string; value: string }[]) {
  return params
    .filter(({ value }) => value)
    .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
