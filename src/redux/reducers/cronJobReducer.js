// cronJobReducer.js

const initialState = {
    date_updated: null,
    scheduled_date: null,
    scheduled_year: null,
    is_completed: false,
  };
  
  const cronJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CRON_JOB':
        return {
          ...state,
          ...action.payload,
        };
      case 'LOCK_CRON_JOB':
        return {
          ...state,
          is_completed: true,
        };
      default:
        return state;
    }
  };
  
  export default cronJobReducer;
  