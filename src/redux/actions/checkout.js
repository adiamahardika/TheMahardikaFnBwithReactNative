import axios from 'axios'
import {REACT_APP_API} from 'react-native-dotenv'

export const postOrder = (data) => {
    console.log(data)
    return {
      type: 'POST_ORDER',
      payload: axios.post(`${REACT_APP_API}/order`, data)
    }
  }
  
  export const getHistory = (startDate, endDate) => {
    return {
      type : 'GET_HISTORY',
      payload:  axios.get(`${REACT_APP_API}/order/chart?start=${startDate}&end=${endDate}`)
    }
  }
  