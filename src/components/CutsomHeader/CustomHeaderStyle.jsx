import styled from 'styled-components'
import { Layout } from 'antd'
const { Header } = Layout

const CustomHeaderStyle = styled(Header)`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	width: 97%;
	border-radius: 10px;
	height: 50px;
	margin: 10px 20px 0 20px;
	border-radius: 10px;
	transition: max-width 0.3s ease-in-out; // Smoothly change size when collapse is opening or closing
`

export default CustomHeaderStyle