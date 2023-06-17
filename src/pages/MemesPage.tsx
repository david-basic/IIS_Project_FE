import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
import {
	Button,
	Form,
	Input,
	Select,
	Upload,
	UploadFile,
	UploadProps,
	message,
} from "antd";
import { SelectOption } from "../config/SelectOption";
import api_routes from "../config/api-routes";
import useHttpImages from "../hooks/use-http-images";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";

const MemesPage = () => {
	const { sendRequest: memeApiRequest } = useHttp();
	const { sendRequest: memeApiImageRequest } = useHttpImages();
	const [memesDropDown, setMemesDropDown] = useState<SelectOption[]>();
	const [generateMemeForm] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			const isJPEG = file.type === "image/jpeg";
			if (!isJPEG) {
				message.error(`${file.name} is not a JPEG/JPG format file`);
				return Upload.LIST_IGNORE;
			} else {
				setFileList([...fileList, file]);
			}

			return false;
		},
		fileList,
		maxCount: 1,
	};

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

	const onFinishGenerateMeme = (values: any) => {
		const top = values.top;
		const bottom = values.bottom;
		const meme = memesDropDown?.at(values.meme)?.label;

		const manageResponseData = (responseData: Blob) => {
			console.log(responseData);
			var imageUrl = URL.createObjectURL(responseData);
			const image = document.querySelector<HTMLImageElement>("#image");
			image?.addEventListener("load", () =>
				URL.revokeObjectURL(imageUrl)
			);
			document.querySelector<HTMLImageElement>("#image")!!.src = imageUrl;
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

	const handleMemeImageUpload = () => {
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append("image", file as RcFile);
		});
		setUploading(true);

		fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", {
			method: "POST",
			headers: {
				"X-RapidAPI-Key":
					"20c67779b2msh6e4489c6d5dc1d3p13dd73jsn871b0ec0ab66",
				"X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setFileList([]);
				if(data.status === "error"){
					message.error(data.message);
				}else{
					message.success(`Uploaded ${data.name} with ${data.message}`);
				}
			})
			.catch((e) => {
				message.error("upload failed.");
			})
			.finally(() => {
				setUploading(false);
			});
	};

	return (
		<div className='container-fluid'>
			<div className='h1'>MEMES Page</div>
			<hr />
			<div className='row'>
				<h3>Generate meme</h3>
				<div className='col'>
					<div className='row'>
						<Form
							form={generateMemeForm}
							onFinish={onFinishGenerateMeme}
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
			<hr />
			<h3>Upload meme image</h3>
			<div className='row'>
				<div className='col'>
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>Select File</Button>
					</Upload>
					<Button
						type='primary'
						onClick={handleMemeImageUpload}
						disabled={fileList.length === 0}
						loading={uploading}
						style={{ marginTop: 16 }}>
						{uploading ? "Uploading" : "Start Upload"}
					</Button>
				</div>
				<div className='col'></div>
			</div>
		</div>
	);
};

export default MemesPage;
