import {APIv1} from "../api";

export const deviceStatusInactiveTime = {
    'day': '#de0733',
    'hour': '#f2a900',
    'minute': '#7815ac',
}

export const deviceStatusInactiveTimeToText = {
    'day': '> 1 day',
    'hour': '> 1 hour',
    'minute': '> 5 minute',
}

export const fetchExpireDeviceData = async (username, userToken) => {
    try {
        const response = await APIv1.get(`subscription/expire/devices/${username}/`, {
            headers: {
                Authorization: `Token ${userToken}`
            }
        });

        const {is_active, min_day_to_expire, min_day_to_expire_serial_number} = response.data;

        // Store values in localStorage
        localStorage.setItem('is_active', is_active);
        localStorage.setItem('expireDeviceData', JSON.stringify({min_day_to_expire, min_day_to_expire_serial_number}));

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
};
