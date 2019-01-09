import React from 'react'
import { shallow } from 'enzyme'
import { StackForm } from './StackForm'

const changeTitle = 'change title'
const changePrompt = 'change prompt'
const changeAnswer = 'change Answer'

describe('StackForm', () => {
  const stackForm = shallow(<StackForm />)

  it('renders the form title', () => {
    expect(stackForm.find('h4').text())
      .toEqual('Create a New Stack')
  })

  it('renders a link home', () => {
    expect(stackForm.find('ForwardRef').text())
      .toEqual('Home')
  })

  it('renders a Form component', () => {
    expect(stackForm.find('form').exists())
      .toBe(true)
  })

  it('renders a button to add a new card', () => {
    expect(stackForm.find('button').at(0).props().children)
      .toEqual('Add Card')
  })

  it('renders a button to submit the form', () => {
    expect(stackForm.find('button').at(1).props().children)
      .toEqual('Save and Add the Stack')
  })

  describe('and updating the title', () => {
    beforeEach(() => {
      stackForm
        .find('input')
        .simulate('change', { target: { value: changeTitle } })
    })

    it('update the title in state', () => {
      expect(stackForm.state().title)
        .toBe(changeTitle)
    })
  })

  describe('when adding a new card', () => {
    beforeEach(() => {
      stackForm
        .find('button')
        .at(0)
        .simulate('click')
    })

    afterEach(() => {
      stackForm.setState({
        cards: [],
      })
    })

    it('adds a new card to the state', () => {
      expect(stackForm.state().cards.length)
        .toEqual(1)
    })

    it('renders the prompt section', () => {
      expect(stackForm.find('label').at(1).props().children)
        .toEqual('Prompt:')
    })

    it('renders the answer section', () => {
      expect(stackForm.find('label').at(2).props().children)
        .toEqual('Answer:')
    })

    describe('and updating the card prompt', () => {
      beforeEach(() => {
        stackForm
          .find('input')
          .at(1)
          .simulate('change', { target: { value: changePrompt } })
      })

      it('update the prompt in the state', () => {
        expect(stackForm.state().cards[0].prompt)
          .toEqual(changePrompt)
      })
    })

    describe('and updating the card answer', () => {
      beforeEach(() => {
        stackForm
          .find('input')
          .at(2)
          .simulate('change', { target: { value: changeAnswer } })
      })

      it('updates the answer in the state', () => {
        expect(stackForm.state().cards[0].answer)
          .toEqual(changeAnswer)
      })
    })
  })
})