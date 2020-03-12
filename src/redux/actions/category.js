import axios from 'axios';
import {REACT_APP_API} from 'react-native-dotenv'

export const getAllCategory = () => {
    return{
        type: 'GET_CATEGORY',
        payload: axios({
            method: "GET",
            url: `${REACT_APP_API}/category`
        })
    }
}

export const postCategory = (data) => {
    return{
        type: 'POST_CATEGORY',
        payload: axios({
            method: "POST",
            url: `${REACT_APP_API}/category`,
            data: data
        })
    }
}

export const patchCategory = (data, categoryId) => {
    return{
        type: 'PATCH_CATEGORY',
        payload: axios({
            method: "PATCH",
            url: `${REACT_APP_API}/category/${categoryId}`,
            data: data
        })
    }
}

export const deleteCategory = ( categoryId) => {
    return{
        type: 'DELETE_CATEGORY',
        payload: axios({
            method: "DELETE",
            url: `${REACT_APP_API}/category/${categoryId}`
        })
    }
}