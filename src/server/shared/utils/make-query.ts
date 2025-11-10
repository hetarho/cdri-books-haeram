export function makeQuery(params: { key: string; value: string }[]) {
  return params
    .filter(({ value }) => value)
    .map(({ key, value }) => `${key}=${value}`)
    .join('&');
}
