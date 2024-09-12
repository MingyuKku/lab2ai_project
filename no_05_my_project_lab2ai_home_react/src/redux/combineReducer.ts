import { combineReducers } from 'redux';
import commonReducer from './common/reducer';
import headerReducer from './header/reducer';
import intersectReducer from './intersect/reducer';
import browserWidthReducer from './browserWidth/reducer';

const reducer = combineReducers({
  commonReducer,
  headerReducer,
  intersectReducer,
  browserWidthReducer
})

export default reducer;
export type RootState = ReturnType<typeof reducer>;