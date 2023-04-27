import { Box, Button, Typography } from '@mui/material'
import styles from './Signup.module.css'
import Strings from '../../constants/Strings'
import { InputComponent } from '../../components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: ''
        }
    })
    return (
        <Box className={styles.signupPageWrapper}>
            <Box component={"form"} onSubmit={handleSubmit} className={styles.signupContainer} sx={{ width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" } }}>
                <Box sx={{ marginBottom: "50px" }}>
                    <Typography variant='h5'>{Strings.signup.heading}</Typography>
                    <Typography>{Strings.signup.subHeading}</Typography>
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <InputComponent
                        label={Strings.firstName}
                        control={control}
                        name="emailAddress"
                    />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <InputComponent
                        label={Strings.lastName}
                        control={control}
                        name="emailAddress"
                    />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <InputComponent
                        label={Strings.emailAddress}
                        control={control}
                        name="emailAddress"
                    />
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <InputComponent
                        label={Strings.password}
                        control={control}
                        type={"password"}
                        name="password"
                    />
                </Box>
                <Button variant={"contained"} color='secondary' type='submit'>{Strings.signup.text}</Button>
            </Box>
            <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                <Typography>
                    {Strings.signup.alreadyAccount} &nbsp;
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        <Typography variant='span' color={"secondary"}>{Strings.signup.loginHere}</Typography>
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Login;