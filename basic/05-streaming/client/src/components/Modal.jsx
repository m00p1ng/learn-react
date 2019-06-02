import React from 'react'
import ReactDOM from 'react-dom'

function Modal({ title, content, actions, onDismiss }) {
  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={onDismiss}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {content}
        </section>
        <footer className="modal-card-foot">
          {actions}
        </footer>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal