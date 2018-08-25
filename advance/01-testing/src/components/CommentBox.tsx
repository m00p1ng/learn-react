import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import requireAuth from './requireAuth'

interface Props {
  saveComment(comment: string): void
  fetchComments(): void
}

interface State {
  comment: string
}

class CommentBox extends React.Component<Props, State> {
  public state = {
    comment: '',
  }

  public handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement

    this.setState({ comment: target.value })
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.saveComment(this.state.comment)

    this.setState({ comment: '' })
  }

  public render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a Commment</h4>
          <textarea onChange={this.handleChange} value={this.state.comment} />
          <div>
            <button>Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>Fetch Comment</button>
      </>
    )
  }
}

export default connect(null, actions)(requireAuth(CommentBox))