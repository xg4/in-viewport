export const noop = () => {}

export function isFunc<T extends Function>(x: any): x is T {
  return typeof x === 'function'
}
