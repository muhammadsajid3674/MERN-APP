import { TextField } from '@mui/material';
import { memo } from 'react'
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types'

const InputComponent = memo(
    function InputComponent({ label, type, name, control, color, style, variant, ...props }) {
        return (
            <Controller
                name={name || "testing"}
                control={control || "test"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    < TextField
                        label={label ?? "Outlined"}
                        variant={variant ?? "outlined"}
                        color={color ?? "secondary"}
                        onChange={onChange}
                        sx={{ width: "100%", ...style }}
                        type={type ? type : "text"}
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        {...props}
                    />
                )}
            />
        );
    }
)

InputComponent.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.any,
    style: PropTypes.object,
    color: PropTypes.string,
    variant: PropTypes.string
}

export default InputComponent;