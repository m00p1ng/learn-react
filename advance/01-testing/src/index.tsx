import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Root from './Root'

import App from './components/App'

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root') as HTMLElement,
)
