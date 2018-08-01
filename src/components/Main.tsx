import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slider from './Slider'
import Topico from './slides/Categorias';
import Slide3 from './slides/Slide3';
import Slide2 from './slides/Slide2';
import Slide1 from './slides/Slide1';

const TOPICOS_INIT: any[] = [
  <Topico
    nome='CAT1'
    slides={[
      <Slide3 />,
      <Slide2 />,
    ]}
  />,
  <Topico
    nome='CAT2'
    slides={[
      <Slide2 />,
      <Slide1 />,
    ]}
  />,
  <Topico
    nome='CAT3'
    slides={[
      <Slide2 />,
      <Slide3 />,
    ]}
  />,
]

class Main extends React.Component {

  public render() {
    return (

      <div>
        <Nav initialTopico={(TOPICOS_INIT[0] as Topico).props.nome} />

        <div className="container">
          <h1>lorem</h1>

          <Slider topicos={TOPICOS_INIT} />

        </div>
      </div>

    )
  }

}

export default Main
