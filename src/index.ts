/* eslint-disable no-dupe-class-members */
import 'intersection-observer'
import Node, { NodeOptions } from './node'
import { isFunc, isElement, isObj } from './utils'

export default class InViewport {
  private observer: IntersectionObserver
  private queue: Node[]

  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver(this.handler.bind(this), options)
    this.queue = []
  }

  public on(options: NodeOptions): this

  public on(el: Element, onEnter?: Function, onLeave?: Function): this

  public on(el: Element, options?: Omit<NodeOptions, 'el'>): this

  public on(el: any, onEnter?: any, onLeave?: any) {
    const options = this.parseOptions(el, onEnter, onLeave)

    const existing = this.queue.find(item => item.el === options.el)
    if (!existing) {
      this.observer.observe(options.el)
    }
    this.queue.push(new Node(options))
    return this
  }

  public once(options: NodeOptions): this

  public once(el: Element, onEnter?: Function, onLeave?: Function): this

  public once(el: Element, options?: Omit<NodeOptions, 'el'>): this

  public once(el: any, onEnter?: any, onLeave?: any) {
    return this.on({
      ...this.parseOptions(el, onEnter, onLeave),
      once: true
    })
  }

  public off(el: Element) {
    // TODO: off one, not all el
    this.queue = this.queue.filter(item => item.el !== el)
    this.observer.unobserve(el)
    return this
  }

  private parseOptions(options: NodeOptions): NodeOptions

  private parseOptions(
    el: Element,
    options?: Omit<NodeOptions, 'el'>
  ): NodeOptions

  private parseOptions(
    el: Element,
    onEnter?: Function,
    onLeave?: Function
  ): NodeOptions

  private parseOptions(el: any, onEnter?: any, onLeave?: any) {
    if (isObj<NodeOptions>(el) && !isElement(el)) {
      return el
    }

    if (isFunc(onEnter)) {
      let options: NodeOptions = { el, onEnter }
      if (isFunc(onLeave)) {
        options = { ...options, onLeave }
      }
      return options
    }

    const options: NodeOptions = { ...onEnter, el }
    return options
  }

  private handler(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach(entry => {
      const nodeList = this.queue.filter(node => node.el === entry.target)
      if (!nodeList.length) {
        return
      }

      nodeList.forEach(n => {
        if (entry.isIntersecting) {
          n.onEnter(entry, observer)
        } else {
          n.onLeave(entry, observer)
        }

        if (n.shouldDestroy) {
          this.off(n.el)
        }

        n.init()
      })
    })
  }
}
