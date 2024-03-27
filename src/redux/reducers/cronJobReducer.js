// cronJobReducer.js

const initialState = {
   list: [],
  };
  
  const cronJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CRON_JOB':
        return {
          ...state,
          list: action.payload,
        };
      case 'LOCK_CRON_JOB':
        return {
          ...state,
          is_completed: True,
        };
      default:
        return state;
    }
  };
  
  export default cronJobReducer;
  