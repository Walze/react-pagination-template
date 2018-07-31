import * as React from 'react'
import { TCategorias } from './ICategorias';

abstract class Slide extends React.Component {

  private _categoria: TCategorias

  get categoria() {
    if (!this._categoria) throw new Error('categoria vazia')

    return this._categoria
  }

  set categoria(value: TCategorias) {
    this._categoria = value
  }

  constructor(props: any) {
    super(props)

  }
}

export default Slide
