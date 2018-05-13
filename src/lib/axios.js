// Returns a promise.
import axios from 'axios';

const getAuthorizationHeaders = accessToken => ({
  'Authorization': `Bearer ${accessToken}`
});

const getBaseURL = () => {
  const baseURL = 'localhost:8080/api';

  if (process.env.NODE_ENV === 'production') {
   // baseURL = 'production_api_url_here';
  }

  return baseURL;
};

const setHeaders = (axiosConfig, token) => {
  axiosConfig.headers = getAuthorizationHeaders(token);
};

export default (token, baseURL = getBaseURL()) => {
  const axiosConfig = { baseURL };

  if (token) {
    setHeaders(axiosConfig, token);
  }

  console.log(axiosConfig, '<<<<<<<<<<<<<<<<, axiosConfig <<<<<<,,');
  const instance = axios.create(axiosConfig);

  // Axios doesn't wrap stuff as an Error object. In order for redux-actions
  // to recognize something as an error (and set action.error), the rejected
  // promise must have a payload which is an instance of Error.
  instance.interceptors.response.use(response => response, error => {
    if (!(error instanceof Error)) {
      error = Object.assign(new Error('A HTTP request has failed'), error);
    }

    return Promise.reject(error);
  });

  return instance;
};
