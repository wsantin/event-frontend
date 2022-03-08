import apiClient from '../index';

/**
 * * API by Transactions
 */
function getTransactionsPagination(page, size, sort_by, orderBy, search) {
  return apiClient.get(`/v1/transactions?page=${page}&per_page=${size}&sort_by=${sort_by}&order=${orderBy}&search=${search}`);
}

function getTransactionById(id) {
  return apiClient.get(`/v1/transactions/${id}`);
}

export { 
  getTransactionsPagination, 
  getTransactionById
};
