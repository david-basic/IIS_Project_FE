import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { SelectOption } from "../config/SelectOption";
import api_routes from "../config/api-routes";
import useHttpImages from "../hooks/use-http-images";

const MemesPage = () => {
	const { sendRequest: memeApiRequest } = useHttp();
	const { sendRequest: memeApiImageRequest } = useHttpImages();
	const [memesDropDown, setMemesDropDown] = useState<SelectOption[]>();
	const [memeGenerated, setMemeGenerated] = useState<boolean>();
	const [form] = Form.useForm();

	useEffect(() => {
		getAllMemes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getAllMemes = () => {
		const mapData = async (responseData: any) => {
			if (responseData.message !== undefined) {
				message.error("Couldn't fetch memes!");
			} else {
				const tempList: SelectOption[] = [];
				var i = 0;
				responseData.map((value: any) =>
					tempList.push({
						value: i++,
						label: value,
					})
				);
				setMemesDropDown(tempList);
			}
		};

		memeApiRequest(
			{
				url: api_routes.ROUTE_MEMES_IMAGES,
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"20c67779b2msh6e4489c6d5dc1d3p13dd73jsn871b0ec0ab66",
					"X-RapidAPI-Host":
						"ronreiter-meme-generator.p.rapidapi.com",
				},
			},
			mapData.bind(null)
		);
	};

	const onFinish = (values: any) => {
		const top = values.top;
		const bottom = values.bottom;
		const meme = memesDropDown?.at(values.meme)?.label;

		const manageResponseData = (responseData: Blob) => {
			console.log(responseData);
			var imageUrl = URL.createObjectURL(responseData);
			const image = document.querySelector<HTMLImageElement>("img");
			image?.addEventListener("load", () =>
				URL.revokeObjectURL(imageUrl)
			);
			document.querySelector<HTMLImageElement>("img")!!.src = imageUrl;
			setMemeGenerated(true);
		};

		memeApiImageRequest(
			{
				url: `${api_routes.ROUTE_MEMES_GENERATE}top=${top}&bottom=${bottom}&meme=${meme}`,
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"20c67779b2msh6e4489c6d5dc1d3p13dd73jsn871b0ec0ab66",
					"X-RapidAPI-Host":
						"ronreiter-meme-generator.p.rapidapi.com",
				},
			},
			manageResponseData.bind(null)
		);
	};

	// const normFile = (e: any) => {
	// 	if (Array.isArray(e)) {
	// 		return e;
	// 	}
	// 	return e?.fileList;
	// };

	return (
		<div className='container-fluid'>
			<div className='h1'>MEMES Page</div>
			<hr />
			<div className='row'>
				<div className='col'>
					<div className='row'>
						<Form
							form={form}
							onFinish={onFinish}
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 26 }}
							layout='horizontal'
							style={{ maxWidth: 600 }}>
							<Form.Item
								label='Top text'
								name={"top"}
								rules={[
									{
										required: true,
										message: "Input top text of the meme!",
									},
								]}>
								<Input />
							</Form.Item>
							<Form.Item
								label='Bottom text'
								name={"bottom"}
								rules={[
									{
										required: true,
										message:
											"Input bottom text of the meme!",
									},
								]}>
								<Input />
							</Form.Item>
							<Form.Item label='Meme' name={"meme"}>
								<Select options={memesDropDown} />
							</Form.Item>
							{/* <Form.Item
								label='Upload'
								valuePropName='fileList'
								getValueFromEvent={normFile}>
								<Upload listType='picture-card'>
									<div>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>
											Upload
										</div>
									</div>
								</Upload>
							</Form.Item> */}
							<Form.Item>
								<Button type='primary' htmlType='submit'>
									Generate meme
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div className='row mt-2'></div>
				</div>
				<div className='col'>
					<div className='row'>
						<img id='image' alt='Generated meme' src='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemesPage;
