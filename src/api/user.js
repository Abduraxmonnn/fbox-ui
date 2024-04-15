import {APIv1} from '../api';

async function getUserData(props) {
    const {username, token} = props;

    try {
        const response = await APIv1.get(`/user/me/${username}/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        });

        return response.data
    } catch
        (err) {
        console.error('Something went wrong:', err);
        throw err;
    }
}

export default getUserData;
