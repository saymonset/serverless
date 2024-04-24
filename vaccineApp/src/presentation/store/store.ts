import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { loginSlice } from './slices/login'
import { sendSmsSlice } from './slices/sendSms'
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    loginStore: loginSlice.reducer,
    sendSmsStore: sendSmsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
