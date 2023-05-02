import { Box, Button } from "@mui/material"
import Strings from "../../../config/common/constants/Strings"
import PropTypes from 'prop-types'
import TaskCard from "../../../components/TaskCard"

const TaskCardParent = ({ tasks, currentUserId }) => {
    let filterTask = tasks && tasks.filter(e => e.user === currentUserId) || []
    return (
        <>
            <Box sx={{ marginLeft: 'auto', width: 'max-content' }}>
                <Button variant="contained" >{Strings.dashboard.addTask}</Button>
            </Box>
            {filterTask && filterTask.length > 0 ? filterTask.map(e => <TaskCard key={e._id} task={e} />) : <h1>No Data found</h1>}
        </>
    )
}

TaskCardParent.propTypes = {
    tasks: PropTypes.array,
    currentUserId: PropTypes.string
}

export default TaskCardParent;