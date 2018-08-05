import * as React from 'react'

import { ReactJSXElement } from '../../types';

import Topico from "./Topico"
import { TopicosEvents } from './TopicosEvents';
import TopicosStore from './TopicosStore';


interface ITopicosProps {
  children: Array<ReactJSXElement<Topico>>
}

interface ITopicosState {
  topicos: Topico[]
  topicoIndex: number
}

export class Topicos extends React.Component<ITopicosProps, ITopicosState> {

  public state: ITopicosState = {
    topicos: TopicosStore.setupTopicos(this.props.children as Topico[]),
    topicoIndex: TopicosStore.activeTopicoIndex,
  }

  public componentWillMount() {
    TopicosEvents.on('TOPICOS_CHANGE', this._setTopicos)
    TopicosEvents.on('TOPICO_CHANGE', this._updateIndex)
    TopicosEvents.on('VOLTAR_TOPICO', this._voltar)
    TopicosEvents.on('AVANCAR_TOPICO', this._avancar)
  }

  public componentWillUnmount() {
    TopicosEvents.off('TOPICOS_CHANGE', this._setTopicos)
    TopicosEvents.off('TOPICO_CHANGE', this._updateIndex)
    TopicosEvents.off('VOLTAR_TOPICO', this._voltar)
    TopicosEvents.off('AVANCAR_TOPICO', this._avancar)
  }

  public render() {
    return (
      <div>
        Topico: {this.state.topicoIndex + 1}
        {this.state.topicos[this.state.topicoIndex]}
      </div>
    )
  }

  private _setTopicos = (topicos: Topico[]) => {
    this.setState({ topicos })
  }

  private _updateIndex = (obj: any) => {
    this.setState({ topicoIndex: obj.index })
  }

  private _voltar = () => {
    if (this.state.topicoIndex <= 0) return

    const index = this.state.topicoIndex - 1
    TopicosStore.activeTopicoIndex = index

    const topico = TopicosStore.topicos[index]
    topico.setSlideIndex(topico.slides.length - 1)
  }

  private _avancar = () => {
    if (this.state.topicoIndex + 1 >= this.state.topicos.length) return

    TopicosStore.activeTopicoIndex = this.state.topicoIndex + 1
  }
}
