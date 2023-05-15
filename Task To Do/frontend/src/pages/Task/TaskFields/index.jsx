import { Box, Button, Typography } from "@mui/material"
import InputComponent from "../../../components/InputComponent"
import { Strings } from "../../../config/common/constants"
import { useForm } from "react-hook-form"
import { postTaskAciton, updateTaskAciton } from "../taskAction"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import PropTypes from 'prop-types';
import moment from "moment"

const TaskFields = ({ userId, taskToEdit, isEdit }) => {
    const dispatch = useDispatch();
    const { title, description, due_date } = taskToEdit || {};
    const formatedDueDate = moment(due_date).format("YYYY-MM-DD");
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: title || "",
            description: description || "",
            dueDate: formatedDueDate || ""
        }
    });
    const onSubmit = (objToSend) => {
        if (isEdit) {
            dispatch(updateTaskAciton(userId, toast, objToSend));
        } else {
            dispatch(postTaskAciton(objToSend, toast, userId));
        }
    };
    return (
        <>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Create Task
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ margin: '1rem 0' }}>
                    <InputComponent
                        label={Strings.dashboard.title}
                        control={control}
                        name="title"
                    />
                </Box>
                <Box sx={{ margin: '1rem 0' }}>
                    <InputComponent
                        label={Strings.dashboard.description}
                        control={control}
                        name="description"
                    />
                </Box>
                <Box sx={{ margin: '1rem 0' }}>
                    <InputComponent
                        label={Strings.dashboard.dueDate}
                        control={control}
                        name="dueDate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Button variant={"contained"} color='primary' type='submit'>{isEdit ? Strings.dashboard.editTask : Strings.dashboard.addTask}</Button>
            </Box>
        </>
    )
}

TaskFields.propTypes = {
    userId: PropTypes.string,
    taskToEdit: PropTypes.object,
    isEdit: PropTypes.bool
}

export default TaskFields;