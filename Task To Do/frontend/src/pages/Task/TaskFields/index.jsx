import { Box, Button, Typography } from "@mui/material"
import InputComponent from "../../../components/InputComponent"
import { Strings } from "../../../config/common/constants"
import { useForm } from "react-hook-form"
import { postTaskAciton, updateTaskAciton } from "../taskAction"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types';
import moment from "moment"
import { crud } from "../../../config/crud/actions"
import { selectCreatedItem } from "../../../config/crud/selectors"
import { useEffect } from "react"

const TaskFields = ({ userId, taskToEdit, isEdit, onSubmit }) => {
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
    // const onSubmit = (formData) => {
    //     if (isEdit) {
    //         dispatch(updateTaskAciton(userId, toast, formData));
    //     } else {
    //         const { dueDate, ...rest } = formData
    //         const datetypeChange = new Date(dueDate);
    //         const objToSend = { ...rest, dueDate: datetypeChange, user: currentUser?._id, completed: false };
    //         dispatch(crud.create({ endPoint: '/todo', jsonData: objToSend, service: 'task' }))
    //         dispatch(crud.resetAction({ actionType: 'create' }))
    //         dispatch(crud.list({ endPoint: '/todo', service: 'task' }))
    //         //     dispatch(postTaskAciton(objToSend, toast, userId));
    //     }
    // };
    // useEffect(() => {
    //     if (isSuccess) {
    //     }
    // }, [isSuccess])
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