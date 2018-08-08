import * as React from 'react'

import './main.scss'
import Topicos from './topicos/Topicos'
import Topico from './topicos/Topico'

import Nav from './nav/Nav'

import INTRO from './slides/Intro'
import U1S1 from './slides/uni1/U1S1'
import U1S2 from './slides/uni1/U1S2'
import U2S1 from './slides/uni2/U2S1'
import U2S2 from './slides/uni2/U2S2'

// interface IMainState { }

class Main extends React.Component<{}, {}> {

  public topicos: Topicos

  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (

      <div>

        <Nav />

        <div className="container">
          <h1>Composição da Oferta</h1>
          <br />

          <Topicos>
            <Topico key='0' titulo='Introdução'>
              <INTRO />
            </Topico>

            <Topico key='1' titulo='Unidade 1' subTitulo='Categoria'>
              <U1S1 />
              <U1S2 />
            </Topico>

            <Topico key='2' titulo='Unidade 2' subTitulo='Título'>
              <U2S1 />
              <U2S2 />
            </Topico>

          </Topicos>

        </div>

      </div >

    )
  }

}

export default Main
