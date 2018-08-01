import * as React from 'react'

import { ExpandedLog } from '../helpers/functions';
import { sliderEvents } from './events';

import Slide1 from './slides/Slide1'

class Slider extends React.Component {

  public readonly slides = [
    <Slide1 categoria='Categoria1' />,
    <h1>Lorem2.</h1>,
    <h1>Lorem, ipsum.</h1>,
    <h1>Lorem, ipsum dolor.</h1>,
    <h1>Lorem ipsum dolor sit.</h1>,
    <h1>Lorem ipsum dolor sit amet.</h1>,
    <h1>Lorem ipsum dolor sit amet consectetur.</h1>,
    <h1>Lorem ipsum dolor, sit amet consectetur adipisicing.</h1>,
  ]

  public slideIndex = 0
  public activeSlide = this.slides[0]

  constructor(props: any) {
    super(props)

    sliderEvents.addListener('voltar', () => this._voltar())
    sliderEvents.addListener('avancar', () => this._avancar())
  }

  public componentWillUnmount() {
    // sliderEvents.removeListener('voltar', () => this._voltar())
    // sliderEvents.removeListener('avancar', () => this._avancar())
  }

  public render() {
    return (

      <div className='slider'>
        {this.activeSlide}
      </div>

    )
  }

  private _slideChange() {
    this.activeSlide = this.slides[this.slideIndex]

    sliderEvents.emit('changes', this)
    this.forceUpdate()
  }

  private _voltar() {
    if (this.slideIndex <= 0) return

    this.slideIndex--

    this._slideChange()
  }

  private _avancar() {
    if (this.slideIndex + 1 >= this.slides.length) return

    this.slideIndex++

    this._slideChange()
  }

}

export default Slider
