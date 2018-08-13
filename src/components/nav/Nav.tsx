import * as React from 'react'
import './nav.scss'
import Menu from './menu/Menu';

import setaL from '../../img/seta1.svg'
import setaR from '../../img/seta2.svg'
import TopicosStore from '../topicos/TopicosStore';
import TopicosEvents from '../topicos/TopicosEvents';
import { IndexSignature } from '../../types';
import { wait, getTransitionDelay } from '../../helpers/animation';

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
  public line = React.createRef<HTMLDivElement>()

  public componentWillMount() {
    TopicosEvents.once('TOPICOS_CHANGE', this._updateTopicos)
    TopicosEvents.on('TOPICO_CHANGE', this._updateTopico)
    document.addEventListener('keyup', this.handleKey)
  }

  public componentWillUnmount() {
    TopicosEvents.off('TOPICO_CHANGE', this._updateTopico)
    document.removeEventListener('keyup', this.handleKey)
  }

  public componentDidMount() {
    this._afterEvent()
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
    this._afterEvent()
  }

  public avancar = () => {
    TopicosEvents.emit('AVANCAR_SLIDE')
    this._afterEvent()
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
          <div className="line" ref={this.line} />
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

  private _afterEvent = async () => {
    window.scrollTo({ top: 0 })

    if (!this.line.current) return

    const line = this.line.current
    const time = getTransitionDelay(line)

    line.classList.remove('active')
    await wait(time - 1)
    line.classList.add('active')
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
