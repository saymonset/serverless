import { createSlice } from '@reduxjs/toolkit';
import { DependentById } from '../../../../infrastructure/interfaces/dependentById-interface';

export interface DependentI {
    dependentById:      DependentById;
    isLoading: boolean;
    resp?:boolean;
    message?: string;
  }

  const initialState: DependentI= {
    dependentById: {},
    isLoading: false,
    resp:false,
    message: '',
  };

export const dependentByIdSlice = createSlice({
    name: 'dependentByIdStore',
    initialState,
    reducers: {
        startLoadingStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
        stopLoadingStore: (state, /* action */ ) => {
            state.isLoading = false;
        },
        dependentByIdStore: (state, { payload } ) => {
            state.dependentById = payload.dependentById;
            state.message = payload.message;
            state.resp = payload.resp;
        },
        
       addErrorStore: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
                state.resp = false;
        },
        removeErrorStore: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
            state.resp = false;
            state.isLoading = false;
        } 
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingStore,  stopLoadingStore,
    dependentByIdStore, addErrorStore, removeErrorStore,
     } = dependentByIdSlice.actions;