import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { APIv1 as API } from '../api'

const columns = [
	{
		title: 'id',
		dataIndex: 'version_id',
		sorter: {},
		render: title => <a>{title}</a>,
	},
	{
		title: 'Version number',
		dataIndex: 'version_number',
		render: title => <a>{title}</a>,
	},
	{
		title: 'File',
		dataIndex: 'file',
	},
]

// rowSelection object indicates the need for row selection
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			'selectedRows: ',
			selectedRows
		)
	},
}

const Version = () => {
	const [versionData, setVersionData] = useState([])
	const [selectionType, setSelectionType] = useState('checkbox')

	function extractFileName(url) {
		const parts = url.split('/')
		return parts[parts.length - 1]
	}

	// Assuming the backend returns a file download URL
	async function downloadFile(url) {
		const response = await fetch(url)
		const blob = await response.blob()
		const downloadLink = document.createElement('a')
		downloadLink.href = URL.createObjectURL(blob)
		downloadLink.download = versionData.map(data => data.file)
		downloadLink.click()
	}

	const handleDownload = async () => {
		const fileUrl = versionData.file
		await downloadFile(fileUrl)
	}

	async function getVersionData() {
		try {
			const response = await API.get('/version/')
			const data = response.data.map(get_version => ({
				key: get_version.id,
				version_id: get_version.id,
				version_number: get_version.version_number,
				file: extractFileName(get_version.file),
			}))
			setVersionData(data)
		} catch (err) {
			console.error('Something went wrong:', err)
		}
	}

	useEffect(() => {
		getVersionData()
	}, [])

	return (
		<>
			<div className='content_container'>
				<Table
					rowSelection={{
						type: selectionType,
						...rowSelection,
					}}
					columns={columns}
					dataSource={versionData}
					pagination={false}
				/>
				<Button
					trigger='click'
					type='primary'
					style={{
						top: 10,
					}}
					onClick={handleDownload}
				>
					Download latest version
				</Button>
			</div>
		</>
	)
}

export default Version
