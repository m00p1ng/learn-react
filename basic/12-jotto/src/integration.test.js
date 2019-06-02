import { storeFactory } from '../test/testUtils'
import { guessWord } from './actions'

describe('guessWord action dispatcher', () => {
  const secretWord = 'party'
  const unsuccessfulGuess = 'train'
  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord }
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess))
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          getLetterMatchCount: 3,
        }]
      }
      const newState = store.getState()
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successful guess', () => {

    })
  })
  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 3 }]
    const initialState = { guessedWords, secretWord }
    let store;
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess))
      const newState = store.getState()
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [...guessedWords, { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }]
      }
    })
    test('updates state correctly for successful guess', () => {

    })
  })
})