import { memo } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Strings } from "../../config/common/constants";
import styles from './TaskCard.module.css'
import PropTypes from 'prop-types'

const TaskCard = memo(
    function TaskCard({ task }) {
        const { title, description, due_date, completed } = task || {};
        return (
            <Box className={styles.taskCardWrapper}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">{title || "Hello"}</Typography>
                    <Box>
                        <Tooltip title="Edit" placeholder="top">
                            <IconButton>
                                <EditIcon color="secondary" sx={{ cursor: 'pointer' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton>
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
                        <Typography>{due_date || "Task Due Date"}</Typography>
                    </Box>
                </Box>
                {completed ? (
                    <Box sx={{ width: "max-content", ml: "auto" }}>
                        <Button variant="contained" color="success">Completed</Button>
                    </Box>
                ) : (
                    <Box sx={{ width: "max-content", ml: "auto" }}>
                        <Button variant="contained" color="error">Not Completed</Button>
                    </Box>
                )}
            </Box>
        )
    }
)

TaskCard.propTypes = {
    task: PropTypes.object
}

export default TaskCard