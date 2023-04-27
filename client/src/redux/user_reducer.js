import { createSlice, createSelector } from "@reduxjs/toolkit"

export const userReducer = createSlice({
    name: 'user',
    initialState : {
        userId : null,
        username : null,
        password : null,
        type : null,
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        setUsername : (state, action) => {
            state.username = action.payload
        },
        setType : (state, action) => {
            state.type = action.payload
        }
    }
})

export const { setUserId, setUsername, setType } = userReducer.actions;

export default userReducer.reducer;