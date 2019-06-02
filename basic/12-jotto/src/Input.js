import React from 'react'
import { connect } from 'react-redux'


const Input = ({ success }) => {
  const contents = success
    ? null
    : (
      <form className="form-inline">
        <input
          type="text"
          data-test="input-box"
          className="mb-2 mx-sm-3"
          id="word-guess"
          placeholder="enter guess"
        />
        <button
          type="submit"
          data-test="submit-button"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    )
  return (
    <div data-test="component-input">
      {contents}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Input)