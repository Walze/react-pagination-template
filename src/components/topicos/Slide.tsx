import * as React from 'react'

// tslint:disable-next-line:no-any
abstract class Slide<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {

  public constructor(props: P) {
    super(props)
  }
}

export default Slide
