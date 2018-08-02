import * as React from 'react'

import { ReactJSXElement } from '../types';

import Topico from "./Topico"

interface ITopicosProps {
  children: Array<ReactJSXElement<Topico>> | ReactJSXElement<Topico>
}

interface ITopicosState {
  topicos: Topico[]
  topicoIndex: number
  nomes: string[]
  defaultTopico: string
}

export class Topicos extends React.Component<ITopicosProps, ITopicosState> {

  public state: ITopicosState = {
    topicos: this.props.children as Topico[],
    topicoIndex: 0,
    nomes: (this.props.children as Topico[]).map(top => top.props.nome),
    defaultTopico: (this.props.children as Topico[])[0].props.nome
  }

  public render() {
    return (
      <div>
        {this.state.topicos[this.state.topicoIndex]}
      </div>
    )
  }


  private _voltar() {
    if (this.state.topicoIndex <= 0) return

    this.setState({
      topicoIndex: this.state.topicoIndex - 1
    })
  }

  private _avancar() {
    if (this.state.topicoIndex + 1 >= this.state.topicos.length) return

    this.setState({
      topicoIndex: this.state.topicoIndex + 1
    })
  }
}
