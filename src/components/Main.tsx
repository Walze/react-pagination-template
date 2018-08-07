import * as React from 'react'

import './main.scss'
import Topicos from './topicos/Topicos'
import Topico from './topicos/Topico'

import Nav from './nav/Nav'
import Intro from './slides/Intro';
import U1S1 from './slides/uni1/U1S1';
import U1S2 from './slides/uni1/U1S2';

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

          <Topicos>
            <Topico key='0' titulo='Introdução'>
              <Intro />
            </Topico>

            <Topico key='1' titulo='Unidade 1' subTitulo='Categoria'>
              <U1S1 />
              <U1S2 />
            </Topico>

            <Topico key='2' titulo='Unidade 2' subTitulo='Título'>
              <h1>teste</h1>
              <h1>teste2</h1>
            </Topico>

          </Topicos>

        </div>

      </div >

    )
  }

}

export default Main
