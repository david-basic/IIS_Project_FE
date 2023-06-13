import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./config/routes";
import Homepage from "./pages/Homepage";
import MainLayout from "./components/layout/MainLayout";
import XsdValidPage from "./pages/XsdValidPage";
import RngValidPage from "./pages/RngValidPage";
import DhmzPage from "./pages/DhmzPage";

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

	const dhmzRoute = {
		path: routes.ROUTE_DHMZ,
		element: <MainLayout children={<DhmzPage />} />,
	};

	const routing = useRoutes([
		homeRoute,
		xsdValidRoute,
		rngValidRoute,
		dhmzRoute,
	]);
	return <>{routing}</>;
};

export default App;
