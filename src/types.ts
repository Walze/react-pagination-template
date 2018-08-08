
export type ReactJSXElement<T> = JSX.Element | T

export interface IndexSignature {
  // tslint:disable-next-line:no-any
  [key: string]: any
}

export interface IAsyncSetState {
  waitSetState(state: {}): Promise<{}>
}