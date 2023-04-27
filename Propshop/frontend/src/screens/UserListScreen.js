import React, { useEffect } from 'react'
import { Col, Stack, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import MessageAlert from '../components/MessageAlert';
import { deleteUser, getUsersList } from '../config/Redux/Action/userAction'
import { withRouterAndRedux } from '../config/util/withRouterAndRedux'

const UserListScreen = ({ dispatch, state }) => {
    const {
        usersList: { users, error, loading },
        userLogin: { userInfo },
        deleteUser: { success: successDelete },
        updateUser: { success: successUpdate }
    } = state;
    const navigate = useNavigate()
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUsersList())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete, successUpdate])

    return (
        <>
            {loading ? (
                <Col md={12}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
                        <Loader />
                    </div>
                </Col>
            ) : error ? (
                <Col md={12} className='text-center align-self-center'>
                    <MessageAlert variant='danger'>{error}</MessageAlert>
                </Col>
            ) : (
                <Col md={12}>
                    <h1>Users</h1>
                    {users && users.length > 0 ? (
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 && users.map(e =>
                                    <tr key={e._id}>
                                        <td>{e._id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.isAdmin ? <i className="fa fa-check text-success"></i> : <i className="fa fa-xmark text-danger"></i>}</td>
                                        <td>
                                            <Stack direction='horizontal' gap={3}>
                                                <button className='btn btn-success' onClick={() => { navigate(`/admin/user/${e._id}/edit`, { state: { data: e } }) }}><i className="fa fa-pen-to-square"></i></button>
                                                <button className='btn btn-danger' onClick={() => deleteUserHandler(e._id)}><i className="fa fa-trash"></i></button>
                                            </Stack>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <p className='text-center'>No Order Found</p>
                    )}
                </Col>
            )}
        </>
    )
}

export default withRouterAndRedux(UserListScreen);