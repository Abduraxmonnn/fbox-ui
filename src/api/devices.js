import { useState } from 'react'
import { API } from './index'

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
		return devicesData
	} catch (err) {
		console.error('Something went wrong:', err)
		throw err
	}
}

export default getDevicesData
