import Container from "react-bootstrap/esm/Container";
import { Nav, Navbar } from "react-bootstrap";
import { Bootstrap } from "react-bootstrap-icons";

const Navigation = () => {
	return (
		<Navbar bg='dark' expand='sm' variant='dark'>
			<Container fluid>
				<Navbar.Brand href='/'>
					<Bootstrap width={30} height={30} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Nav.Link href='/'>Link1</Nav.Link>
						<Nav.Link href='/'>Link2</Nav.Link>
						<Nav.Link href='/'>Link3</Nav.Link>
						<Nav.Link href='/'>Link4</Nav.Link>
						<Nav.Link href='/'>Link5</Nav.Link>
						<Nav.Link href='/'>Link6</Nav.Link>
						<Nav.Link href='/'>Link7</Nav.Link>
					</Nav>
					<Nav className="ms-auto">
						<Nav.Link href='/'>Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;