import React from 'react'

type Props = {
  success: boolean,
}

/**
 * Functional React component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` props)
 */

const Congrat = ({ success }: Props) => {
  if (success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    )
  } else {
    return (
      <div data-test="component-congrats"></div>
    )
  }
}

export default Congrat