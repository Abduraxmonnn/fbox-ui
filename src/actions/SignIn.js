import * as API from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        await API.SIGN_IN({
            ...formData,
        }).then((response) => {
            const {data} = response;
            console.log(data);
        });

        navigate("/analysis");
    } catch (error) {
        console.error(error);
    }
};
