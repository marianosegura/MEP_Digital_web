const initialState = {
    userId: "",
    email: "",
    type: "notLoggedIn"
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_USER_INFO":
            return state
        case "SET_USER_INFO":
            return {
                ...state,
                userId: action.data.userId,
                email: action.data.email,
                type: action.data.type
            }
        case "LOGOUT_USER":
            return initialState
        default:
            console.log("No registred action")
            console.log(action)
            return state
    }
}

export function createAction(data,type){
    return {
        type: type,
        data: data
    }
}
export function userInfoAction(userId,email,type){
    let data = {userId, email, type}
    return createAction(data,"SET_USER_INFO")
}
export function logOutAction(){
    return createAction({},"LOGOUT_USER")
}