import { Box, Button, Typography } from "@mui/material"
import InputComponent from "../../../components/InputComponent"
import { Strings } from "../../../config/common/constants"
import { useForm } from "react-hook-form"
import { postTaskAciton } from "../taskAction"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import PropTypes from 'prop-types';

const AddTask = ({ userId }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: "",
            description: "",
            dueDate: ""
        }
    });
    const onSubmit = (objToSend) => {
        dispatch(postTaskAciton(objToSend, toast, userId));
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
                <Button variant={"contained"} color='primary' type='submit'>{Strings.dashboard.addTask}</Button>
            </Box>
        </>
    )
}

AddTask.propTypes = {
    userId: PropTypes.string
}

export default AddTask;