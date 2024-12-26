import {DatePicker, Input, Space} from "antd";
import {ChevronDown, ChevronUp} from "lucide-react";

const {TextArea} = Input

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

// PERMISSIONS
const onChangePermissions = checkedValues => {
    console.log('checked = ', checkedValues)
}

const plainOptions = ['Is multiple User', 'Update available', 'Click', 'PayMe', 'Apelsin / Uzum', 'Anor']

const AdditionalFieldsComponent = props => {
    let expandedSection = props.expandedSection;
    let toggleSection = props.toggleSection;

    return (
        <>
            <button
                className="create-device__expand-button"
                onClick={() => toggleSection('device-expand')}
                aria-expanded={expandedSection === 'device-expand'}
            >
                <span className="create-device__expand-button-text">Additional Fields</span>
                {expandedSection === 'device-expand' ? <ChevronUp size={22}/> :
                    <ChevronDown size={22}/>}
            </button>

            {expandedSection === 'device-expand' && (
                <div>
                    <ul className='create-device__forms-list'>
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
                </div>
            )}
        </>
    )
}

export default AdditionalFieldsComponent;
