import apiClient from '../index';

/**
 * * API de Auth
 */
function postSignin( payload) {
  return apiClient.post(`/v1/auth/signip`, {...payload});
}

function postSignup( payload) {
  return apiClient.post(`/v1/auth/signup`, {...payload});
}


function putActivateOtp( payload) {
  return apiClient.put(`/v1/auth/active/otp`, {...payload});
}

function putSignupActivate( email, code_activate) {
  return apiClient.put(`/v1/auth/active/email/${email}/code/${code_activate}`, {});
}


export { 
  postSignin,
  postSignup,
  putActivateOtp,
  putSignupActivate
};
