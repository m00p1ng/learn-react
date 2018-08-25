import { mount } from 'enzyme'
import * as React from 'react'

import Root from '../../Root'
import CommentList from '../CommentList'

let wrapped: ReturnType<typeof mount>

beforeEach(() => {
  const initialState = {
    comments: ['Comment 1', 'Comment 2'],
  }

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>,
  )
})

it('creates on LI per comment', () => {
  expect(wrapped.find('li').length).toEqual(2)
})

it('shows the text for each comment', () => {
  expect(wrapped.render().text()).toContain('Comment 1')
  expect(wrapped.render().text()).toContain('Comment 2')
})