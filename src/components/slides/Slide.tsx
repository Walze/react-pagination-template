import * as React from 'react'
import { TCategorias } from './Categorias';

interface ISlideProps {
  categoria: TCategorias
}

abstract class Slide extends React.Component<ISlideProps> {

  constructor(props: ISlideProps) {
    super(props)
  }
}

export default Slide
