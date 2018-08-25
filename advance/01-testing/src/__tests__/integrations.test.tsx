import { mount } from 'enzyme'
import * as moxios from 'moxios'
import * as React from 'react'

import App from '../components/App'
import Root from '../Root'

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
    status: 200,
  })
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch a list of comments and display them', (done) => {
  const wrapped = mount(
    <Root>
      <App />
    </Root>,
  )

  wrapped.find('.fetch-comments').simulate('click')

  moxios.wait(() => {
    wrapped.update()
    expect(wrapped.find('li').length).toEqual(2)
    done()

    wrapped.unmount()
  }, 100)

})