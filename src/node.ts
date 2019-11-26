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
  private enterCalled: number
  private leaveCalled: number

  get shouldDestroy() {
    return this.isInit && this.once && this.called
  }

  get called() {
    return !!(this.enterCalled || this.leaveCalled)
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
    this.enterCalled = 0
    this.leaveCalled = 0
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
    this.leaveCalled += 1
  }

  public onEnter(
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) {
    this.enterCallback(entry, observer)
    this.enterCalled += 1
  }
}
