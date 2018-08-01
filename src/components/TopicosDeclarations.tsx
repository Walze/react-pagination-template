import * as React from 'react'

import Topico from "./slides/Categorias";
import Slide3 from './slides/Slide3';
import Slide2 from './slides/Slide2';
import Slide1 from './slides/Slide1';

const TOPICOS_INIT: any[] = [
  <Topico
    key='0'
    nome='CAT1'
    slides={[
      <Slide3 key={Slide3.name} />,
      <Slide2 key={Slide2.name} />,
    ]}
  />,
  <Topico
    key='1'
    nome='CAT2'
    slides={[
      <Slide2 key={Slide2.name} />,
      <Slide1 key={Slide1.name} />,
    ]}
  />,
  <Topico
    key='2'
    nome='CAT3'
    slides={[
      <Slide2 key={Slide2.name} />,
      <Slide3 key={Slide3.name} />,
    ]}
  />,
]

export const TopicosNomes = TOPICOS_INIT.map((topico: Topico) => topico.props.nome)

export default TOPICOS_INIT
