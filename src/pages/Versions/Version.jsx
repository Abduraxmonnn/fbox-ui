import React, {useState, useEffect} from 'react'
import {Table, Button} from 'antd'
import {APIv1 as API} from '../../api'
import {useTranslation} from "react-i18next";
import VersionsColumns from "./version.constants";

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
    const {t} = useTranslation();
    const columns = VersionsColumns(t);
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
            const response = await API.get('/version/');

            const data = [{
                key: response.data.id,
                version_id: response.data.id,
                version_number: response.data.version_number,
                file: extractFileName(response.data.file),
            }];
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
                    {t('pages.versions.downloadVersion')}
                </Button>
            </div>
        </>
    )
}

export default Version
