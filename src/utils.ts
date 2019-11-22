export const noop = () => {}

export function isFunc<T extends Function>(x: any): x is T {
  return typeof x === 'function'
}

export function isObj<T extends object>(x: any): x is T {
  const type = typeof x
  return x != null && (type === 'object' || type === 'function')
}
