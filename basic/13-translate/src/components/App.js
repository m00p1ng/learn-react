import React from 'react';

import UserCreate from './UserCreate'
import LanguageSelector from './LanguageSelector'
import { LanguageStore } from '../contexts/LanguageContext'

import ColorContext from '../contexts/ColorContext'

function App() {
  return (
    <div className="ui container">
      <LanguageStore>
        <LanguageSelector />

        <ColorContext.Provider value="red">
          <UserCreate />
        </ColorContext.Provider>
      </LanguageStore>
    </div>
  );
}

export default App;
