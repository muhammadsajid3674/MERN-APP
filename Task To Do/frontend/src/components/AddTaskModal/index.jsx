import { memo } from 'react';
import PropTypes from 'prop-types'
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { Strings } from '../../config/common/constants';
import InputComponent from '../InputComponent';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postTaskAciton } from '../../pages/Task/taskAction';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddTaskModal = memo(
    function AddTaskModal({ open, setOpen, currentUserId }) {

        const dispatch = useDispatch();

        const { control, handleSubmit } = useForm({
            mode: 'onChange',
            defaultValues: {
                title: "",
                description: "",
                dueDate: ""
            }
        })

        const onSubmit = (objToSend) => {
            dispatch(postTaskAciton(objToSend, toast, currentUserId));
            setOpen(false);
        }

        const handleClose = () => setOpen(false);

        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Task Details
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
                    </Box>
                </Fade>
            </Modal>
        );
    }
)

AddTaskModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.any,
    currentUserId: PropTypes.string,
}

export default AddTaskModal;