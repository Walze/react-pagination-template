import * as React from 'react'
import ReactDOM from 'react-dom'

type LeftOrRightStringType = 'left' | 'right'

interface IAlternativas {
  el: Element;
  opcoes: Array<{
    left: HTMLDivElement;
    right: HTMLDivElement;
  }>;
}

class Alternativas extends React.Component<{ certo: LeftOrRightStringType }> {

  public state = {
    alternativas: {}
  }

  public componentDidMount() {
    const div = ReactDOM.findDOMNode(this) as Element
    if (!div) throw new Error('div not found, children has to be one div')

    this.setState({
      alternativas: this._getObjState(div)
    })
  }

  private _getObjState(div: Element): IAlternativas[] {
    return Array.from(div.querySelectorAll('.alternativas'))
      .map(el => {
        const alt = el

        return {
          el: alt,
          opcoes: Array.from(el.querySelectorAll('.opcoes')).map(op => {
            const divs = op.querySelectorAll('div')

            if (divs.length !== 2)
              throw new Error(`esperava 2 divs, recebeu ${divs.length}`)

            const returnObj = {
              left: divs[0],
              right: divs[1],
            }

            returnObj.left.addEventListener('click', this._handleClick('left'))
            returnObj.right.addEventListener('click', this._handleClick('right'))

            return returnObj
          })
        }
      })
  }

  private _handleClick = (side: LeftOrRightStringType) => (e: MouseEvent) => {
    if (!e.target) return

    const el = e.target as Element

    if (side === this.props.certo)
      el.classList.add('bg-certo')
    else
      el.classList.add('bg-errado')
  }

  public render() {
    return this.props.children
  }
}

export default Alternativas