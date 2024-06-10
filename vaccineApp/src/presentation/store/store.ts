import { configureStore } from '@reduxjs/toolkit'
import { applyVaccineSlice } from './slices/applyvaccines'
import { consultVaccineSlice } from './slices/consultvaccines'
import { counterSlice } from './slices/counter'
import { dependentByIdSlice } from './slices/dependent'
import { dosisSlice } from './slices/dosis'
import { genderSlice } from './slices/gender'
import { loginSlice } from './slices/login'
import { parentescoSlice } from './slices/parentescos'
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
    parentescoStore: parentescoSlice.reducer,
    applyVaccineStore: applyVaccineSlice.reducer,
    consultVaccineStore: consultVaccineSlice.reducer,
    dosisStore: dosisSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
