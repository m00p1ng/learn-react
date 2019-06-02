import React, { useState } from 'react'

const Context = React.createContext('english')

export function LanguageStore({ children }) {
  const [language, setLanguage] = useState('english')

  const onLanguageChange = (language) => {
    setLanguage(language)
  }

  return (
    <Context.Provider value={{ language, onLanguageChange }}>
      {children}
    </Context.Provider>
  )
}

export default Context