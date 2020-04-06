const initialState = {
    products: []
}

const products = (state = initialState, action) => {
   switch(action.type){
        case 'GET_PRODUCT_PENDING':
            return{
                ...state
                
            }
            case 'GET_PRODUCT_REJECTED':
            return{
                ...state
                
            }
        case 'GET_PRODUCT_FULFILLED':
            return{
                ...state,
                
                products: action.payload.data.result
            }
        case 'POST_PRODUCT_PENDING':
            return{
                ...state
                
            }

        case 'POST_PRODUCT_REJECTED':
            return{
                ...state
                
            }
        case 'POST_PRODUCT_FULFILLED':
            return{
                ...state,
                
                products: action.payload.data.result
            }
        case 'DELETE_PRODUCT_PENDING':
            return{
                ...state
                
            }
        case 'DELETE_PRODUCT_REJECTED':
            return{
                ...state
                
            }
        case 'DELETE_PRODUCT_FULFILLED':
            return{
                ...state,
                
                products: action.payload.data.result
            }
        case 'SEARCH_PRODUCT_PENDING':
            return {
                ...state
                
            }
        case 'SEARCH_PRODUCT_REJECTED':
            return {
                ...state
                
            }
        case 'SEARCH_PRODUCT_FULFILLED':
            return {
                ...state,
                
                products: action.payload.data.result
            }
        case 'FILTER_PRODUCT_PENDING':
            return {
                ...state
                
            }
        case 'FILTER_PRODUCT_REJECTED':
            return {
                ...state
                
            }
        case 'FILTER_PRODUCT_FULFILLED':
            return {
                ...state,
                
                products: action.payload.data.result
            }
        case 'SORT_PRODUCT_PENDING':
            return {
                ...state
                
            }
        case 'SORT_PRODUCT_REJECTED':
            return {
                ...state
                
            }
        case 'SORT_PRODUCT_FULFILLED':
            return {
                ...state,
                
                products: action.payload.data.result
            }
        case 'PATCH_PRODUCT_PENDING':
            return {
                ...state
                
            }

        case 'PATCH_PRODUCT_REJECTED':
            return {
                ...state
                
            }

        case 'PATCH_PRODUCT_FULFILLED':
            return {
                ...state,
                products: action.payload.data.result
            }
        case 'MODIFY_PRODUCT_PENDING':
            return {
                ...state
                
            }
        case 'MODIFY_PRODUCT_REJECTED':
            return {
                ...state
                
            }
        case 'MODIFY_PRODUCT_FULFILLED':
            return {
                ...state,
                
                products: action.payload.data.result,
                pagination: action.payload.data.totalPages
            }
        default:
            return state;
   }
}

export default products;