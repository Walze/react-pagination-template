import Topico from "./Topico";
import { TopicosEvents } from './TopicosEvents';

import Slide from "./Slide";

interface ITopicoStoreItem {
    nome: string
    index: number
    slideIndex: number
    el: Topico
    slides: Slide[]
}

export default class TopicosStore {

    public static setSlideIndex(topico: ITopicoStoreItem, i: number) {
        topico.slideIndex = i

        TopicosEvents.emit('SLIDE_CHANGE', topico.slideIndex)
    }

    public static setupTopicos(newTopicos: Topico[]) {
        newTopicos.map(el => {

            const newTopico: ITopicoStoreItem = {
                nome: el.props.nome,
                index: this._topicos.length,
                el,
                slideIndex: 0,
                slides: el.props.children as Slide[]
            }

            this._topicos.push(newTopico)
        })

        TopicosEvents.emit('TOPICOS_CHANGE', this._topicos)
        return this._topicos.map(top => top.el)
    }

    public static getTopicoByNome(nome: string) {
        const found = this._topicos.find(top => top.nome === nome)

        if (!found) throw new Error('Unknown Topico')
        return found
    }

    public static skipToTopico(nome: string) {
        const top = this.getTopicoByNome(nome)
        this.topicoIndex = top.index
        this.setSlideIndex(top, 0)
    }

    public static get topicos() {
        return this._topicos
    }

    public static get nomes() {
        return this._topicos.map(top => top.nome)
    }

    public static get topicoIndex() {
        return this._topicoIndex
    }

    public static set topicoIndex(i: number) {
        this._topicoIndex = i

        TopicosEvents.emit('TOPICO_CHANGE', {
            index: this.topicoIndex,
            nome: this._topicos[this.topicoIndex].nome
        })
    }

    private static _topicoIndex: number = 0
    private static _topicos: ITopicoStoreItem[] = []
}