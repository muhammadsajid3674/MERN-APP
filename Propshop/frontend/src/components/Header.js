import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../config/Redux/Action/userAction';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin)
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand >
                    <Nav.Link onClick={() => { navigate('/') }}>ProShop</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name}>
                                <NavDropdown.Item onClick={() => { navigate('/profile') }}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link onClick={() => { navigate('/login') }}><i className="fa-solid fa-user"></i> Signin</Nav.Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='admin'>
                                <NavDropdown.Item onClick={() => { navigate('/admin/usersList') }}>Users</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { navigate('/admin/productList') }}>Products</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { }}>Other</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;