import Topico from "./Topico";
import { TopicoEvents } from '../Events';

import Slide from "./Slide";

interface ITopicoStoreItem {
    slideIndex: number
    el: Topico
    slides: Slide[]
}

export default class TopicosStore {

    public static setSlideIndex(topicoNome: string, i: number) {
        const topico = this.getTopico(topicoNome)
        topico.slideIndex = i

        TopicoEvents.emit('SLIDE_CHANGE', topico.slideIndex)
    }

    public static setupTopicos(array: Topico[]) {
        this._topicos = array.map(el => {
            return {
                el,
                slideIndex: 0,
                slides: el.props.children as Slide[]
            }
        })

        TopicoEvents.emit('TOPICOS_CHANGE', this._topicos)
        return this._topicos.map(top => top.el)
    }

    public static getTopico(nome: string) {
        const found = this._topicos.find(top => top.el.props.nome === nome)
        if (!found) throw new Error('Unknown Topico')
        return found
    }

    public static getTopicos() {
        return this._topicos
    }

    static get nomes() {
        return this._topicos.map(top => top.el.props.nome)
    }

    static get default() {
        if (!this._topicos.length) return 'empty'

        return this._topicos[0].el.props.nome
    }

    private static _topicos: ITopicoStoreItem[] = []
}