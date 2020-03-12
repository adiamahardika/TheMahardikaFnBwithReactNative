const initialState = {
    categories: []
}

const category = (state = initialState, action) => {
   switch(action.type){
       case 'GET_CATEGORY_PENDING':
           return{
               ...state
           }
        case 'GET_CATEGORY_REJECTED':
            return{
                ...state
            }
        case 'GET_CATEGORY_FULFILLED':
            return{
                ...state,
                categories: action.payload.data.result
            }

        case 'POST_CATEGORY_PENDING':
            return{
                ...state
            }

        case 'POST_CATEGORY_REJECTED':
            return{
                ...state
            }
        
        case 'POST_CATEGORY_FULFILLED':
            const newDataCategory = [...state.categories, action.payload.data.result];
            return{
                ...state,
                categories: newDataCategory
            }
        case 'PATCH_CATEGORY_PENDING':
            return{
                ...state
            }

        case 'PATCH_CATEGORY_REJECTED':
            return{
                ...state
            }
        
        case 'PATCH_CATEGORY_FULFILLED':
            const newCategoryAfterUpdate = state.categories.map(category => {
                if (category.id === action.payload.data.result.id) {
                    return action.payload.data.result;
                }
                return category;
            })
            return {
                ...state,
                categories: newCategoryAfterUpdate
            }
        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state
            }
        case 'DELETE_CATEGORY_REJECTED':
            return {
                ...state
            }
        case 'DELETE_CATEGORY_FULFILLED':
            const newCategoryAfterDelete = state.categories.filter(category => category.id !== action.payload.data.result)
            return {
                ...state,
                categories: newCategoryAfterDelete
            }
        default:
            return state;
   }
}

export default category;