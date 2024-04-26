import { createSlice } from '@reduxjs/toolkit';
import { selectOption } from '../../../../infrastructure/interfaces/select-option';

export interface genderState {
    genders:  selectOption[];
    isLoading: boolean;
  }

  const initialState: genderState = {
    genders: [],
    isLoading : true
  };

export const genderSlice = createSlice({
    name: 'genderStore',
    initialState,
    reducers: {
        startGenderStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
        genderLoadStore: (state, { payload } ) => {
            state.genders = payload.genders;
        },
        stopGenderStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
    }
});
// Action creators are generated for each case reducer function
export const { genderLoadStore, startGenderStore, stopGenderStore  } = genderSlice.actions;