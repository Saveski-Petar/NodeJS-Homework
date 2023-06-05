import React, { useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const SuccessMsg = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2500)

    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  return (
    <ToastContainer position="top-center">
      <Toast show={true} onClose={onClose} delay={2500} autohide>
        <Toast.Body>
          <p>{message}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default SuccessMsg
