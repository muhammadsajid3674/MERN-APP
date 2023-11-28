import { Box, Button } from "@mui/material"
import Strings from "../../../config/common/constants/Strings"
import PropTypes from 'prop-types'
import TaskCard from "../../../components/TaskCard"
import { useDispatch, useSelector } from "react-redux"
import { deleteTaskAciton } from "../taskAction"
import { toast } from "react-toastify"
import useModal from "../../../config/Hooks/useModal"
import AddTaskModal from "../../../components/AddTaskModal"
import { selectCreatedItem, selectItemById } from "../../../config/crud/selectors"
import { crud } from "../../../config/crud/actions"
import { useEffect } from "react"

const TaskCardParent = ({ currentUserId }) => {
    console.log('list :>> ', currentUserId);
    const { isShowing, toggle } = useModal();
    const dispatch = useDispatch();
    const item = useSelector(selectItemById('tasks', currentUserId));
    console.log('item :>> ', item);
    const taskDelete = (taskId) => {
        dispatch(deleteTaskAciton(taskId, toast))
    }

    const createdItem = useSelector(selectCreatedItem('task'));
    const { user: currentUser } = useSelector(state => state.auth)
    const onSubmit = (formData) => {
        const { dueDate, ...rest } = formData
        const datetypeChange = new Date(dueDate);
        const objToSend = { ...rest, dueDate: datetypeChange, user: currentUser?._id, completed: false };
        dispatch(crud.create({ endPoint: '/todo', jsonData: objToSend, service: 'task' }))
        //     dispatch(postTaskAciton(objToSend, toast, userId));
    }
    console.log('isSuccess :out>> ', createdItem);
    useEffect(() => {
        console.log('isSuccess :>> ', createdItem);
        if (createdItem?.isSuccess) {
            console.log('hello :>> ');
            dispatch(crud.list({ endPoint: '/todo', service: 'task' }))
            dispatch(crud.resetAction({ actionType: 'create', service: 'task' }))
        }
    }, [createdItem, dispatch])

    return (
        <>
            <Box sx={{ marginLeft: 'auto', width: 'max-content' }}>
                <Button variant="contained" onClick={toggle}>{Strings.dashboard.addTask}</Button>
            </Box >
            {item && item.length > 0 ? item.map(e => <TaskCard taskDelete={taskDelete} key={e._id} task={e} />) : <h1>No Data found</h1>}
            <AddTaskModal isShowing={isShowing} hide={toggle} userId={currentUserId} onSubmit={onSubmit} />
        </>
    )
}

TaskCardParent.propTypes = {
    tasks: PropTypes.array,
    currentUserId: PropTypes.string
}

export default TaskCardParent;