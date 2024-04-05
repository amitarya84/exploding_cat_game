import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export type user = {
    _id: string,
    username: string,
}

interface InitialState {
    user: user | null
}

const initialState: InitialState = {
    user: null
}


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, payload: PayloadAction<user>) => {
            state.user = payload.payload;
        }
    }
})


export default UserSlice.reducer;
export const { setUser } = UserSlice.actions;