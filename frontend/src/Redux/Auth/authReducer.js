const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    error: null,
  };
const authReducer = (state = initialState, action) => {
    return state
}