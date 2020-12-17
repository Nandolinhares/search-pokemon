import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('Should start with initial state', () => {
    const sut = render(<App />)
    const element = sut.getByTestId('main-section')
    expect(element.childElementCount).toBe(2)
  })
})
