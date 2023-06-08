import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./config/routes";
import Homepage from "./pages/Homepage";
import MainLayout from "./components/layout/MainLayout";
import XsdValidPage from "./pages/XsdValidPage";

const App = () => {
	const homeRoute = {
		path: routes.ROUTE_HOME,
		element: <MainLayout children={<Homepage />} />,
	};

	const xsdValidRoute = {
		path: routes.ROUTE_XSD_VALIDATION,
		element: <MainLayout children={<XsdValidPage />} />,
	};

	const routing = useRoutes([homeRoute, xsdValidRoute]);
	return <>{routing}</>;
};

export default App;
