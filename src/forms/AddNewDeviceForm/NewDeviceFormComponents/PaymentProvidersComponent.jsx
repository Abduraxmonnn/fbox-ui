import {Input} from "antd";

const PaymentProvidersComponent = () => {

    return (
        <>
            <ul className='create-device__forms-list'>
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
            </ul>
        </>
    )
}

export default PaymentProvidersComponent;