import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Tag } from 'antd'

import { APIv1 } from '../../../api'
import './DeviceDetail.scss'

const DeviceDetail = () => {
	const { id } = useParams()
	const [device, setDevice] = useState(null)
	const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const extractDate = dateString => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 10)
  }

	useEffect(() => {
		const fetchDeviceDetail = async () => {
			setLoading(true)
			try {
				const response = await APIv1.get(`/devices/${id}`)
				setDevice(response.data)
			} catch (err) {
				console.error('Something went wrong:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchDeviceDetail()
	}, [id])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!device) {
		return <div>Device not found</div>
	}

	return (
		<div className='content_container'>
			<div className='device_detail__title'>
				<div>
					<h1>{device.company.name}</h1>
					<span>
						<span className='device_detail__device_serial_number_title'>
							Device serial number:{' '}
						</span>
						{device.device_serial_number}
					</span>
				</div>
				<Button
					style={{
						width: '15%',
						display: 'inline-block',
						marginRight: '1%',
					}}
					type='dashed'
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
			</div>
			<div className='graphBox'>
				<div className='box'>
					<h1>Base data</h1>
					<ul className='base_data_list'>
						<li>
							<span>User: </span>
							<span>{device.company.name}</span>
						</li>
						<li>
							{console.log(device)}
							<span>Multiple user:</span>
							<span>
								<Tag color={device.is_multi_user ? 'green' : 'volcano'}>
									{device.is_multi_user ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
						</li>
						<li>
							<span>Updated Available:</span>
							<span>
								<Tag color={device.is_multi_user ? 'green' : 'volcano'}>
									{device.is_multi_user ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
						</li>
						<li>
							<span>Start date:</span>
							<span>
								{device.start_date
									? extractDate(device.start_date)
									: '----/--/--'}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default DeviceDetail;
