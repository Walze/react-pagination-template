import * as React from 'react'
import './nav.scss'
import Menu from './menu/Menu';

import setaL from '../../img/seta1.svg'
import setaR from '../../img/seta2.svg'
import TopicosStore from '../topicos/TopicosStore';
import { TopicosEvents } from '../topicos/TopicosEvents';

// interface INavProps {}

interface INavState { activeTopico: string }

class Nav extends React.Component<{}, INavState> {

  public state = {
    activeTopico: '',
  }

  public menu: Menu

  public componentWillMount() {
    TopicosEvents.once('TOPICOS_CHANGE', this._updateTopicos)
    TopicosEvents.on('TOPICO_CHANGE', this._updateTopico)
  }

  public componentWillUnmount() {
    TopicosEvents.off('TOPICO_CHANGE', this._updateTopico)
  }

  public voltar() {
    TopicosEvents.emit('VOLTAR_SLIDE')
  }

  public avancar() {
    TopicosEvents.emit('AVANCAR_SLIDE')
  }

  public menuClick = () => {
    this.menu.menuClick()
  }

  public render() {
    return (

      <div className='nav'>

        <div className="col info hide-phone">
          <span className='title'>Title XXXX</span>
          <span className='sub-title'>{this.state.activeTopico}</span>
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

  private _updateTopico = (obj: any) =>
    this.setState({ activeTopico: obj.nome })

  private _updateTopicos = () =>
    this.setState({ activeTopico: TopicosStore.default })

}

export default Nav
