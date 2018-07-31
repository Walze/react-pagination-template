import * as React from 'react'

import './main.scss'
import Nav from './nav/Nav'
import Slider from './Slider'

class Main extends React.Component {

  public render() {
    return (

      <div>
        <Nav />

        <div className="container">
          <h1>lorem</h1>

          <Slider  />

        </div>
      </div>

    )
  }

}

export default Main
