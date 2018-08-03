import Topico from "./Topico";
import { TopicoEvents } from '../Events';

import Slide from "./Slide";

type TopicosType = Array<{ el: Topico, slides: Slide[] }>

export default class TopicosStore {

    public static getTopicos() {
        return this._topicos
    }

    public static setupTopicos(array: Topico[]) {
        this._topicos = array.map(el => {
            return {
                el,
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

    public static getSlides(topicoNome: string) {
        return this.getTopico(topicoNome).slides
    }

    static get nomes() {
        return this._topicos.map(top => top.el.props.nome)
    }

    static get default() {
        if (!this._topicos.length) return 'empty'

        return this._topicos[0].el.props.nome
    }

    private static _topicos: TopicosType = []
}