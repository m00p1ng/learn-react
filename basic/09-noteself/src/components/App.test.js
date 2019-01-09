import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe('App', () => {
  let app = mount(<App />)

  it('renders the App title', () => {
    expect(app.find('h2').text()).toEqual('Note to Self')
  })

  it('renders the clear button', () => {
    expect(app.find('.button').at(1).text())
      .toEqual('Clear Notes')
  })

  describe('when rendering the form', () => {
    it('creates a Form component', () => {
      expect(app.find('form').exists())
        .toBe(true)
    })

    it('renders a input component', () => {
      expect(app.find('input'))
    })

    it('renders a submit button', () => {
      expect(app.find('.button').at(0).text())
        .toEqual('Submit')
    })
  })

  describe('when creating a note', () => {
    let testNote = 'test note'

    beforeEach(() => {
      app.find('input').simulate('change', {
        target: { value: testNote }
      })
    })

    it('updateds the text in state', () => {
      expect(app.state().text).toEqual(testNote)
    })

    describe('and submitting the new note', () => {
      beforeEach(() => {
        app.find('form').simulate('submit')
      })

      afterEach(() => {
        app.find('.button').at(1).simulate('click')
      })

      it('adds the new note to the state', () => {
        expect(app.state().notes[0].text)
          .toEqual(testNote)
      })

      describe('and remounting the component', () => {
        let app2

        beforeEach(() => {
          app2 = mount(<App />)
        })

        it('reads the stored note cookies', () => {
          expect(app2.state().notes)
            .toEqual([{ text: testNote }])
        })
      })

      it('adds the new to state', () => {
        expect(app.state().notes[0].text)
          .toEqual(testNote)
      })

      describe('and clicking the clear button', () => {
        beforeEach(() => {
          app.find('.button').at(1).simulate('click')
        })

        it('clear the notes in state', () => {
          expect(app.state().notes).toEqual([])
        })
      })
    })
  })
})