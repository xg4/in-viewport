import 'intersection-observer'
import Entry, { EntryOptions, EntryOptionsWithoutEl } from './entry'

type OnOptions = EntryOptions | EntryOptionsWithoutEl | Function

export default class InViewport {
  private options: IntersectionObserverInit
  private observer: IntersectionObserver
  private cache: WeakMap<Element, Entry>

  constructor(options: IntersectionObserverInit = {}) {
    this.options = options
    this.observer = new IntersectionObserver(
      this.handler.bind(this),
      this.options
    )
    this.cache = new WeakMap()
  }

  public on(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    if (this.cache.has(el)) {
      return this
    }
    const options = this.parseOptions(el, onEnter, onLeave)
    this.cache.set(el, new Entry(options))
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
    this.cache.delete(el)
    this.observer.unobserve(el)
    return this
  }

  private parseOptions(el: Element, onEnter?: OnOptions, onLeave?: Function) {
    let options: EntryOptions = { el }
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
      const target = this.cache.get(entry.target)
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
