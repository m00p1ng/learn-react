import React from 'react'
import LanguageContext from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext'

function Button() {
  const renderSubmit = ({ language }) => {
    return language === 'english' ? 'Submit' : 'Voorleggan'
  }

  const renderButton = (color) => {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {renderSubmit}
        </LanguageContext.Consumer>
      </button>
    )
  }

  return (
    <ColorContext.Consumer>
      {renderButton}
    </ColorContext.Consumer>
  )
}

export default Button