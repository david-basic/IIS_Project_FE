export const routesParams = {
	VALIDATION_API: "http://localhost:8081",
	MEMES_API: "https://ronreiter-meme-generator.p.rapidapi.com",
};

const api_routes = {
	ROUTE_UPLOAD_FILE: `${routesParams.VALIDATION_API}/validators/fileUpload`,

	ROUTE_VALIDATION_XSD: `${routesParams.VALIDATION_API}/validators/xsdValidation`,
	ROUTE_VALIDATION_RNG: `${routesParams.VALIDATION_API}/validators/rngValidation`,
	ROUTE_VALIDATION_JAXB: `${routesParams.VALIDATION_API}/validators/jaxbValidation`,

	ROUTE_DHMZ_GET_CITIES: `${routesParams.VALIDATION_API}/dhmz/getCities`,
	ROUTE_DHMZ_GET_CITY: `${routesParams.VALIDATION_API}/dhmz/getCity?grad=`,

	ROUTE_MEMES_IMAGES: `${routesParams.MEMES_API}/images`,
	ROUTE_MEMES_FONTS: `${routesParams.MEMES_API}/fonts`,
	ROUTE_MEMES_GENERATE: `${routesParams.MEMES_API}/meme?`,
};

export default api_routes;
