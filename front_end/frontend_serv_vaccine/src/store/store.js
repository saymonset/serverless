import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { todosApi } from './apis'
import { loginSlice } from './slices/login'
import { sendSmsSlice } from './slices/sendSms'
import { registerSlice } from './slices/register'
import { dependentSlice } from './slices/dependent'
import { applyVaccineSlice } from './slices/applyvaccines'
import { vaccineSlice } from './slices/vaccines'
import { useAuthSlice } from './slices/auth'
export const store = configureStore({
  reducer: {
    useAuthStore: useAuthSlice.reducer,
    vaccineStore: vaccineSlice.reducer,
    applyVaccineStore: applyVaccineSlice.reducer,
    loginStore: loginSlice.reducer,
    sendSmsStore: sendSmsSlice.reducer,
    registerStore: registerSlice.reducer,
     dependentStore: dependentSlice.reducer,
    [todosApi.reducerPath]: todosApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(todosApi.middleware)
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch