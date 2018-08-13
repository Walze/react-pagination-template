import * as React from 'react'

import './main.scss'
import '../styles/alternativas.scss'
import Topicos from './topicos/Topicos'
import Topico from './topicos/Topico'

import Nav from './nav/Nav'

import INTRO from './slides/Intro'
import T1S1 from './slides/topico1/T1S1';
import T1S2 from './slides/topico1/T1S2';
import T2S1 from './slides/topico2/T2S1';
import T2S2 from './slides/topico2/T2S2';

// interface IMainState { }

class Main extends React.Component<{}, {}> {

  public topicos: Topicos

  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (

      <div>

        <Nav />

        <div className="container">
          <h1>Title</h1>
          <br />

          <Topicos>
            <Topico key='0' titulo='Introdução'>
              <INTRO />
            </Topico>

            <Topico key='1' titulo='Tópico 1' subTitulo='Sub-title 1'>
              <T1S1 />
              <T1S2 />
            </Topico>

            <Topico key='2' titulo='Tópico 2' subTitulo='Sub-title 2'>
              <T2S1 />
              <T2S2 />
            </Topico>

          </Topicos>

        </div>

      </div >

    )
  }

}

export default Main
