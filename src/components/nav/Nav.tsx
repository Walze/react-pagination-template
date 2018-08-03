import * as React from 'react'
import './nav.scss'
import Menu from './menu/Menu';
import { topicoEvents } from '../events'

import setaL from '../../img/seta1.svg'
import setaR from '../../img/seta2.svg'
import TopicosStore from '../topicos/TopicosStore';

// interface INavProps {}

interface INavState { activeTopico: string }

class Nav extends React.Component<{}, INavState> {

  public state = {
    activeTopico: TopicosStore.default,
  }

  public menu: Menu

  constructor(props: any) {
    super(props)

    topicoEvents.once('changes', () => this.setState({ activeTopico: TopicosStore.default }))
    topicoEvents.addListener('TOPICO_CHANGE', topico => this.setState({ activeTopico: topico }))
  }

  public componentDidMount() {
    console.log(this)
  }

  public voltar() {
    topicoEvents.emit('voltar')
  }

  public avancar() {
    topicoEvents.emit('avancar')
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
