import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { genderSlice } from './slices/gender'
import { loginSlice } from './slices/login'
import { registerSlice } from './slices/register'
import { relationShipSlice } from './slices/relationShip'
import { sendSmsSlice } from './slices/sendSms'
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    loginStore: loginSlice.reducer,
    sendSmsStore: sendSmsSlice.reducer,
    genderStore: genderSlice.reducer,
    relationShipStore: relationShipSlice.reducer,
    registerStore: registerSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
