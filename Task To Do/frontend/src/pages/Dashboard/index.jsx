import { Container } from "@mui/material";
import Navbar from "../../components/Navbar"
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../Auth/authAction";
import { toast } from "react-toastify";
import TaskCardParent from "../Task/TaskCardParent";
import { useEffect } from "react";
import { getTaskAciton } from "../Task/taskAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector(state => state.task)
    const loginToken = localStorage.getItem('token');
    const persistStore = JSON.parse(localStorage.getItem('persist:taskTodo'));
    const { user: { data: { _id } } } = JSON.parse(persistStore.auth);
    const logout = () => {
        dispatch(logoutAction(toast, navigate))
    };
    useEffect(() => {
        dispatch(getTaskAciton())
    }, [dispatch]);
    return (
        <div className={styles.dasboardWrapper}>
            <Navbar isAuth={Boolean(loginToken)} logout={logout} />
            <Container sx={{ padding: '20px' }}>
                <TaskCardParent tasks={data} currentUserId={_id} />
            </Container>
        </div>
    )
}

export default Dashboard