import { Button, DatePicker, Space, Select, Input, Checkbox, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import './AddNewDeviceForm.scss'
const { RangePicker } = DatePicker
const { TextArea } = Input

// DATA PICKER START DATE END DATE
const onChangeDatePicker = (value, dateString) => {
	console.log('Selected Time: ', value)
	console.log('Formatted Selected Time: ', dateString)
}

const onOk = value => {
	console.log('onOk: ', value)
}

// DATA PICKER KKM START DATE
const onChangeKKMStartDatePicker = (value, dateString) => {
	console.log('Selected Time: ', value)
	console.log('Formatted Selected Time: ', dateString)
}

const onOkKKM = value => {
	console.log('onOkKKM: ', value)
}

// DATA PICKER OFD START DATE
const onChangeOFDStartDatePicker = (value, dateString) => {
	console.log('Selected Time: ', value)
	console.log('Formatted Selected Time: ', dateString)
}

const onOkOFD = value => {
	console.log('onOkKKM: ', value)
}


// DEVICE SERIAL NUMBER INPUT
const onChangeDeviceSerialNumber = e => {
	console.log(e.target.value)
}

// USER / COMPANY CHECKBOX
const handleChange = value => {
	console.log(`selected ${value}`)
}

const options = [
	{
		label: 'China',
		value: 'china',
		desc: 'China (中国)',
	},
	{
		label: 'USA',
		value: 'usa',
		desc: 'USA (美国)',
	},
	{
		label: 'Japan',
		value: 'japan',
		desc: 'Japan (日本)',
	},
	{
		label: 'Korea',
		value: 'korea',
		desc: 'Korea (韩国)',
	},
]

// PERMISSIONS
const onChangePermissions = checkedValues => {
	console.log('checked = ', checkedValues)
}

const plainOptions = ['Is multiple User', 'Update available', 'Click', 'PayMe', 'Apelsin / Uzum', 'Anor']

const AddNewDeviceForm = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className='content_container'>
				<div className='addNewDevice_main'>
					<div className='addNewDevice_main__title'>
						<h1>Add Device</h1>
						<Button
							style={{
								width: '15%',
								display: 'inline-block',
								marginRight: '1%'
							}}
							type='dashed'
							onClick={() => navigate(-1)}>
							Back
						</Button>
					</div>
					<ul className='input_form'>
						<li>
							<p>Start / End date</p>
							<Space direction='vertical' size={12}>
								<RangePicker
									showTime={{
										format: 'HH:mm',
									}}
									format='YYYY-MM-DD HH:mm'
									onChange={onChangeDatePicker}
									onOk={onOk}
								/>
							</Space>
						</li>
						<li>
							<p className='required_field'>Choose user</p>
							<Select
								mode='multiple'
								style={{
									width: '20%',
								}}
								placeholder='select one USER'
								onChange={handleChange}
								optionLabelProp='label'
								options={options}
								optionRender={option => (
									<Space>
										<span
											role='img'
											aria-label={option.data.label}
										>
											{option.data.emoji}
										</span>
										{option.data.desc}
									</Space>
								)}
								allowClear={true}
								autoFocus={true}
							/>
						</li>
						<li>
							<p className='required_field'>Choose company</p>
							<Select
								mode='multiple'
								style={{
									width: '20%',
								}}
								placeholder='select one COMPANY'
								onChange={handleChange}
								optionLabelProp='label'
								options={options}
								optionRender={option => (
									<Space>
										<span
											role='img'
											aria-label={option.data.label}
										>
											{option.data.emoji}
										</span>
										{option.data.desc}
									</Space>
								)}
								allowClear={true}
								autoFocus={true}
							/>
						</li>
						<li>
							<p className='required_field'>
								Device serial number
							</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={onChangeDeviceSerialNumber}
							/>
						</li>
						<li>
							<Checkbox.Group
								options={plainOptions}
								onChange={onChangePermissions}
							/>
						</li>
						<li>
							<p>Click service ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Click service ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Click merchant user ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Click merchant user ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Click secret KEY</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Click service ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>PayMe merchant ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'PayMe merchant ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>PayMe token</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'PayMe token: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Apelsin / Uzum merchant ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Apelsin / Uzum merchant ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Apelsin / Uzum merchant user ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Apelsin / Uzum merchant user ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Apelsin / Uzum merchant service ID</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Apelsin / Uzum merchant service ID: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Apelsin / Uzum merchant secret key</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Apelsin / Uzum merchant secret key: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Anor secret key</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Anor secret key: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Anor branch id</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Anor branch id: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Market name</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Market name: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Mac address</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Mac address: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Version</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log('Version: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>Printer model</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Printer model: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Printer name</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Printer name: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Printer number</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Printer number: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Printer type</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='number'
								type='number'
								allowClear
								onChange={value => {
									console.log(
										'Printer type: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>DNS</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log('DNS: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>Case</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log('Case: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>KKM token</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log('KKM token: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>KKM order</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='number'
								type='number'
								allowClear
								onChange={value => {
									console.log('KKM order: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>KKM Start date</p>
							<Space direction='vertical' size={12}>
								<DatePicker
									onChange={onChangeKKMStartDatePicker}
									onOk={onOkKKM}
								/>
							</Space>
						</li>
						<li>
							<p>OFD Start date</p>
							<Space direction='vertical' size={12}>
								<DatePicker
									onChange={onChangeOFDStartDatePicker}
									onOk={onOkOFD}
								/>
							</Space>
						</li>
						<li>
							<p>Server token</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Server token: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Cash desc number</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='text'
								allowClear
								onChange={value => {
									console.log(
										'Cash desc number: ',
										value.target.value
									)
								}}
							/>
						</li>
						<li>
							<p>Description</p>
							<TextArea
								style={{
									width: '20%',
								}}
								placeholder='text area'
								allowClear
								onChange={value => {
									console.log('Description: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>LAT</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='number'
								type='number'
								allowClear
								onChange={value => {
									console.log('LAT: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>LONG</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='number'
								type='number'
								allowClear
								onChange={value => {
									console.log('LONG: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>Line char count</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='number'
								type='number'
								allowClear
								onChange={value => {
									console.log('Line char count: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>Ethernet IP</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='ip-address'
								allowClear
								onChange={value => {
									console.log('Ethernet IP: ', value.target.value)
								}}
							/>
						</li>
						<li>
							<p>WI-FI IP</p>
							<Input
								style={{
									width: '20%',
								}}
								placeholder='ip-address'
								allowClear
								onChange={value => {
									console.log('WI-FI IP: ', value.target.value)
								}}
							/>
						</li>
					</ul>
					<div className='buttons'>
					<Button 
						style={{
							width: '15%',
							display: 'inline-block',
							marginRight: '1%'
						}}
						type='dashed'
						danger>
							Clear
					</Button>
					<Button 
						style={{
							width: '15%',
							display: 'inline-block',
						}}
						type="primary"
						size='medium'>
							Submit
					</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddNewDeviceForm;
