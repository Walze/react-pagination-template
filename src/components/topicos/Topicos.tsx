import * as React from 'react'

import { ReactJSXElement } from '../../types';

import Topico from "./Topico"
import TopicosStore from './TopicosStore';
import { TopicoEvents } from '../Events';


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
    topicoIndex: 0,
  }

  public componentWillMount() {
    TopicoEvents.on('TOPICOS_CHANGE', this._setTopicos)
    TopicoEvents.on('VOLTAR_TOPICO', this._voltar)
    TopicoEvents.on('AVANCAR_TOPICO', this._avancar)
  }

  public componentWillUnmount() {
    TopicoEvents.off('TOPICOS_CHANGE', this._setTopicos)
    TopicoEvents.off('VOLTAR_TOPICO', this._voltar)
    TopicoEvents.off('AVANCAR_TOPICO', this._avancar)
  }

  public render() {
    return (
      <div>
        Topico: {this.state.topicoIndex}
        {this.state.topicos[this.state.topicoIndex]}
      </div>
    )
  }

  private _setTopicos = (topicos: Topico[]) => { this.setState({ topicos }) }

  private _voltar = () => {
    if (this.state.topicoIndex <= 0) return

    this.setState({ topicoIndex: this.state.topicoIndex - 1 })
  }

  private _avancar = () => {
    if (this.state.topicoIndex + 1 >= this.state.topicos.length) return

    this.setState({ topicoIndex: this.state.topicoIndex + 1 })
  }
}
