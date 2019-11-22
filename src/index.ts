import 'intersection-observer'
import Node, { NodeOptions } from './node'
import { isFunc, isObj } from './utils'

type OnOptions = NodeOptions | Omit<NodeOptions, 'el'> | Function

export default class InViewport {
  private observer: IntersectionObserver
  private queue: Node[]

  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver(this.handler.bind(this), options)
    this.queue = []
  }

  public on(
    el: Element | NodeOptions,
    onEnter?: OnOptions,
    onLeave?: Function
  ) {
    const options = this.parseOptions(el, onEnter, onLeave)

    const existing = this.queue.find(item => item.el === options.el)
    if (existing) {
      return this
    }

    this.queue.push(new Node(options))
    this.observer.observe(options.el)
    return this
  }

  public once(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    return this.on({
      ...this.parseOptions(el, onEnter, onLeave),
      once: true
    })
  }

  public off(el: Element) {
    this.queue = this.queue.filter(item => item.el !== el)
    this.observer.unobserve(el)
    return this
  }

  /**
   *
   * @param el
   * @param onEnter
   * @param onLeave
   * (options)
   * (el, options) (el, onEnter)
   * (el, onEnter, onLeave)
   */
  private parseOptions(
    el: Element | NodeOptions,
    onEnter?: OnOptions,
    onLeave?: Function
  ) {
    if (isObj<NodeOptions>(el)) {
      return el
    }
    let options: NodeOptions = { el }
    if (isFunc(onEnter)) {
      options = { ...options, onEnter }
      if (isFunc(onLeave)) {
        options = { ...options, onLeave }
      }
    } else {
      options = { ...onEnter, ...options }
    }
    return options
  }

  private handler(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach(entry => {
      const target = this.queue.find(node => node.el === entry.target)
      if (!target) {
        return
      }

      if (entry.isIntersecting) {
        target.onEnter(entry, observer)
      } else {
        target.onLeave(entry, observer)
      }

      if (target.shouldDestroy) {
        this.off(target.el)
      }

      target.init()
    })
  }
}
