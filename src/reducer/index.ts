import { combineReducers} from 'redux';
const initialState = {
    selected: []
  }
type Action = {
    type: string,
    payload: {}
}

function reducer(state = initialState, action: Action) {
    switch (action.type) {
      case "SHOW_SUGGESTION": {
          return {
              ...state,
              selected: [...state.selected, action.payload]

          }
      }
      default:
        return state
    }
  }
  const rootReducer = combineReducers({reducer})
  export default rootReducer;