import React from 'react';
import StackList from './StackList'
import { Link } from '@reach/router'

const App = () => (
  <>
    <h2 className="title">Flashcard Pro</h2>
    <hr />
    <StackList />
    <hr />
    <h4 className="title is-4">
      <Link to="/stack_form">
        Create a New Stack
          </Link>
    </h4>
  </>
)

export default App
