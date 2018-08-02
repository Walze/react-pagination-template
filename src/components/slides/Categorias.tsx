import * as React from 'react'
import Slide from './Slide';
import { ReactJSXElement } from '../../types';

export interface ITopicoProps {
  nome: string,
  slides: Array<ReactJSXElement<Slide>>
}

class Topico extends React.Component<ITopicoProps> {

  constructor(props: ITopicoProps) {
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
