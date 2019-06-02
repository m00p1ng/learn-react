import React, { useContext } from 'react'
import LanguageContext from '../contexts/LanguageContext'

function Field() {
  const context = useContext(LanguageContext)
  const text = context.language === 'english'
    ? 'Name'
    : 'Naam'

  return (
    <div className="ui field">
      <label>{text}</label>
      <input type="text" />
    </div>
  )
}

export default Field