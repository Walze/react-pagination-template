import * as React from 'react'
import './menu.scss'
import { loopDelay, getTransitionDelay } from '../../../helpers/animation';

import menu from '../../../img/menu.svg'
import { Categorias, TCategorias } from '../../slides/ICategorias';

class Menu extends React.Component {
  private _active: boolean = false
  private _running: boolean = false
  private _hidden: boolean = true

  public async menuClick() {
    if (this._running) return
    this._running = true

    this.handleHidden()

    const ul = this.refs.ul as HTMLElement

    const li = ul.children[0];
    const duration = getTransitionDelay(li)

    await loopDelay(ul.childElementCount, duration, (i, total) => {

      if (this._active) {
        ul.classList.remove('active')
        ul.children[i].classList.remove('active')
      } else {
        ul.classList.add('active')
        ul.children[(total - 1) - i].classList.add('active')
      }

    })

    this._active = !this._active
    this._running = false

    this.forceUpdate()
  }

  public render() {
    const categorias: JSX.Element[] = []
    Categorias.forEach(cat => categorias.push(<li key={cat}>{cat}</li>))

    return (

      <div className='menu'>

        <div hidden={this._hidden} className='open'>
          <ul ref='ul'>
            {categorias}
          </ul>
        </div>

        <div className="closed">
          <img className='icone' src={menu} />
        </div>

      </div>

    )
  }

  private handleHidden() {
    if (this._hidden) {
      this._hidden = !this._hidden;
      this.forceUpdate();
    } else
      this._hidden = !this._hidden;
  }

}

export default Menu
