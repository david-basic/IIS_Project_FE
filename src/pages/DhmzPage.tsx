import { useState } from "react";
import useHttp from "../hooks/use-http";
import { Button, Form } from "react-bootstrap";
import api_routes from "../config/api-routes";
import { message } from "antd";

const DhmzPage = () => {
	const [temperature, setTemperature] = useState<string>();
	const [cityName, setCityName] = useState<string>();
	const [value, setValue] = useState<any>();
	const { sendRequest: getTemperatureRequest } = useHttp();

	const onInput = (e: any) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const getCityTempHandler = (e: any) => {
		e.preventDefault();

		const manageResponse = (responseData: any) => {
			console.log(responseData);

			if (responseData.length !== 1) {
				message.error("Couldn't find the city!");
                return;
			}
			setCityName(responseData[0].gradIme);
			setTemperature(responseData[0].temp);
		};

		getTemperatureRequest(
			{
				url: `${api_routes.ROUTE_DHMZ_GET_CITY}${value}`,
			},
			manageResponse.bind(null)
		);
	};

	return (
		<div className='container-fluid'>
			<div className='h1'>DHMZ Page</div>
			<hr />
			<div className='row'>
				<div className='col'>
					<div className='row'>
						<Form onSubmit={getCityTempHandler}>
							<Form.Group className='mb-3'>
								<Form.Control
									type='input'
									placeholder='Unesite ime grada'
									onChange={onInput}
									value={value}
									required
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</div>
					<div className='row mt-2'></div>
				</div>

				<div className='vr'></div>

				<div className='col'>
					<div className='row'>
						<h3>Grad: {cityName}</h3>
						<h3>Temperatura: {temperature}</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DhmzPage;
