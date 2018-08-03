import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slide1 from './slides/Slide1'
import Topico from './topicos/Topico'
import Slide2 from './slides/Slide2'
import { Topicos } from './topicos/Topicos'

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

            </Topico>

            <Topico key='1' nome='CAT2'>

              <Slide1 />
              <Slide2 />

            </Topico>
          </Topicos>

        </div>

      </div >

    )
  }

}

export default Main
