import api from './api'

const PhraseAPI = {
  getAll : async () => {
    const { data } = await api.get("/phrases?by=text")
    // console.log("get all phrases")
    // console.log(data)
    return data
  },
  save : async (payload) => {
    const { data } = await api.post("/phrases", payload)
    return data
  }
}


export default PhraseAPI