import { useState } from "react";
import useHttp from "../hooks/use-http";
import api_routes from "../config/api-routes";

const JaxbValidPage = () => {
	const [fileValidationResult, setFileValidationResult] = useState<any>();
	const { sendRequest: validateFileRequest } = useHttp();

	const validationHandler = () => {
		const manageResponse = (responseData: any) => {
			setFileValidationResult(responseData.validationResult.toString());
		};

		validateFileRequest(
			{
				url: api_routes.ROUTE_VALIDATION_JAXB,
			},
			manageResponse.bind(null)
		);
	};

	return (
		<div className='container-fluid'>
			<h1>JAXB validation Page</h1>
			<hr />
			<div className='row'>
				<div className='col'>
					<div className='row'>
						<h3>Server file validation result:</h3>
						<div className='alert'>{fileValidationResult}</div>
					</div>
					<div className='row mt-2'>
						<button onClick={validationHandler} className='w-25'>
							Validate
						</button>
					</div>
				</div>

				<div className='vr'></div>

				<div className='col'>
					<div className='row'></div>
				</div>
			</div>
		</div>
	);
};

export default JaxbValidPage;
