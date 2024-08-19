import { configureStore } from "@reduxjs/toolkit";
import createReducer from "@src/redux/Slice/createSlice";

const store = configureStore({
    reducer: {
        create: createReducer,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
