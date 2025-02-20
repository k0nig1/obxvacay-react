import React from 'react'
import LivestreamReactPlayer from './LivestreamReactPlayer'
import {mount} from '@cypress/react'

describe('<LivestreamReactPlayer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<LivestreamReactPlayer />)
  })
})