import React, {useState, useEffect} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload, Modal, Radio} from 'antd';

const UploadUserProfile = ({t}) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [savedImages, setSavedImages] = useState({
        billing: null,
        qrLogo: null,
        qrBanner: null,
    });

    useEffect(() => {
        // Cleanup function to revoke object URLs when component unmounts
        return () => {
            Object.values(savedImages).forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [savedImages]);

    const handleUpload = () => {
        if (!selectedSection) {
            message.error(t("pages.user.profile.messages.error3"));
            return;
        }

        setUploading(true);

        // Simulate saving the file locally
        const file = fileList[0];
        const objectUrl = URL.createObjectURL(file);

        // Update the savedImages state with the new object URL
        setSavedImages(prev => ({
            ...prev,
            [selectedSection]: objectUrl
        }));

        // Simulate an API call with a timeout
        setTimeout(() => {
            setFileList([]);
            setSelectedSection(null);
            setUploading(false);
            message.success(`${t("pages.user.profile.messages.success3")} ${selectedSection} ${t("pages.user.profile.messages.success4")}`);
            setIsModalVisible(false);
        }, 1000);
    };

    const props = {
        onRemove: (file) => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };

    const showModal = () => {
        if (fileList.length === 0) {
            message.error(t("pages.user.profile.messages.error4"));
            return;
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!selectedSection) {
            message.error(t("pages.user.profile.messages.error5"));
            return;
        }
        handleUpload();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
    };

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>{t("pages.user.profile.buttons.button4")}</Button>
            </Upload>
            <Button
                type="primary"
                onClick={showModal}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                    marginTop: 16,
                }}
            >
                {uploading ? `${t("pages.user.profile.buttons.button6")}` : `${t("pages.user.profile.buttons.button5")}`}
            </Button>
            <Modal
                title={t("pages.user.profile.label12")}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={t("pages.user.profile.buttons.button7")}
                cancelText={t("pages.user.profile.buttons.button8")}
            >
                <Radio.Group onChange={handleSectionChange} value={selectedSection}>
                    <Radio value="billing">Billing Image</Radio>
                    <Radio value="qrLogo">Scan2Pay Logo</Radio>
                    <Radio value="qrBanner">Scan2Pay Banner</Radio>
                </Radio.Group>
            </Modal>
        </>
    );
};

export default UploadUserProfile;
