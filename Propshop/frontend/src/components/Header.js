import { Container, Form, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../config/Redux/Action/auth';
import { SearchIcon } from '../core/Icon';
import { useEffect, useState } from 'react';
import { searchProduct } from '../config/Redux/Action/product';


function Header() {
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated, currentUser } = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(logout())
    }
    useEffect(() => {
        const delay = 500;
        const debounceTimer = setTimeout(async () => {
            dispatch(searchProduct(searchTerm))
        }, delay);
        return () => clearTimeout(debounceTimer);
    }, [dispatch, searchTerm]);
    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand >
                    <Nav.Link onClick={() => { navigate('/') }}>ProShop</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0 align-items-center"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1" >
                                    <SearchIcon />
                                </InputGroup.Text>
                                <Form.Control
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search Here..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Nav.Link>
                        <Nav.Link onClick={() => { navigate('/cart') }}><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                        {authenticated ? (
                            <NavDropdown title={currentUser.name}>
                                <NavDropdown.Item onClick={() => { navigate('/profile') }}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link onClick={() => { navigate('/login') }}><i className="fa-solid fa-user"></i> Signin</Nav.Link>
                        )}
                        {authenticated && currentUser.isAdmin && (
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