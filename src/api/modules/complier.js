import api from '../index'
export const complieCode = (code)=>{
    return api.post('/complier/compile',{code})
}
export const getComplierErrors = ()=>{
    return api.get('/complier/errors')
}
export const resetComplier = ()=>{
    return api.post('/complier/reset')
}