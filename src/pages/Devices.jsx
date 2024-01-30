import React, { useState, useEffect } from 'react'
import { Table, Tag, Pagination } from 'antd'
import { API } from '../api'

const columns = [
	{
		title: 'Device serial number',
		dataIndex: 'device_serial_number',
		sorter: {},
		render: title => <a>{title}</a>,
		width: 300,
	},
	{
		title: 'Multiple user',
		dataIndex: 'is_multi_user',
		filters: [
			{
				text: 'True',
				value: 'true',
			},
			{
				text: 'False',
				value: 'false',
			},
		],

		render: (_, { is_multi_user }) => (
			<>
				{is_multi_user.map(tag => {
					let color = tag.length > 5 ? true : 'green'
					if (tag === false) {
						color = 'volcano'
					}
					return (
						<Tag color={color} key={toString(tag)}>
							{`${tag}`.toUpperCase()}
						</Tag>
					)
				})}
			</>
		),
	},
	{
		title: 'Start date',
		dataIndex: 'start_date',
		sorter: {
			compare: (a, b) => a.english - b.english,
			multiple: 1,
		},
		filters: [
			{
				text: 'Today',
				value: 'today',
			},
			{
				text: 'Past 7 days',
				value: 'pastSevenDays',
			},
			{
				text: 'No Date',
				value: 'noDate',
			},
			{
				text: 'Has Date',
				value: 'hasDate',
			},
		],
	},
	{
		title: 'End date',
		dataIndex: 'end_date',
		sorter: {
			compare: (a, b) => a.english - b.english,
			multiple: 1,
		},
		filters: [
			{
				text: 'Today',
				value: 'today',
			},
			{
				text: 'Past 7 days',
				value: 'pastSevenDays',
			},
			{
				text: 'No Date',
				value: 'noDate',
			},
			{
				text: 'Has Date',
				value: 'hasDate',
			},
		],
	},
]

const Devices = () => {
    const [devices, setDevices] = useState([])
	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra)
	}

    function extractDate(dateString) {
		const date = new Date(dateString)
		return date.toISOString().slice(0, 10)
	}

    async function getDevicesData() {
		try {
			const response = await API.get('/devices')
			const devicesData = response.data.map(device => ({
				key: device.id,
				device_serial_number: device.device_serial_number,
				is_multi_user: [device.is_multi_user],
				start_date: extractDate(device.start_date),
				end_date: extractDate(device.end_date),
			}))
			setDevices(devicesData)
		} catch (err) {
			console.error('Something went wrong:', err)
            throw err;
		}
	}

    useEffect(() => {
		getDevicesData()
	}, [])

	return (
		<>
			<div className='content_container'>
				<Table
					columns={columns}
					dataSource={devices}
					onChange={onChange}
					pagination={{
						defaultPageSize: 20,
						showSizeChanger: true,
						defaultCurrent: 1,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${devices.length}`,
						pageSizeOptions: ['10', '20', '50', '100'],
					}}
				/>
			</div>
		</>
	)
}

export default Devices;
