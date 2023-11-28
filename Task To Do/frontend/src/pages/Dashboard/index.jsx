import { Container } from "@mui/material";
import Navbar from "../../components/Navbar"
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../Auth/authAction";
import { toast } from "react-toastify";
import TaskCardParent from "../Task/TaskCardParent";
import { useEffect, useState } from "react";
import { LoaderComponent } from "../../components";
import { crud } from "../../config/crud/actions";
import { selectListItems } from "../../config/crud/selectors";
import { isLoggedIn, selectCurrentAdmin } from "../../config/redux/auth/selectors";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector(state => state.auth)
    console.log('currentUser :>> ', currentUser);
    const tasks = useSelector(selectListItems('tasks'));
    console.log('tasks :>> ', tasks);
    const loginToken = localStorage.getItem('token');
    const logout = () => {
        dispatch(logoutAction(toast, navigate))
    };
    useEffect(() => {
        // dispatch(crud.resetState());
        dispatch(crud.list({ endPoint: '/todo', service: 'tasks' }));
        dispatch(crud.list({ endPoint: '/user', service: 'users' }));
    }, [dispatch]);
    
    if (tasks?.isLoading) return <LoaderComponent />
    return (
        <>
            <div className={styles.dasboardWrapper}>
                <Navbar isAuth={Boolean(loginToken)} logout={logout} />
                <Container sx={{ padding: '20px' }}>
                    <TaskCardParent currentUserId={currentUser?._id} tasks={tasks?.result || []} />
                </Container>
            </div>

        </>
    )
}

export default Dashboard