import * as React from 'react'
import './nav.scss'
import Menu from './menu/Menu';

import setaL from '../../img/seta1.svg'
import setaR from '../../img/seta2.svg'
import TopicosStore from '../topicos/TopicosStore';
import TopicosEvents from '../topicos/TopicosEvents';
import { IndexSignature } from '../../types';

// interface INavProps {}

interface INavState {
  activeTopico: {
    titulo: string;
    subTitulo: string;
  }
}

class Nav extends React.Component<{}, INavState> {

  public state = {
    activeTopico: {
      titulo: '',
      subTitulo: '',
    },
  }

  public menu: Menu | null

  public componentWillMount() {
    TopicosEvents.once('TOPICOS_CHANGE', this._updateTopicos)
    TopicosEvents.on('TOPICO_CHANGE', this._updateTopico)
    document.addEventListener('keyup', this.handleKey)
  }

  public componentWillUnmount() {
    TopicosEvents.off('TOPICO_CHANGE', this._updateTopico)
    document.removeEventListener('keyup', this.handleKey)
  }

  public handleKey = (e: KeyboardEvent) => {
    const key = e.key

    if (key === 'ArrowLeft')
      this.voltar()
    if (key === 'ArrowRight')
      this.avancar()
  }

  public voltar = () => {
    TopicosEvents.emit('VOLTAR_SLIDE')
  }

  public avancar = () => {
    TopicosEvents.emit('AVANCAR_SLIDE')
  }

  public menuClick = () => {
    if (this.menu)
      this.menu.menuClick()
  }

  public render() {
    return (

      <div className='nav'>

        <div className="col info hide-phone">
          <span className='title'>
            {this.state.activeTopico.titulo}
          </span>
          <span className='sub-title'>
            {this.state.activeTopico.subTitulo}
          </span>
        </div>

        <div className='col seta' onClick={this.voltar}>
          <img src={setaL} />
          <span className='hide-phone crete'>voltar</span>
        </div>
        <div className='col seta' onClick={this.avancar}>
          <span className='hide-phone crete'>avançar</span>
          <img src={setaR} />
        </div>

        <div className="col" onClick={this.menuClick}>
          <Menu ref={ref => this.menu = ref} />
        </div>

      </div>

    )
  }

  private _updateTopico = (obj: IndexSignature) =>
    this.setState({
      activeTopico: {
        titulo: obj.titulo,
        subTitulo: obj.subTitulo,
      }
    })

  private _updateTopicos = () =>
    this.setState({
      activeTopico: {
        titulo: TopicosStore.topicos[0].titulo,
        subTitulo: TopicosStore.topicos[0].subTitulo,
      }
    })

}

export default Nav
