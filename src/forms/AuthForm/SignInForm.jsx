import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {Button, Checkbox, Form, Input} from 'antd'
import {useNavigate} from 'react-router-dom'
import {userSignIn} from "../../store/auth/user.action";

const initialState = {username: "", password: ""}

const SignInForm = ({setUser}) => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userSignIn(formData, (user) => {
            setUser(user);
        }));
    };

    return (
        <Form
            name='basic'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
                marginLeft: 75
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete='on'
            className='text'
            onSubmitCapture={handleSubmit}
        >
            <Form.Item
                label={<label style={{color: "white"}}>Username</label>}
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input
                    autoFocus={true}
                    type="text"
                    name="username"
                    onChange={handleChange}
                />
            </Form.Item>

            <Form.Item
                // label='Password'
                label={<label style={{color: "white"}}>Password</label>}
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password
                    type="password"
                    name="password"
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox style={{color: "white"}}>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignInForm;
