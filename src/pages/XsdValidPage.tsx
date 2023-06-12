import { useState } from "react";
import useHttp from "../hooks/use-http";
import api_routes from "../config/api-routes";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps, message } from "antd";

const props: UploadProps = {
	name: "uploadedXml",
	action: api_routes.ROUTE_UPLOAD_FILE,
	onChange(info) {
		if (info.file.status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	maxCount: 1,
};

const XsdValidPage = () => {
	const [fileValidationResult, setFileValidationResult] = useState<any>();
	const { sendRequest: validateFileRequest } = useHttp();

	const validationHandler = () => {
		const manageResponse = (responseData: any) => {
			setFileValidationResult(responseData.validationResult.toString());
		};

		validateFileRequest(
			{
				url: api_routes.ROUTE_VALIDATION_XSD,
			},
			manageResponse.bind(null)
		);
	};

	return (
		<div className='container-fluid'>
			<div className='h1'>XSD validation Page</div>
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
					<div className='row'>
						<div className='row'>
							<Upload {...props}>
								<Button icon={<UploadOutlined />}>
									Click to Upload
								</Button>
							</Upload>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default XsdValidPage;
