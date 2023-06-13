export const routesParams = {
	API: "http://localhost:8081",
};

const api_routes = {
	ROUTE_UPLOAD_FILE: `${routesParams.API}/validators/fileUpload`,
	
	ROUTE_VALIDATION_XSD: `${routesParams.API}/validators/xsdValidation`,
	ROUTE_VALIDATION_RNG: `${routesParams.API}/validators/rngValidation`,

	ROUTE_DHMZ_GET_CITIES: `${routesParams.API}/dhmz/getCities`,
	ROUTE_DHMZ_GET_CITY: `${routesParams.API}/dhmz/getCity?grad=`,
};

export default api_routes;
