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

    const isAlreadyObserved = this.queue.some(item => item.el === options.el)
    if (!isAlreadyObserved) {
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

  private destroyNode(node: Node) {
    this.queue = this.queue.filter(n => n !== node)
    const haveSameElement = this.queue.some(n => n.el === node.el)
    if (!haveSameElement) {
      this.observer.unobserve(node.el)
    }
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

      nodeList.forEach(node => {
        if (entry.isIntersecting) {
          node.onEnter(entry, observer)
        } else {
          node.onLeave(entry, observer)
        }

        if (node.shouldDestroy) {
          this.destroyNode(node)
        }

        node.init()
      })
    })
  }
}
