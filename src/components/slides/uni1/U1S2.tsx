import * as React from 'react'
import Slide from '../../topicos/Slide'
import { shuffleArray } from '../../../helpers/functions';
import TableFill from '../../atividades/TableFill';

class U1S1 extends Slide {

  public state = {
    respostas: []
  }

  public setRespostas = (resp: JSX.Element[]) => {
    this.setState({ respostas: resp })
  }

  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div>
        <div className="respostas">
          {this.state.respostas}
        </div>

        <TableFill updateRespostas={this.setRespostas}>
          <table className='perguntas centered'>
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
        </TableFill>
      </div>
    )
  }
}

export default U1S1