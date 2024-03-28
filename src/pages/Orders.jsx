// import { prop } from 'ramda'
// import { compose, withHandlers } from 'recompose'
// import { connect } from 'react-redux'
// import { ROOT_PATH } from 'constants/routes'
// import { storageData } from 'utils/storage'
// import { parseParams } from 'utils/url'
// import { getDataFromState } from 'utils/get'
// import { signInAction } from 'modules/sign-in/actions'
// import SignIn from 'modules/sign-in/components'
//
// const mapStateToProps = state => ({
// 	auth: getDataFromState('auth', state),
// })
//
// export default compose(
// 	connect(mapStateToProps, { signInAction }),
// 	withHandlers({
// 		onSubmit: props => values => {
// 			const queries = parseParams(props.location.search)
// 			const queryRedirect = prop('redirect', queries) || ROOT_PATH
// 			const redirect = decodeURIComponent(queryRedirect)
// 			return props.signInAction(values).then(({ value }) => {
// 				const token = prop('token', value)
// 				storageData('token').setValue(token)
// 				props.history.replace(redirect)
// 			})
// 		},
// 	})
// )(SignIn)
