import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postsReducer from './reducer_posts';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postsReducer,
});

export default rootReducer;