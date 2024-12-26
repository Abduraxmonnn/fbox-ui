import {Button} from 'antd'
import {useNavigate} from 'react-router-dom';
import PaymentProvidersComponent from "./NewDeviceFormComponents/PaymentProvidersComponent";
import AdditionalFieldsComponent from "./NewDeviceFormComponents/AdditionalFieldsComponent";
import MainFieldsComponent from "./NewDeviceFormComponents/MainFieldsComponent";
import './AddNewDeviceForm.scss'

const AddNewDeviceForm = () => {
    const navigate = useNavigate();

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
                        <h2 className="create-device__forms-title">Additional Fields</h2>
                        <AdditionalFieldsComponent/>
                    </div>
                </div>
                <div className='create-device__footer'>
                    <div className='create-device__footer-buttons'>
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
