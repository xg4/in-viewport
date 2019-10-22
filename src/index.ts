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

  public on(el: Element, options?: OnOptions, onLeave?: Function) {
    if (typeof options === 'function') {
      options = { onEnter: options }
      if (typeof onLeave === 'function') {
        options = { ...options, onLeave, el }
      }
    }
    options = { ...options, el }
    if (this.cache.has(el)) {
      return this
    }
    this.cache.set(el, new Entry(options))
    this.observer.observe(el)
    return this
  }

  public once(el: Element, options?: OnOptions, onLeave?: Function) {
    if (typeof options === 'function') {
      options = { onEnter: options }
      if (typeof onLeave === 'function') {
        options = { ...options, onLeave, el }
      }
    }
    options = { ...options, once: true }
    return this.on(el, options, onLeave)
  }

  public off(el: Element) {
    this.cache.delete(el)
    this.observer.unobserve(el)
    return this
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
        if (target.once && target.isInit) {
          this.off(target.el)
        }
      }

      target.init()
    })
  }
}
