import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './Login.module.css'
import Strings from '../../constants/Strings'
import { InputComponent } from '../../components'
import loginAction from './Actions'

const Login = () => {
    const navigate = useNavigate();
    const disaptch = useDispatch();
    const state = useSelector(state => state)
    console.log(state);
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            emailAddress: '',
            password: ''
        }
    })
    const onSubmit = (obj) => {
        disaptch(loginAction(obj, toast, navigate))
    }
    return (
        <Box className={styles.loginPageWrapper}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} className={styles.loginContainer} sx={{ width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" } }}>
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