import { Box, Button, Container } from "@mui/material";
import Navbar from "../../components/Navbar"
import styles from "./Dashboard.module.css";
import { Strings } from "../../config/common/constants";
import { TaskCard } from "../../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../Auth/authAction";
import { toast } from "react-toastify";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginToken = localStorage.getItem('token')
    const logout = () => {
        dispatch(logoutAction(toast, navigate))
    }
    return (
        <div className={styles.dasboardWrapper}>
            <Navbar isAuth={Boolean(loginToken)} logout={logout} />
            <Container sx={{ padding: '20px' }}>
                <Box sx={{ marginLeft: 'auto', width: 'max-content' }}>
                    <Button variant="contained" >{Strings.dashboard.addTask}</Button>
                </Box>
                <TaskCard />
            </Container>
        </div>
    )
}

export default Dashboard