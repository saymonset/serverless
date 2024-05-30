import { createSlice } from '@reduxjs/toolkit';
import { LIMITE_PAGE } from '../../../../infrastructure/interfaces/constantes';
import { ApplyVaccine } from '../../../../infrastructure/interfaces/consult-vaccine-response';

const initialState = {
    _id:'',
    dependent_id:     '',
    dependent: {},
    image:            '',
    lote:             '',
    vaccination_date: '',
    

    status:true,
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
    tableData: [],
    byDependentApplyVaccines: [] as ApplyVaccine[],
    dosis: [],
    vaccine: {},
    desde:      0,
    limite:     LIMITE_PAGE,
    total:      0,
    currentPage:0,
    isDelete: false,
    isConsultVaccine: false,
    isConsultVaccineForDosis: false,
    isAddApplyVaccine    : false,
  };
 
export const applyVaccineSlice = createSlice({
    name: 'applyVaccineStore',
    initialState,
    reducers: {
        stopApplyVaccines: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startApplyVaccines: (state, /* action */ ) => {
            state.isLoading = true;
        },
        loadDosisFilterbyVaccineId: ( state, { payload } ) => {
            state.dosis = payload.dosis;
            state.vaccine = payload.vaccine;
            state.dependent = payload.dependent;
            state.dependent_id = payload.dependent_id;
        },
        clearApplyVaccine: ( state ) => {
            state.dosis =   [];
            state.vaccine = {};
            state.dependent = {}
        },
    }
});
// Action creators are generated for each case reducer function
export const {   startApplyVaccines,
                 stopApplyVaccines,
                 loadDosisFilterbyVaccineId,
                 clearApplyVaccine
            } = applyVaccineSlice.actions;