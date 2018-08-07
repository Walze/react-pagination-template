import * as React from 'react'
import Slide from "../topicos/Slide"

class Intro extends Slide {

  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <div>
        <p>
          O Ophertas traz descontos para o dia-a-dia dos usuários, como: chaveiro, mudanças, manutenção de ar-condicionado e outros serviços que acabam representando uma economia significativa para os gastos do cotidiano.
        </p>
        <p>
          As ofertas são divididas em 15 categorias, e os consumidores podem fazer sua busca através delas, de palavras-chave (nome da empresa, tipo de oferta, descrição) ou por mapa.
        </p>
        <p>
          A empresa que tem um oferta cadastrada, recebe um botão do Ophertas em seu anúncio no portal TeleListas.net, se destacando das demais no resultado de busca.
        </p>
        <p>
          Mas não basta estar presente com destaque e possuir visibilidade no resultado de busca, se o conteúdo da oferta não é relevante e atrativo ao consumidor.
        </p>
        <p>
          Por isso, vamos conhecer agora os aspectos que fazem parte da Composição da Oferta.
        </p>
      </div>
    )
  }
}

export default Intro