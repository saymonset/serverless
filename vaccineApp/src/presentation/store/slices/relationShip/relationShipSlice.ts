import { createSlice } from '@reduxjs/toolkit';
import { selectOption } from '../../../../infrastructure/interfaces/select-option';

export interface relationShipState {
    relationships:  selectOption[];
    isLoading: boolean;
  }

  const initialState: relationShipState = {
    relationships: [],
    isLoading : true
  };

export const relationShipSlice = createSlice({
    name: 'relationShipStore',
    initialState,
    reducers: {
        startRelationShipStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
        relationShipLoadStore: (state, { payload } ) => {
            state.relationships = payload.genders;
        },
        stopRelationShipStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
    }
});
// Action creators are generated for each case reducer function
export const { startRelationShipStore, relationShipLoadStore, stopRelationShipStore  } = relationShipSlice.actions;