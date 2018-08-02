import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slider from './Slider'
import Topico from './Topico';
import TOPICOS_INIT from './Topicos';

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
