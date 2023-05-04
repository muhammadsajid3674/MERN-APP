import { Box, Button } from "@mui/material"
import Strings from "../../../config/common/constants/Strings"
import PropTypes from 'prop-types'
import TaskCard from "../../../components/TaskCard"
import { AddTaskModal } from "../../../components"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTaskAciton } from "../taskAction"
import { toast } from "react-toastify"

const TaskCardParent = ({ tasks, currentUserId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    let filterTask = tasks && tasks.filter(e => e.user === currentUserId) || []
    const taskDelete = (taskId) => {
        dispatch(deleteTaskAciton(taskId, toast))
    }
    return (
        <>
            <Box sx={{ marginLeft: 'auto', width: 'max-content' }}>
                <Button variant="contained" onClick={() => setOpen(!open)}>{Strings.dashboard.addTask}</Button>
            </Box>
            {filterTask && filterTask.length > 0 ? filterTask.map(e => <TaskCard taskDelete={taskDelete} key={e._id} task={e} />) : <h1>No Data found</h1>}
            <AddTaskModal open={open} setOpen={setOpen} currentUserId={currentUserId} />
        </>
    )
}

TaskCardParent.propTypes = {
    tasks: PropTypes.array,
    currentUserId: PropTypes.string
}

export default TaskCardParent;