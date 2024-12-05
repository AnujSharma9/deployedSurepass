// src/redux/actions/customerActions.js

export const addCustomer = (customerData) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customerData,
    };
};
