// cronJobReducer.js

const initialState = {
  list: [],
};

const cronJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CRON_JOBS":
      return {
        ...state,
        list: action.payload,
      };
    case "LOCK_CRON_JOB":
      return {
        ...state,
        list: state.list.map(job =>
          job.id === action.payload.id ? { ...job, is_completed: true } : job
        ),      };
    default:
      return state;
  }
};

export default cronJobReducer;
