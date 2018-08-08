import * as React from 'react'
import './menu.scss'
import { loopDelay, getTransitionDelay } from '../../../helpers/animation';

import menu from '../../../img/menu.svg'
import TopicosStore from '../../topicos/TopicosStore';

// interface IMenuProps {}

interface IMenuState {
  active: boolean
  running: boolean
  hidden: boolean
}

class Menu extends React.Component<{}, IMenuState> {
  public state = {
    active: false,
    running: false,
    hidden: true,
  }

  public openUL: HTMLElement | null

  public async menuClick() {
    if (this.state.running) return

    this.setState({
      running: true,
      hidden: false,
    }, async () => {

      const ul = this.openUL as HTMLElement

      const li = ul.children[0];
      const duration = getTransitionDelay(li)

      await loopDelay(ul.childElementCount, duration, (i, total) => {

        if (this.state.active) {
          ul.classList.remove('active')
          ul.children[i].classList.remove('active')
        } else {
          ul.classList.add('active')
          ul.children[(total - 1) - i].classList.add('active')
        }

      })

      this.setState({
        hidden: this.state.active,
        active: !this.state.active,
        running: false,
      })

    })
  }

  public render() {

    return (

      <div className='menu'>

        <div hidden={this.state.hidden} className='open'>
          <ul ref={ref => this.openUL = ref}>
            {TopicosStore.nomes.map((nome, i) =>
              (
                <li onClick={this._topicoClick(nome)} key={i}>{nome}</li>
              )
            )}
          </ul>
        </div>

        <div className="closed">
          <img className='icone' src={menu} />
        </div>

      </div>

    )
  }

  private _topicoClick = (nome: string) => () => {
    TopicosStore.skipToTopico(nome)
  }
}

export default Menu
