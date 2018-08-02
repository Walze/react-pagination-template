import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slide1 from './slides/Slide1';
import Topico from './Topico';
import Slide2 from './slides/Slide2';
import { Topicos } from './Topicos';


class Main extends React.Component<{}, {}> {


  public topicos: Topicos = {} as Topicos

  public render() {
    return (

      <div>


        <Nav
          topicos={this.topicos.all}
          defaultTopico={this.topicos.default}
        />

        <div className="container">
          <h1>lorem</h1>

          {/* ref undefined */}
          <Topicos
            ref={ref => {
              if (ref) return this.topicos = ref
              else return ref
            }}
          >
            <Topico key='0' nome='CAT1'>

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
