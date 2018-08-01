
export type TCategorias =
  'Categoria1' |
  'Categoria2' |
  'Categoria3' |
  'Categoria4' |
  'Categoria5'

const categorias: TCategorias[] = [
  'Categoria1',
  'Categoria2',
  'Categoria3',
  'Categoria4',
  'Categoria5',
]

export const Categorias: Set<TCategorias> = new Set(categorias)
