import { EventEmitter } from 'events'

type emitType<T> = (event: T, ...args: any[]) => boolean
type onType<T> = (event: T, listener: (...args: any[]) => void) => void

class EventHandler<T extends string> {

    public e: EventEmitter = new EventEmitter()

    public emit: emitType<T> = this.e.emit
    public on: onType<T> = this.e.addListener
    public addListener: onType<T> = this.e.addListener
    public once: onType<T> = this.e.once
    public off: onType<T> = this.e.removeListener
    public removeListener: onType<T> = this.e.removeListener
    public removeAllListeners: onType<T> = this.e.removeAllListeners
}

type TopicoEvents =
    'AVANCAR_SLIDE' |
    'VOLTAR_SLIDE' |
    'AVANCAR_TOPICO' |
    'VOLTAR_TOPICO' |
    'TOPICOS_CHANGE' |
    'TOPICO_CHANGE' |
    'SLIDE_CHANGE'


export const TopicoEvents = new EventHandler<TopicoEvents>()
