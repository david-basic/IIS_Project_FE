import Container from "react-bootstrap/esm/Container";
import { Nav, Navbar } from "react-bootstrap";
import { House } from "react-bootstrap-icons";

const Navigation = () => {
	return (
		<Navbar bg='dark' expand='sm' variant='dark'>
			<Container fluid>
				<Navbar.Brand href='/'>
					<House width={30} height={30} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Nav.Link href="/xsd">XSD</Nav.Link>
						<Nav.Link href='/rng'>RNG</Nav.Link>
						<Nav.Link href='/jaxb'>JAXB</Nav.Link>
						<Nav.Link href='/dhmz'>DHMZ</Nav.Link>
						<Nav.Link href='/memes'>MEMES</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
