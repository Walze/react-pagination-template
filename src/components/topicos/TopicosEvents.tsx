import EventHandler from "../../helpers/EventHandler";

type TopicoEvents =
    'AVANCAR_SLIDE' |
    'VOLTAR_SLIDE' |
    'AVANCAR_TOPICO' |
    'VOLTAR_TOPICO' |
    'TOPICOS_CHANGE' |
    'TOPICO_CHANGE' |
    'SLIDE_CHANGE'


const TopicosEvents = new EventHandler<TopicoEvents>()
export default TopicosEvents
