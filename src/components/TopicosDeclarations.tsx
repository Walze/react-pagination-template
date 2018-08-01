import * as React from 'react'

import Topico from "./slides/Categorias";
import Slide3 from './slides/Slide3';
import Slide2 from './slides/Slide2';
import Slide1 from './slides/Slide1';

const TOPICOS_INIT: any[] = [
  <Topico
    nome='CAT1'
    slides={[
      <Slide3 />,
      <Slide2 />,
    ]}
  />,
  <Topico
    nome='CAT2'
    slides={[
      <Slide2 />,
      <Slide1 />,
    ]}
  />,
  <Topico
    nome='CAT3'
    slides={[
      <Slide2 />,
      <Slide3 />,
    ]}
  />,
]

export const TopicosNomes = TOPICOS_INIT.map((topico: Topico) => topico.props.nome)

export default TOPICOS_INIT
