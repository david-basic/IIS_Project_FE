import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./config/routes";
import Homepage from "./pages/Homepage";
import MainLayout from "./components/layout/MainLayout";
import XsdValidPage from "./pages/XsdValidPage";
import RngValidPage from "./pages/RngValidPage";
import DhmzPage from "./pages/DhmzPage";
import MemesPage from "./pages/MemesPage";
import JaxbValidPage from "./pages/JaxbValidPage";

const App = () => {
	const homeRoute = {
		path: routes.ROUTE_HOME,
		element: <MainLayout children={<Homepage />} />,
	};

	const xsdValidRoute = {
		path: routes.ROUTE_XSD_VALIDATION,
		element: <MainLayout children={<XsdValidPage />} />,
	};

	const rngValidRoute = {
		path: routes.ROUTE_RNG_VALIDATION,
		element: <MainLayout children={<RngValidPage />} />,
	};

	const jaxbValidRoute = {
		path: routes.ROUTE_JAXB_VALIDATION,
		element: <MainLayout children={<JaxbValidPage />} />,
	};

	const dhmzRoute = {
		path: routes.ROUTE_DHMZ,
		element: <MainLayout children={<DhmzPage />} />,
	};

	const memesRoute = {
		path: routes.ROUTE_MEMES_API,
		element: <MainLayout children={<MemesPage />} />,
	};

	const routing = useRoutes([
		homeRoute,
		xsdValidRoute,
		rngValidRoute,
		jaxbValidRoute,
		dhmzRoute,
		memesRoute,
	]);
	return <>{routing}</>;
};

export default App;
