import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slide1 from './slides/Slide1';
import Topico from './Topico';
import Slide2 from './slides/Slide2';
import { Topicos } from './Topicos';

// interface IMainState { }

class Main extends React.Component<{}, {}> {

  public topicos: Topicos

  public render() {

    const topicos = this._renderTopicos()

    return (

      <div>

        {/* this.topicos undefined */}
        <Nav
          topicos={this.topicos.state.nomes}
          defaultTopico={this.topicos.state.defaultTopico}
        />

        <div className="container">
          <h1>lorem</h1>

          {topicos}

        </div>

      </div >

    )
  }

  private _renderTopicos = () =>
    <Topicos
      ref={ref => this.topicos = ref!}
    >
      <Topico key='0' nome='CAT1'>

        <Slide1 />
        <Slide2 />

      </Topico>

      <Topico key='1' nome='CAT2'>

        <Slide1 />
        <Slide2 />

      </Topico>
    </Topicos>

}

export default Main
