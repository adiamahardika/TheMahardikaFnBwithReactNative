import axios from 'axios'
import {REACT_APP_API} from 'react-native-dotenv'

export const getAllProduct = () => {
    return{
        type: 'GET_PRODUCT',
        payload: axios({
            method: "GET",
            url: `${REACT_APP_API}/product`
        })
    }
}

export const postProduct = (data) => {
    return{
        type: 'POST_PRODUCT',
        payload: axios({
            method: "POST",
            url: `${REACT_APP_API}/product`,
            data: data,
        })
    }
}

export const deleteProduct = (productId) => {
    return{
        type: 'DELETE_PRODUCT',
        payload: axios({
            method: "DELETE",
            url: `${REACT_APP_API}/product/${productId}`,
        })
    }
}
export const searchProduct = (data) => {
    return {
        type: 'SEARCH_PRODUCT',
        payload: axios({
            method: 'GET',
            url: `${REACT_APP_API}/product/?name=${data}`
        })
    }
}

export const filterProduct = (data) => {
    console.log('filter')
    return {
        type: 'FILTER_PRODUCT',
        payload: axios({
            method: 'GET',
            url: `${REACT_APP_API}/product/?category=${data}`
        })
    }
}

export const sortProduct = (orderBy) => {
    return {
        type: 'SORT_PRODUCT',
        payload: axios({
            method: 'GET',
            url: `${REACT_APP_API}/product?sortBy=price&sortBy=${orderBy}`
        })
    }
}

export const patchProduct = (productId, data) => {
    return {
        type: 'PATCH_PRODUCT',
        payload: axios ({
          method: 'PATCH',
          url: `${REACT_APP_API}/product/${productId}`,
          data:data
        })
      }
}
export const modifyProduct = (sortBy, orderBy, name, category, page ) => {
    return {
        type: 'MODIFY_PRODUCT',
        payload: axios ({
          method: 'GET',
          url: `${REACT_APP_API}/product/?sortBy=${sortBy}&orderBy=${orderBy}&name=${name}&category=${category}&page=${page}`,
        })
      }
}