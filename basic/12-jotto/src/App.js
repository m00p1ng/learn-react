import React from 'react';
import { connect } from 'react-redux'

import GuessedWords from './GuessWords'
import Congrats from './Congrats'

const App = () => {
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={false} />
      <GuessedWords guessedWords={[
        { guessedWord: 'train', letterMatchCount: 3 }
      ]} />
    </div>
  )
}

export default App;
