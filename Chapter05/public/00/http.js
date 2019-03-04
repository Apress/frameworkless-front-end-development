const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach(entry => {
    const [
      name,
      value
    ] = entry

    xhr.setRequestHeader(
      name,
      value
    )
  })
}

const parseResponse = xhr => {
  const {
    status,
    responseText
  } = xhr

  let data
  try {
    data = JSON.parse(responseText)
  } catch (error) {
    data = responseText
  }

  return {
    status,
    data
  }
}

const request = params => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  const {
    method = 'GET',
    url,
    headers = {},
    body
  } = params

  xhr.open(method, url)

  setHeaders(xhr, headers)

  xhr.send(JSON.stringify(body))

  xhr.onerror = () => reject(new Error('HTTP Error'))
  xhr.ontimeout = () => reject(new Error('Timeout Error'))

  xhr.onload = () => resolve(parseResponse(xhr))
})

const get = (url, headers) => {
  return request({
    url,
    headers,
    method: 'GET'
  }).then(r => r.data)
}

const post = (url, body, headers) => {
  return request({
    url,
    headers,
    method: 'POST',
    body
  }).then(r => r.data)
}

const put = (url, body, headers) => {
  return request({
    url,
    headers,
    method: 'PUT',
    body
  }).then(r => r.data)
}

const patch = (url, body, headers) => {
  return request({
    url,
    headers,
    method: 'PATCH',
    body
  }).then(r => r.data)
}

const deleteRequest = (url, headers) => {
  console.log('DELETE')
  return request({
    url,
    headers,
    method: 'DELETE'
  }).then(r => r.data)
}

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest
}
