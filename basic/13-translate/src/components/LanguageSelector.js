import React, { useContext } from 'react'
import LanguageContext from '../contexts/LanguageContext'

function LanguageSelector() {
  const context = useContext(LanguageContext)
  console.log(context)
  return (
    <div>
      Select a language:
      <i
        className="flag us"
        onClick={() => context.onLanguageChange('english')}
      />
      <i
        className="flag nl"
        onClick={() => context.onLanguageChange('dutch')}
      />
    </div>
  )
}

export default LanguageSelector