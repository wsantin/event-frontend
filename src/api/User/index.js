import apiClient from '../index';

/**
 * * API by Users
 */
function getUsersCustomersPagination(page, size, sort_by, orderBy, search) {
  return apiClient.get(`/v1/users/customers?page=${page}&per_page=${size}&sort_by=${sort_by}&order=${orderBy}&search=${search}`);
}

function getUsersOperatorsPagination(page, size, sort_by, orderBy, search) {
  return apiClient.get(`/v1/users/operators?page=${page}&per_page=${size}&sort_by=${sort_by}&order=${orderBy}&search=${search}`);
}

function getUserById(id) {
  return apiClient.get(`/v1/users/${id}`);
}

function getUserDetailsBasicById(id) {
  return apiClient.get(`/v1/users/${id}/details/basic`);
}

function postUser(payload) {
  return apiClient.put(`/v1/users`, {...payload});
}

function putUserById(id, payload) {
  return apiClient.put(`/v1/users/${id}`, {...payload});
}

function deletetUserById( payload) {
  return apiClient.delete(`/v1/users`, {...payload});
}

export { 
  getUsersCustomersPagination, 
  getUsersOperatorsPagination,
  getUserById,
  getUserDetailsBasicById,
  postUser,
  putUserById,
  deletetUserById
};
