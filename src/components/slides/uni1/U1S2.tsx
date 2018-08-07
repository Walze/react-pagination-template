import * as React from 'react'
import Slide from '../../topicos/Slide'
import { shuffleArray } from '../../../helpers/functions';

class U1S1 extends Slide {

  public table: Element | null

  public state = {
    perguntas: [] as Element[],
    respostas: [] as JSX.Element[],
    currentPergunta: 0
  }

  public async componentDidMount() {
    await this._setupPerguntas()

    // primeira resposta
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
    return new Promise(res => {
      if (!this.table) return

      const perguntas = Array.from(this.table.querySelectorAll('td[data-pergunta]'))

      const respostas = shuffleArray(
        perguntas.map((pergunta, i) => {
          const div = <div onClick={this._click(i, pergunta.innerHTML)} key={i} className='resposta'>{pergunta.innerHTML}</div>
          pergunta.innerHTML = ''

          return div
        })
      )

      this.setState({ perguntas, respostas }, res)
    })
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

      this.setState({
        respostas: filtered,
        currentPergunta: proxPergunta,
      })
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
    return (
      <div>

        <div className="respostas">
          {this.state.respostas}
        </div>

        <table className='perguntas centered' ref={ref => this.table = ref}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Segmento</th>
              <th>Cliente</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Bares e Restaurantes</td>
              <td>Alimentação</td>
              <td data-pergunta=''>Pizzaria Ciarelli</td>
            </tr>

            <tr>
              <td>Viagens e Turismo</td>
              <td>Aluguel de Vans</td>
              <td data-pergunta=''>TransTathica</td>
            </tr>

            <tr>
              <td>Saúde e Bem-estar</td>
              <td>Salão de beleza e tratamentos estéticos</td>
              <td data-pergunta=''>Blanche Coiffeur</td>
            </tr>

            <tr>
              <td>Cursos e Escolas</td>
              <td>Curso de idiomas</td>
              <td data-pergunta=''>True English</td>
            </tr>

            <tr>
              <td>Mercado e Varejo</td>
              <td>Livros</td>
              <td data-pergunta=''>Livraria Aurora</td>
            </tr>

            <tr>
              <td>Moda e Beleza</td>
              <td>Sapatos, bolsas e acessórios.</td>
              <td data-pergunta=''>Salto Agulha</td>
            </tr>


          </tbody>
        </table>
      </div>
    )
  }
}

export default U1S1