// GET REQUEST
function getTodos() {
  axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// POST REQUEST
function addTodo() {
  const newTodo = {
    title: 'New Todo',
    completed: false,
  };

  axios
    .post('https://jsonplaceholder.typicode.com/todos', newTodo)
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  const updatedTodo = {
    title: 'Updated Todo',
    completed: true,
  };

  axios
    .put('https://jsonplaceholder.typicode.com/todos/1', updatedTodo)
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    ])
    .then(
      axios.spread((todos, posts) => {
        console.log('Todos:', todos.data);
        console.log('Posts:', posts.data);
      })
    )
    .catch((error) => {
      console.error(error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer yourAccessToken',
    },
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'Custom Headers Todo',
        completed: false,
      },
      config
    )
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    transformResponse: (data) => {
      // Transform the response data here
      return JSON.parse(data);
    },
  };

  axios
    .get('https://jsonplaceholder.typicode.com/posts/1', options)
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/nonexistent')
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a non-2xx status code
        console.error('Error Response Data:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token,
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error(error);
      }
    });

  // Cancel the request (e.g., on button click or some condition)
  setTimeout(() => {
    source.cancel('Request canceled by the user');
  }, 2000);
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
