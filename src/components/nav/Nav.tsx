import * as React from 'react'
import './nav.scss'
import Menu from './menu/Menu';
import { sliderEvents } from '../events';

import setaL from '../../img/seta1.svg'
import setaR from '../../img/seta2.svg'

interface INavProps { initialTopico: string }
interface INavState { activeTopico: string }

class Nav extends React.Component<INavProps, INavState> {

  public state = {
    activeTopico: this.props.initialTopico,
  }

  public menu: Menu

  constructor(props: any) {
    super(props)

    sliderEvents.addListener('TOPICO_CHANGE', nome => {
      this.setState({ activeTopico: nome })
    })
  }

  public voltar() {
    sliderEvents.emit('voltar')
  }

  public avancar() {
    sliderEvents.emit('avancar')
  }

  public menuClick = () => {
    this.menu.menuClick()
  }

  public render() {
    return (

      <div className='nav'>

        <div className="col webaula hide-phone">
          <span className='webaula'>Webaula XXXX</span>
          <span className='unidade'>{this.state.activeTopico}</span>
        </div>

        <div className='col seta' onClick={this.voltar}>
          <img src={setaL} />
          <span className='hide-phone'>voltar</span>
        </div>
        <div className='col seta' onClick={this.avancar}>
          <span className='hide-phone'>avançar</span>
          <img src={setaR} />
        </div>

        <div className="col" onClick={this.menuClick}>
          <Menu ref={ref => this.menu = ref!} />
        </div>

      </div>

    )
  }

}

export default Nav
