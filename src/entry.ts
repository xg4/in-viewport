import { noop } from './utils'

export interface EntryOptions {
  el: Element
  onEnter?: Function
  onLeave?: Function
  once?: boolean
}

export type EntryOptionsWithoutEl = Omit<EntryOptions, 'el'>

export default class Entry {
  public el: Element
  private isInit: boolean
  private once: boolean
  public enterCallback: Function
  private leaveCallback: Function

  get shouldDestroyByOnce() {
    return this.isInit && this.once
  }

  constructor({
    el,
    onEnter = noop,
    onLeave = noop,
    once = false
  }: EntryOptions) {
    this.el = el
    this.enterCallback = onEnter
    this.leaveCallback = onLeave
    this.isInit = false
    this.once = once
  }

  public init() {
    if (this.isInit) {
      return
    }
    this.isInit = true
  }

  public onLeave(
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) {
    if (!this.isInit) {
      return
    }
    this.leaveCallback(entry, observer)
  }

  public onEnter(
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) {
    this.enterCallback(entry, observer)
  }
}
