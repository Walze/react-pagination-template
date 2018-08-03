import Topico from "./Topico";
import { topicoEvents } from "../events";

export default class TopicosStore {

    public static getTopicos() {
        return this._topicos
    }

    public static setTopicos(array: Topico[]) {
        this._topicos = array

        topicoEvents.emit('changes', this._topicos)
        return this._topicos
    }

    static get nomes() {
        return this._topicos.map(top => top.props.nome)
    }

    static get default() {
        if (!this._topicos.length) return 'empty'

        return this._topicos[0].props.nome
    }

    private static _topicos: Topico[] = []
}