import * as React from 'react'
import { connect } from 'react-redux'

export interface Props {
  comments: string[]
}

class CommentList extends React.Component<Props> {
  public renderComments() {
    return this.props.comments.map((comment) => {
      return <li key={comment}>{comment}</li>
    })
  }

  public render() {
    return (
      <div>
        <ul>
          {this.renderComments()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return { comments: state.comments }
}

export default connect(mapStateToProps)(CommentList)