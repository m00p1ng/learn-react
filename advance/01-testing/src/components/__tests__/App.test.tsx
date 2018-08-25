import { shallow } from 'enzyme'
import * as React from 'react'

import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

let wrapped: ReturnType<typeof shallow>

beforeEach(() => {
  wrapped = shallow(<App />)
})

it('shows a coment box', () => {
  expect(wrapped.find(CommentBox).length).toEqual(1)
})

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1)
})
