import 'intersection-observer'
import Node, { NodeInit } from './node'
import { isFunc } from './utils'

type OnOptions = NodeInit | Omit<NodeInit, 'el'> | Function

export default class InViewport {
  private observer: IntersectionObserver
  private queue: Node[]

  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver(this.handler.bind(this), options)
    this.queue = []
  }

  public on(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    const existing = this.queue.find(item => item.el === el)
    if (existing) {
      return this
    }
    const options = this.parseOptions(el, onEnter, onLeave)
    this.queue.push(new Node(options))
    this.observer.observe(el)
    return this
  }

  public once(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    return this.on(el, {
      ...this.parseOptions(el, onEnter, onLeave),
      once: true
    })
  }

  public off(el: Element) {
    this.queue = this.queue.filter(item => item.el !== el)
    this.observer.unobserve(el)
    return this
  }

  private parseOptions(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    let options: NodeInit = { el }
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
