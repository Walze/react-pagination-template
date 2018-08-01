import * as React from 'react'

import { ExpandedLog } from '../helpers/functions'
import { sliderEvents } from './events'

import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import Slide3 from './slides/Slide3'
import Topico, { TopicoArray, ITopico } from './slides/Categorias';

const TOPICOS_INIT: TopicoArray = [
  <Topico
    nome='CAT1'
    slides={[
      <Slide1 />,
      <Slide2 />,
    ]}
  />,
  <Topico
    nome='CAT2'
    slides={[
      <Slide2 />,
      <Slide3 />,
    ]}
  />,
  <Topico
    nome='CAT3'
    slides={[
      <Slide1 />,
      <Slide3 />,
    ]}
  />,
]

class Slider extends React.Component {

  public topicos = TOPICOS_INIT

  public topicoIndex = 0
  public slideIndex = 0
  public activeTopico = this.topicos[0]

  constructor(props: any) {
    super(props)

    sliderEvents.addListener('voltar', () => this._voltarSlide())
    sliderEvents.addListener('avancar', () => this._avancarSlide())
  }

  public render() {
    return (

      <div className='slider'>
        {this.activeTopico}
      </div>

    )
  }

  private _topicoChange() {
    this.activeTopico = this.topicos[this.topicoIndex]

    sliderEvents.emit('changes', this)
    this.forceUpdate()
  }

  private _voltarSlide() {
    if (this.slideIndex <= 0) return

    this.slideIndex--

    this._topicoChange()
  }

  private _avancarSlide() {
    const topicoEL = this.topicos[this.slideIndex]
    const topicoPROP = topicoEL.props

    console.log(topicoEL.type, topicoPROP instanceof Topico)
    // if (this.slideIndex + 1 >= this.topicos[this.slideIndex].props) return

  }

  private _voltarTopico() {
    if (this.topicoIndex <= 0) return

    this.topicoIndex--

    this._topicoChange()
  }

  private _avancarTopico() {
    if (this.topicoIndex + 1 >= this.topicos.length) return

    this.topicoIndex++

    this._topicoChange()
  }

}

export default Slider
