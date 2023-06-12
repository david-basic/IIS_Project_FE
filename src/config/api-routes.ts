export const routesParams = {
	VALIDATION_API: "http://localhost:8081",
};

const api_routes = {

	ROUTE_VALIDATION_XSD: `${routesParams.VALIDATION_API}/validators/xsdValidation`,
	ROUTE_UPLOAD_FILE: `${routesParams.VALIDATION_API}/validators/fileUpload`,
};

export default api_routes;
