import * as React from 'react'
import Slide from '../../topicos/Slide';

class U2S2 extends Slide {

  public ref = React.createRef<HTMLDivElement>()

  public componentDidMount() {
    const div = this.ref.current
    if (!div) return

    const obj = Array.from(div.querySelectorAll('.alternativas'))
      .map(el => {
        const alt = el

        return {
          el: alt,
          opcoes: Array.from(el.querySelectorAll('.opcoes')).map(op => {
            const divs = op.querySelectorAll('div')

            return {
              left: divs[0],
              right: divs[1]
            }
          })
        }
      })


    console.log(obj)
  }

  public render() {
    return (
      <div className='alternativas-atividade' ref={this.ref}>

        <div className="wrapper">
          <p>
            1. Deve ser chamativo e informar qual será o benefício que o consumidor obterá com a oferta. Exemplos:
          </p>

          <div className='alternativas'>
            <div className='opcoes'>
              <div>
                15% OFF Espumante Norton Cosecha Brut Rose.
              </div>

              <div>
                15% Bebida
              </div>
            </div>

            <div className='opcoes'>
              <div>
                20% OFF no jantar + 2 taças de vinho para casal.
              </div>

              <div>
                20% Jantar + Brinde
              </div>
            </div>
          </div>
        </div>



        <div className="wrapper">
          <p>
            2. O título pode ser lido independente da descrição, por isso, sugerimos que o tipo de produto ou serviço oferecido seja informado. Exemplo:
          </p>

          <div className='alternativas'>
            <div className='opcoes'>
              <div>
                Dedetização de 150 por 120 reais.
              </div>

              <div>
                Serviço de 150 por 120
              </div>
            </div>

            <div className='opcoes'>
              <div>
                100 reais de desconto em berço.
              </div>

              <div>
                100 reais de desconto
              </div>
            </div>
          </div>
        </div>



        <div className="wrapper">
          <p>
            3. Seguindo essas dicas, busque utilizar textos eficientes. Exemplos:
          </p>

          <div className='alternativas'>
            <div className='opcoes'>
              <div>
                Ganhe um brinde nas compras acima de 30 reais.
              </div>

              <div>
                Granhe um Brinde
              </div>
            </div>

            <div className='opcoes'>
              <div>
                50% OFF em todos os medicamentos genéricos.
              </div>

              <div>
                50% Meedicamentos
              </div>
            </div>

            <div className='opcoes'>
              <div>
                Ganhe 2 chopps Brahma.
              </div>

              <div>
                Ganhe Chopps
              </div>
            </div>
          </div>
        </div>



      </div>
    )
  }
}

export default U2S2