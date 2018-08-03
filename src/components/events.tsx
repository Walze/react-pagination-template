import { EventEmitter } from 'events'


type TopicoEvents =
    'AVANCAR_SLIDE' |
    'VOLTAR_SLIDE' |
    'AVANCAR_TOPICO' |
    'VOLTAR_TOPICO' |
    'TOPICOS_CHANGE'

class TopicoEventsClass extends EventEmitter {

    constructor() {
        super()
    }

}

export const TopicoEvents = new TopicoEventsClass()
