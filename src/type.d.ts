type RequestConfig = {
	url: RequestInfo | URL;
	method?: string | undefined;
	body?: any;
	headers?: HeadersInit | undefined;
};