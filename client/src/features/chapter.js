import {createSlice} from '@reduxjs/toolkit'

export const chapterSlice = createSlice({
    name : "chapter",
    initialState : {value : {
        id : "",
        name : "",
        courseId : "",
    }},
    reducers : {
        create: (state, action)=>{
            state.value = action.payload
        },

    }
})


export const {create} = chapterSlice.actions
export default chapterSlice.reducer