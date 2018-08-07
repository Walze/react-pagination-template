import * as React from 'react'

import { ReactJSXElement, IndexSignature } from '../../types';

import Topico from "./Topico"
import TopicosEvents from './TopicosEvents';
import TopicosStore from './TopicosStore';


export interface ITopicosProps {
  children: Array<ReactJSXElement<Topico>> | ReactJSXElement<Topico>
}

export interface ITopicosState {
  topicos: Topico[]
  topicoIndex: number
}

export default class Topicos extends React.Component<ITopicosProps, ITopicosState> {

  public state: ITopicosState = {
    topicos: TopicosStore.setupTopicos(this.props.children as Topico[] | Topico),
    topicoIndex: TopicosStore.activeTopicoIndex,
  }

  public componentWillMount(): void {
    TopicosEvents.on('TOPICOS_CHANGE', this._setTopicos)
    TopicosEvents.on('TOPICO_CHANGE', this._updateIndex)
    TopicosEvents.on('VOLTAR_TOPICO', this._voltar)
    TopicosEvents.on('AVANCAR_TOPICO', this._avancar)
  }

  public componentWillUnmount(): void {
    TopicosEvents.off('TOPICOS_CHANGE', this._setTopicos)
    TopicosEvents.off('TOPICO_CHANGE', this._updateIndex)
    TopicosEvents.off('VOLTAR_TOPICO', this._voltar)
    TopicosEvents.off('AVANCAR_TOPICO', this._avancar)
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.topicos[this.state.topicoIndex]}
      </div>
    )
  }

  private _setTopicos = (topicos: Topico[]): void => {
    this.setState({ topicos })
  }

  private _updateIndex = (obj: IndexSignature): void => {
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
