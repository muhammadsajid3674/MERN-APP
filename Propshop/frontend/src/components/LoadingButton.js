import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const LoadingButton = ({ isLoading, label, variant, type, onClick, className, disabled }) => {
    return (
        <Button variant={variant} type={type} onClick={onClick} className={className} disabled={disabled} >{isLoading ? <Spinner animation="border" /> : label}</Button>
    )
}

export default LoadingButton