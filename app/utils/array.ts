export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function uniqueBy<T extends Record<string, any>>(array: T[], key: keyof T): T[] {
  return [...new Map(array.map((item) => [item[key], item])).values()]
}
