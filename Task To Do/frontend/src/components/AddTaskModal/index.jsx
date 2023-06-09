import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import TaskFields from '../../pages/Task/TaskFields';

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

const AddTaskModal = ({ isShowing, hide, userId, taskToEdit, isEdit }) => isShowing ? ReactDOM.createPortal(
    <Fragment>
        <Modal
            open={isShowing}
            onClose={hide}
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
            <Fade in={isShowing}>
                <Box sx={style}>
                    <TaskFields userId={userId} onClose={hide} taskToEdit={taskToEdit} isEdit={isEdit} />
                </Box>
            </Fade>
        </Modal>
    </Fragment>, document.body
) : null;

AddTaskModal.propTypes = {
    isShowing: PropTypes.bool,
    hide: PropTypes.any,
    userId: PropTypes.any,
    taskToEdit: PropTypes.object,
    isEdit: PropTypes.bool
}
AddTaskModal.defaultProps = {
    isEdit: false
}

export default AddTaskModal;