import * as React from 'react'
import Slide from './Slide';

export type SlideArray = Array<React.ReactElement<Slide>>
export type TopicoArray = Array<React.ReactElement<Topico>>

export interface ITopico {
  nome: string,
  slides: SlideArray
}

class Topico extends React.Component<ITopico> {

  constructor(props: ITopico) {
    super(props)
  }

  public render() {
    return (
      <div>
        {this.props.nome}
      </div>
    )
  }
}

export default Topico
