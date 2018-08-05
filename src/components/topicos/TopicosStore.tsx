import Topico from "./Topico";
import { TopicosEvents } from './TopicosEvents';

import Slide from "./Slide";

interface ITopicoStoreItemConstructor {
    nome: string
    index: number
    slideIndex: number
    el: Topico
    slides: Slide[]
}

class TopicoStoreItem {
    public nome: string
    public index: number
    public slideIndex: number
    public el: Topico
    public slides: Slide[]

    constructor(obj: ITopicoStoreItemConstructor) {
        this.nome = obj.nome
        this.index = obj.index
        this.slideIndex = obj.slideIndex
        this.el = obj.el
        this.slides = obj.slides
    }

    public setSlideIndex(i: number) {
        this.slideIndex = i

        TopicosEvents.emit('SLIDE_CHANGE', this.slideIndex)
    }
}

export default class TopicosStore {

    public static setupTopicos(newTopicos: Topico[]) {
        newTopicos.map(el => {

            const newTopico = new TopicoStoreItem({
                nome: el.props.nome,
                index: this.topicos.length,
                el,
                slideIndex: 0,
                slides: el.props.children as Slide[]
            })

            this.topicos.push(newTopico)
        })

        TopicosEvents.emit('TOPICOS_CHANGE', this.topicos)

        return newTopicos
    }

    public static getTopicoByNome(nome: string) {
        const found = this.topicos.find(top => top.nome === nome)

        if (!found) throw new Error('Unknown Topico')
        return found
    }

    public static skipToTopico(nome: string) {
        const top = this.getTopicoByNome(nome)
        this.activeTopicoIndex = top.index
        top.setSlideIndex(0)
    }

    public static get topicos() {
        return this._topicos
    }

    public static get nomes() {
        return this.topicos.map(top => top.nome)
    }

    public static get activeTopicoIndex() {
        return this._activeTopicoIndex
    }

    public static set activeTopicoIndex(i: number) {
        this._activeTopicoIndex = i

        TopicosEvents.emit('TOPICO_CHANGE', {
            index: this.activeTopicoIndex,
            nome: this.topicos[this.activeTopicoIndex].nome
        })
    }

    private static _activeTopicoIndex: number = 0
    private static _topicos: TopicoStoreItem[] = []
}