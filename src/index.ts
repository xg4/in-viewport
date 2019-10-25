import 'intersection-observer'
import Unit, { UnitInit, UnitInitWithoutEl } from './unit'

type OnOptions = UnitInit | UnitInitWithoutEl | Function

export default class InViewport {
  private observer: IntersectionObserver
  private queue: Unit[]

  constructor(options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver(this.handler.bind(this), options)
    this.queue = []
  }

  public on(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    const hasUnit = this.queue.find(item => item.el === el)
    if (hasUnit) {
      return this
    }
    const options = this.parseOptions(el, onEnter, onLeave)
    this.queue.push(new Unit(options))
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
    let options: UnitInit = { el }
    if (typeof onEnter === 'function') {
      options = { ...options, onEnter }
      if (typeof onLeave === 'function') {
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
      const target = this.queue.find(unit => unit.el === entry.target)
      if (!target) {
        return
      }

      if (entry.isIntersecting) {
        target.onEnter(entry, observer)
      } else {
        target.onLeave(entry, observer)
        if (target.shouldDestroyByOnce) {
          this.off(target.el)
        }
      }

      target.init()
    })
  }
}
