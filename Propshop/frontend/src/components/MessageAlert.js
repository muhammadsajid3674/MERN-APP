import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageAlert = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>
}

MessageAlert.defaultProps = {
    variant: 'info'
}

export default MessageAlert;