import React from 'react'
import LivestreamReactPlayer from './LivestreamReactPlayer'

describe('<LivestreamReactPlayer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LivestreamReactPlayer />)
  })
})