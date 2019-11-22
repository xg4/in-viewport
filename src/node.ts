import { noop } from './utils'

export interface NodeOptions {
  el: Element
  onEnter?: Function
  onLeave?: Function
  once?: boolean
}

export default class Node {
  public el: Element
  private isInit: boolean
  private once: boolean
  private enterCallback: Function
  private leaveCallback: Function
  public fired: boolean

  get shouldDestroy() {
    return this.isInit && this.once && this.fired
  }

  constructor({
    el,
    onEnter = noop,
    onLeave = noop,
    once = false
  }: NodeOptions) {
    this.el = el
    this.enterCallback = onEnter
    this.leaveCallback = onLeave
    this.once = once
    this.fired = false
    this.isInit = false
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
    this.fired = true
  }

  public onEnter(
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) {
    this.enterCallback(entry, observer)
    this.fired = true
  }
}
