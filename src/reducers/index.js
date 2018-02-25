import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import peopleReducer from './people';
import personReducer from './person';
import socialgraphReducer from './socialgraph';

export default combineReducers({
  formReducer,
  authReducer,
  peopleReducer,
  personReducer,
  socialgraphReducer,
});
