import { useCallback, useState } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = useCallback(
		async (
			requestConfig: RequestConfig,
			manageResponseData: (arg: any) => void
		) => {
			setIsLoading(true);

			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body
					? JSON.stringify(requestConfig.body)
					: null,
			});

			const responseData = await response.json();
			manageResponseData(responseData);

			setIsLoading(false);
		},
		[]
	);

	return {
		isLoading,
		sendRequest,
	};
};

export default useHttp;
