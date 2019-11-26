export const noop = () => {}

export function isFunc<T extends Function>(x: any): x is T {
  return typeof x === 'function'
}

export function isObj<T extends object>(x: any): x is T {
  const type = typeof x
  return x != null && (type === 'object' || type === 'function')
}

export function isElement(x: any): x is HTMLElement {
  return typeof HTMLElement === 'object'
    ? x instanceof HTMLElement
    : isObj<HTMLElement>(x) &&
        x.nodeType === 1 &&
        typeof x.nodeName === 'string'
}
