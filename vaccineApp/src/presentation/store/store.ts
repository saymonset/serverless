import { configureStore } from '@reduxjs/toolkit'
import { applyVaccineSlice } from './slices/applyvaccines'
import { consultVaccineSlice } from './slices/consultvaccines'
import { counterSlice } from './slices/counter'
import { dependentByIdSlice } from './slices/dependent'
import { genderSlice } from './slices/gender'
import { loginSlice } from './slices/login'
import { registerSlice } from './slices/register'
import { relationShipSlice } from './slices/relationShip'
import { sendSmsSlice } from './slices/sendSms'
import { vaccineSlice } from './slices/vaccines'
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    loginStore: loginSlice.reducer,
    sendSmsStore: sendSmsSlice.reducer,
    genderStore: genderSlice.reducer,
    relationShipStore: relationShipSlice.reducer,
    registerStore: registerSlice.reducer,
    dependentByIdStore: dependentByIdSlice.reducer,
    vaccineStore: vaccineSlice.reducer,
    applyVaccineStore: applyVaccineSlice.reducer,
    consultVaccineStore: consultVaccineSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
