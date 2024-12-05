import { createStore, combineReducers } from 'redux';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
    customers: customerReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools if available
  );
  

export default store;
