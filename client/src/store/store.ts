import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { GameSlice } from "./features/gameSlice";
import { UserSlice } from "./features/userSlice";

export const store = configureStore({
    reducer: {
        game: GameSlice.reducer,
        user: UserSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()