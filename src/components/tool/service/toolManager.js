import { showNotification } from '../../common/service/showNotification';

export const toolManager = {
  getToolGroups: async function () {
    const response = await fetch('http://localhost:4000/tools');

    if (!response.ok) throw new Error('Failed to fetch tools' + response.statusText);

    return await response.json();
  },
  createToolGroup: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool group added', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding tool group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteToolGroup: function (id, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool group deleted', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting tool group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateToolGroup: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool group updated', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating tool group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  getToolGroupByID: async function (id) {
    const response = await fetch(`http://localhost:4000/tools/${id}`);

    if (!response.ok) throw new Error('Failed to fetch tool group' + response.statusText);

    return await response.json();
  },
  createTool: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool added', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding tool! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  updateTool: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool updated', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating tool! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  deleteTool: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool deleted', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting tool! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
