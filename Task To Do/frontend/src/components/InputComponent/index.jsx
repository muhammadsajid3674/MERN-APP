import { TextField } from '@mui/material';
import { memo } from 'react'
import { Controller } from 'react-hook-form';

const InputComponent = ({ label, type, name, control, color, style, variant, ...props }) => {
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
            )
            }
        />
    )
}

export default memo(InputComponent);