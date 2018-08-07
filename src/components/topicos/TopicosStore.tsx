import Topico from "./Topico";
import TopicosEvents from './TopicosEvents';

import Slide from "./Slide";
import { isArray } from "util";

interface ITopicoStoreItemConstructor {
    titulo: string
    subTitulo: string
    index: number
    slideIndex: number
    el: Topico
    slides: Slide[]
}

class TopicoStoreItem implements ITopicoStoreItemConstructor {
    public titulo: string
    public subTitulo: string
    public index: number
    public slideIndex: number
    public el: Topico
    public slides: Slide[]

    public constructor(obj: ITopicoStoreItemConstructor) {
        this.titulo = obj.titulo
        this.subTitulo = obj.subTitulo
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

export class TopicosStore {

    public static setupTopicos(newTopicos: Topico[] | Topico) {
        let topicos: Topico[] = []

        // make array of not array
        if (isArray(newTopicos)) topicos = newTopicos
        else topicos[0] = newTopicos

        topicos.map(el => {
            let slides: Slide[] = []

            // make array of not array
            if (isArray(el.props.children))
                slides = el.props.children as Slide[]
            else
                slides[0] = el.props.children as Slide

            const newTopico = new TopicoStoreItem({
                titulo: el.props.titulo,
                subTitulo: el.props.subTitulo ? el.props.subTitulo : '',
                index: this.topicos.length,
                el,
                slideIndex: 0,
                slides
            })

            this.topicos.push(newTopico)
        })

        TopicosEvents.emit('TOPICOS_CHANGE', this.topicos)

        return topicos
    }

    public static getTopicoByNome(nome: string) {
        const found = this.topicos.find(top => top.titulo === nome)

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
        return this.topicos.map(top => top.titulo)
    }

    public static get activeTopicoIndex() {
        return this._activeTopicoIndex
    }

    public static set activeTopicoIndex(i: number) {
        this._activeTopicoIndex = i

        TopicosEvents.emit('TOPICO_CHANGE', {
            index: this.activeTopicoIndex,
            titulo: this.topicos[this.activeTopicoIndex].titulo,
            subTitulo: this.topicos[this.activeTopicoIndex].subTitulo,
        })
    }

    private static _activeTopicoIndex = 0
    private static _topicos: TopicoStoreItem[] = []
}

export default TopicosStore