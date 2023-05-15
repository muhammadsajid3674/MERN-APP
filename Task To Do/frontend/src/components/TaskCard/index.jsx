import { memo } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Strings } from "../../config/common/constants";
import styles from './TaskCard.module.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import AddTaskModal from "../AddTaskModal";
import useModal from "../../config/Hooks/useModal";

const TaskCard = memo(
    function TaskCard({ task, taskDelete }) {
        const { isShowing, toggle } = useModal();
        const { title, description, due_date, completed, _id } = task || {};
        return (
            <>
                <Box className={styles.taskCardWrapper}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5">{title || "Hello"}</Typography>
                        <Box>
                            <Tooltip title="Edit" placeholder="top">
                                <IconButton onClick={toggle}>
                                    <EditIcon color="secondary" sx={{ cursor: 'pointer' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => taskDelete(_id)}>
                                    <DeleteIcon color="secondary" sx={{ cursor: 'pointer' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '20px 0' }}>
                        <Box>
                            <Typography variant="h6">{Strings.dashboard.description}</Typography>
                            <Typography>{description || "Task Description"}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="span" sx={{ fontWeight: 'bold' }}>{Strings.dashboard.dueDate}</Typography>
                            <Typography>{moment(due_date).format("DD-MM-YYYY") || "Task Due Date"}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "max-content", ml: "auto" }}>
                        <Button variant="contained" color={completed ? "succes" : "error"}>{completed ? "Completed" : "Not Completed"}</Button>
                    </Box>
                </Box>
                <AddTaskModal isShowing={isShowing} hide={toggle} taskToEdit={task} isEdit={true} userId={_id} />
            </>
        )
    }
)

TaskCard.propTypes = {
    task: PropTypes.object,
    taskDelete: PropTypes.any
}

export default TaskCard