import apiClient from '../index';

/**
 * * API by Messages and MessageDetails
 */
function getMessagesPagination(page, size, sort_by, orderBy, search) {
  return apiClient.get(`/v1/messages?page=${page}&per_page=${size}&sort_by=${sort_by}&order=${orderBy}&search=${search}`);
}

function getMessageById(id) {
  return apiClient.get(`/v1/messages/${id}`);
}

function getMessageDetailsById(id) {
  return apiClient.get(`/v1/messages/${id}/details`);
}


export { 
  getMessagesPagination, 
  getMessageById,
  getMessageDetailsById
};
