import userService from '../services/user';

const userReducer = (state = [], action) => {
    console.log('userReducer', action)
    switch (action.type) {
        case 'ALL_USERS':
            return action.data
        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'ALL_USERS',
            data: users
        })
    }
}

export default userReducer