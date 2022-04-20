import {configureStore} from '@reduxjs/toolkit'
import courseReducer from '../features/course'
import userReducer from '../features/user'
import chapterReducer from '../features/chapter'

export const store = configureStore({
    reducer : {
        user : userReducer,
        course: courseReducer,
        chapter : chapterReducer
    }
})