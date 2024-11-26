const initialState = {
    isActive: true,
    expireDeviceData: {
        minDayToExpire: 0,
        minDayToExpireSerialNumber: '',
    },
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_ACTIVE':
            return { ...state, isActive: action.payload };
        case 'SET_EXPIRE_DEVICE_DATA':
            return { ...state, expireDeviceData: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
