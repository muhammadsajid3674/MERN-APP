import { Box, Button, Typography } from '@mui/material'
import styles from './Login.module.css'
import Strings from '../../constants/Strings'
import { InputComponent } from '../../components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            emailAddress: '',
            password: ''
        }
    })
    return (
        <Box className={styles.loginPageWrapper}>
            <Box component={"form"} onSubmit={handleSubmit} className={styles.loginContainer} sx={{ width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" } }}>
                <Box sx={{ marginBottom: "50px" }}>
                    <Typography variant='h5'>{Strings.login.heading}</Typography>
                    <Typography>{Strings.login.subHeading}</Typography>
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
                <Button variant={"contained"} color='secondary' type='submit'>{Strings.login.text}</Button>
            </Box>
            <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                <Typography>
                    {Strings.login.notRegistered} &nbsp;
                    <Link to={"/signup"} style={{ textDecoration: "none" }}>
                        <Typography variant='span' color={"secondary"}>{Strings.login.createAnAccount}</Typography>
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Login;