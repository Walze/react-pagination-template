import * as React from 'react'
import { shuffleArray } from '../../helpers/functions';
import ReactDOM from 'react-dom';
import { IAsyncSetState } from '../../types';

interface ITableFillProps {
  updateRespostas(respostas: JSX.Element[]): void
  children: JSX.Element
}

interface ITableFillState {
  table: Element | undefined,
  perguntas: Element[],
  respostas: JSX.Element[],
  currentPergunta: number
}


class TableFill
  extends React.Component<ITableFillProps, ITableFillState>
  implements IAsyncSetState {

  public waitSetState = (state: {}) =>
    new Promise(res => this.setState(state, res))


  public state = {
    table: undefined as Element | undefined,
    perguntas: [] as Element[],
    respostas: [] as JSX.Element[],
    currentPergunta: 0
  }

  public async componentDidMount() {
    await this.waitSetState({ table: ReactDOM.findDOMNode(this) })

    await this.waitSetState({ ...this._setupPerguntas() })


    // primeira resposta
    this.props.updateRespostas(this.state.respostas)
    this._waitResposta(this.state.currentPergunta)
  }

  private _waitResposta(index: number) {
    const waitingString = 'Clique numa <br> opção acima'

    const pergunta = this.state.perguntas[index]
    pergunta.innerHTML = waitingString
    pergunta.classList.add('active')
  }

  private _removeActive(index: number) {
    if (index < 1) return

    // remove .active do anterior
    const perguntaAnterior = this.state.perguntas[index - 1]
    perguntaAnterior.classList.remove('active')
    perguntaAnterior.classList.remove('errado')
  }

  private _setupPerguntas() {
    if (!this.state.table) throw new Error('table not found')

    const perguntas = Array.from(this.state.table.querySelectorAll('td[data-pergunta]'))

    const respostas = shuffleArray(
      perguntas.map((pergunta, i) => {
        const div = <div onClick={this._click(i, pergunta.innerHTML)} key={i} className='resposta'>{pergunta.innerHTML}</div>
        pergunta.innerHTML = ''

        return div
      })
    )

    return { perguntas, respostas }
  }

  private _click = (clickedI: number, resposta: string) => () => {
    const acertou = this._checkResposta(clickedI)

    if (acertou) {
      this.state.perguntas[this.state.currentPergunta].innerHTML = resposta

      const proxPergunta = this.state.currentPergunta + 1

      if (proxPergunta < this.state.perguntas.length)
        this._waitResposta(proxPergunta)

      this._removeActive(proxPergunta)

      const filtered = this.state.respostas.filter(el =>
        Number(el.key) !== clickedI
      )

      this.setState(
        {
          respostas: filtered,
          currentPergunta: proxPergunta,
        },
        () => this.props.updateRespostas(this.state.respostas)
      )

    } else {
      const pergunta = this.state.perguntas[this.state.currentPergunta]
      pergunta.innerHTML = 'Tente Novamente'
      pergunta.classList.add('errado')
    }
  }

  private _checkResposta(clickedI: number) {
    return clickedI === this.state.currentPergunta
  }

  public render() {
    return this.props.children
  }
}

export default TableFill