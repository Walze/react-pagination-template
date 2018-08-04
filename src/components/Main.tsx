import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slide1 from './slides/Slide1'
import Topico from './topicos/Topico'
import Slide2 from './slides/Slide2'
import { Topicos } from './topicos/Topicos'
import Slide3 from './slides/Slide3';

// interface IMainState { }

class Main extends React.Component<{}, {}> {

  public topicos: Topicos

  public render() {
    return (

      <div>

        <Nav />

        <div className="container">
          <h1>lorem</h1>

          <Topicos>
            <Topico key='0' nome='CAT1'>

              <Slide1 />
              <Slide2 />
              <Slide3 />

            </Topico>

            <Topico key='1' nome='CAT2'>

              <Slide2 />
              <Slide3 />
              <Slide1 />

            </Topico>
          </Topicos>

        </div>

      </div >

    )
  }

}

export default Main
