const initialState = {
    customerList: [],
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customerList: [...state.customerList, action.payload],
            };
        default:
            return state;
    }
};

export default customerReducer;
