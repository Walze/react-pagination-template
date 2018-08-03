import * as React from 'react'

import { ReactJSXElement } from '../../types';

import Topico from "./Topico"
import TopicosStore from './TopicosStore';
import { topicoEvents } from '../events';

interface ITopicosProps {
  children: Array<ReactJSXElement<Topico>> | ReactJSXElement<Topico>
}

interface ITopicosState {
  topicos: Topico[]
  topicoIndex: number
}

export class Topicos extends React.Component<ITopicosProps, ITopicosState> {

  public state: ITopicosState = {
    topicos: TopicosStore.setTopicos(this.props.children as Topico[]),
    topicoIndex: 0,
  }

  constructor(props: any) {
    super(props)

    topicoEvents.on('changes', topicos => {
      this.setState({ topicos })
    })
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

    this.setState({ topicoIndex: this.state.topicoIndex - 1 })
  }

  private _avancar() {
    if (this.state.topicoIndex + 1 >= this.state.topicos.length) return

    this.setState({ topicoIndex: this.state.topicoIndex + 1 })
  }
}
