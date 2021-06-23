import axios from 'axios'
const baseUrl = '/todo'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const update = (id, newObject) => {
  try {
    const response = axios.put(`${baseUrl}/${id}`, newObject)
    return response.then(i => i.data)
  } catch (error) {
    return null
  }
}


export default { getAll, create, update, remove }
