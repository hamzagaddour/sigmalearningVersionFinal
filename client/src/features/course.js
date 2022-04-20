import {createSlice} from '@reduxjs/toolkit'

export const courseSlice = createSlice({
    name : "course",
    initialState : {value : {
        id : "",
        name :"",
        image :"",
        description : "",
        duration :"",
    }},
    reducers : {
        create: (state, action)=>{
            state.value = action.payload
        },

    }
})


export const {create} = courseSlice.actions
export default courseSlice.reducer