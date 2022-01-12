let timeout;

const notificatonReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTI':
            return action.data.noti
        case 'HIDE_NOTI':
            return null
        default:
            return state
    }
}


export const noti = (noti, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTI',
            data: {
                noti
            }
        })
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTI'
            })
        }, time)
    }
}

export const hide = () => {
    return {
        type: 'HIDE_NOTI',
    }
}

export default notificatonReducer