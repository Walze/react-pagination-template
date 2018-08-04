import Topico from "./Topico";
import { TopicosEvents } from './TopicosEvents';

import Slide from "./Slide";

interface ITopicoStoreItem {
    slideIndex: number
    el: Topico
    slides: Slide[]
}

export default class TopicosStore {

    public static setSlideIndex(topico: ITopicoStoreItem, i: number) {
        topico.slideIndex = i

        TopicosEvents.emit('SLIDE_CHANGE', topico.slideIndex)
    }

    public static setupTopicos(array: Topico[]) {
        this._topicos = array.map(el => {
            return {
                el,
                slideIndex: 0,
                slides: el.props.children as Slide[]
            }
        })

        TopicosEvents.emit('TOPICOS_CHANGE', this._topicos)
        return this._topicos.map(top => top.el)
    }

    public static getTopico(nome: string) {
        const found = this._topicos.find(top => top.el.props.nome === nome)

        if (!found) throw new Error('Unknown Topico')
        return found
    }

    public static skipToTopico(nome: string) {
        const top = this.getTopico(nome)
        this.topicoIndex = top.el.props.index
        this.setSlideIndex(top, 0)
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

    static get topicoIndex() {
        return this._topicoIndex
    }

    static set topicoIndex(i: number) {
        this._topicoIndex = i

        TopicosEvents.emit('TOPICO_CHANGE', {
            index: this.topicoIndex,
            nome: this._topicos[this.topicoIndex].el.props.nome
        })
    }

    private static _topicoIndex: number = 0
    private static _topicos: ITopicoStoreItem[] = []
}