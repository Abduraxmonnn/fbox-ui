import {APIv1} from "../../api";

export const updateUserData = async ({data, companyInn, token}) => {
    const requestBody = {
        name: data.companyName,
        address: data.address,
        phone_number: data.phone,
        click: data.click,
        pay_me: data.payme,
        apelsin: data.uzum,
        anor: data.anor,
        send_sms: data.isSendSms
    };
    console.log("Token:", token);
    console.log("Request Body:", requestBody);

    try {
        const response = await APIv1.put(`/company/profile/update/${companyInn}/`,
            requestBody,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log(response)

        return response?.data.status === "successfully";
    } catch (err) {
        console.error("Error updating user data:", err);
        return false;
    }
};