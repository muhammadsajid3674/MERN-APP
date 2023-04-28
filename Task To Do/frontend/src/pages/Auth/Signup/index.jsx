import { Box, Button, Typography } from '@mui/material'
import styles from './Signup.module.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Strings from '../../../constants/Strings'
import InputComponent from '../../../components/InputComponent'
import { signupAction } from '../authAction'

const Login = () => {
    const navigate = useNavigate();
    const disaptch = useDispatch();
    const state = useSelector(state => state)
    console.log(state);
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            userName: '',
            emailAddress: '',
            password: ''
        }
    })
    const onSubmit = (obj) => {
        disaptch(signupAction(obj, toast, navigate))
    }
    return (
        <Box className={styles.signupPageWrapper}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} className={styles.signupContainer} sx={{ width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" } }}>
                <Box sx={{ marginBottom: "50px" }}>
                    <Typography variant='h5'>{Strings.signup.heading}</Typography>
                    <Typography>{Strings.signup.subHeading}</Typography>
                </Box>
                <Box sx={{ margin: '20px 0' }}>
                    <InputComponent
                        label={Strings.userName}
                        control={control}
                        name="userName"
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