import React, {useState} from "react";
import {Button, message} from 'antd'
import {useNavigate} from 'react-router-dom';
import PaymentProvidersComponent from "./NewDeviceFormComponents/PaymentProvidersComponent";
import AdditionalFieldsComponent from "./NewDeviceFormComponents/AdditionalFieldsComponent";
import MainFieldsComponent from "./NewDeviceFormComponents/MainFieldsComponent";
import './AddNewDeviceForm.scss'
import {Save, X} from "lucide-react";

const AddNewDeviceForm = () => {
    const navigate = useNavigate();
    const [expandAdditionalSection, setExpandAdditionalSection] = useState(null);

    const toggleAdditionalSection = (section) => {
        setExpandAdditionalSection(prevSection => prevSection === section ? null : section);
    };

    const handleSubmit = async () => {
        try {
            message.success('Profile updated successfully');
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    const handleClear = () => {
        message.info('Changes discarded');
    };


    return (
        <>
            <div className='content_container create-device'>
                <div className='create-device__title'>
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
                <div className="create-device__forms">
                    <div className="create-device__forms-container">
                        <h2 className="create-device__forms-title">Main Fields</h2>
                        <MainFieldsComponent/>
                    </div>
                    <div className="create-device__forms-container">
                        <h2 className="create-device__forms-title">Payment Providers</h2>
                        <PaymentProvidersComponent/>
                    </div>
                    <div className="create-device__forms-container">
                        {/*<h2 className="create-device__forms-title">Additional Fields</h2>*/}
                        <AdditionalFieldsComponent expandedSection={expandAdditionalSection}
                                                   toggleSection={toggleAdditionalSection}/>
                    </div>
                </div>
                <div className='create-device__footer'>
                    <div className='create-device__footer-buttons'>
                        <Button
                            className="create-device__save-button"
                            icon={<Save size={16}/>}
                            type="primary"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: '#4caf50',
                                borderColor: '#4caf50',
                                display: 'inline-block',
                                width: '15%',
                                marginRight: '1%'
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            className="create-device__cancel-button"
                            icon={<X size={16}/>}
                            type="dashed"
                            danger
                            onClick={handleClear}
                            style={{
                                display: 'inline-block',
                                width: '15%',
                                marginRight: '1%'
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewDeviceForm;
