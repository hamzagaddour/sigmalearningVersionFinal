import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "user",
    initialState : {value : {
        firstName :"",
        lastName :"",
        email : "",
        password :"",
        logged : false,
        admin: false,
        teacher: false,
    }},
    reducers : {
        login : (state, action)=>{

            state.value = action.payload
        },
        register : (state, action)=>{
            state.value = action.payload
        },
        logout : (state, action)=>{
            state.value = action.payload
        } 
    }
})


export const {login, register,logout} = userSlice.actions
export default userSlice.reducer