import * as React from 'react'
import Slide from './Slide'
import { ReactJSXElement } from '../../types'

export interface ITopicoProps {
  nome: string,
  children: Array<ReactJSXElement<Slide>> | ReactJSXElement<Slide>
}

export interface ITopicoState {
  slides: Slide[]
  slideIndex: number
}

class Topico extends React.Component<ITopicoProps, ITopicoState> {

  public state = {
    slideIndex: 0,
    slides: this.props.children as Slide[]
  }

  public render() {
    return (
      <div>{this.state.slides[this.state.slideIndex]}</div>
    )
  }

  private _voltar() {
    if (this.state.slideIndex <= 0)
      return

    this.setState({ slideIndex: this.state.slideIndex - 1 })
  }

  private _avancar() {
    if (this.state.slideIndex + 1 >= this.state.slides.length)
      return

    this.setState({ slideIndex: this.state.slideIndex + 1 })
  }
}

export default Topico
