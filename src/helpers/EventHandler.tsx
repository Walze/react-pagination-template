import { EventEmitter } from 'events'

// tslint:disable:no-any

type emitType<T> = (event: T, ...args: any[]) => boolean
type onType<T> = (event: T, listener: (...args: any[]) => void) => void

export default class EventHandler<T extends string> {

    public e: EventEmitter = new EventEmitter()

    public emit: emitType<T> = this.e.emit
    public on: onType<T> = this.e.addListener
    public addListener: onType<T> = this.e.addListener
    public once: onType<T> = this.e.once
    public off: onType<T> = this.e.removeListener
    public removeListener: onType<T> = this.e.removeListener
    public removeAllListeners: onType<T> = this.e.removeAllListeners
}
