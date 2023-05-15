import { Container } from "@mui/material";
import Navbar from "../../components/Navbar"
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../Auth/authAction";
import { toast } from "react-toastify";
import TaskCardParent from "../Task/TaskCardParent";
import { useEffect, useState } from "react";
import { getTaskAciton } from "../Task/taskAction";
import { LoaderComponent } from "../../components";

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { task: { data }, auth: { user: { data: { _id } } } } = useSelector(state => state)
    const loginToken = localStorage.getItem('token');
    const logout = () => {
        dispatch(logoutAction(toast, navigate))
    };
    useEffect(() => {
        dispatch(getTaskAciton());
        setLoading(false);
    }, [dispatch]);
    if (isLoading) return <LoaderComponent />
    return (
        <>
            <div className={styles.dasboardWrapper}>
                <Navbar isAuth={Boolean(loginToken)} logout={logout} />
                <Container sx={{ padding: '20px' }}>
                    <TaskCardParent currentUserId={_id} tasks={data} />
                </Container>
            </div>

        </>
    )
}

export default Dashboard