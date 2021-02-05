import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: "",
        display_name: "",
        bio: "",
        exhibitions: []
    },
    reducers: {
        setId: (state,action) => {
            state.id = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setDisplayName: (state, action) => {
            state.display_name = action.payload
        },
        setBio: (state, action) => {
            state.bio = action.payload
        },
        addExhibitions: (state, action) => {
            state.exhibitions.push(action.payload)
        }
    },
})

export const { setId, setUsername, setDisplayName, setBio, addExhibitions} = userSlice.actions;

export default userSlice.reducer;