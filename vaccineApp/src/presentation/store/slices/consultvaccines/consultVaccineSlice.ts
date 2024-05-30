import { createSlice } from '@reduxjs/toolkit';
import { ApplyVaccine, Dosis } from '../../../../domain/entities/ConsultByIndependentEntity';
import { LIMITE_PAGE } from '../../../../infrastructure/interfaces/constantes';

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
    applyVaccinesUniqByIds: [] as ApplyVaccine[],
    byDependentAppliedDosis: [] as Dosis[],
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
 
export const consultVaccineSlice = createSlice({
    name: 'consultVaccineStore',
    initialState,
    reducers: {
        stopConsultVaccines: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startConsultVaccines: (state, /* action */ ) => {
            state.isLoading = true;
        },
        loadDataConsultVaccine: ( state, { payload } ) => {
            state.tableData = payload.tableData;
            //Todas las vacunas aplicadas y vienen repetidas por la dosis
            state.byDependentApplyVaccines = payload.byDependentApplyVaccines;
            //Todas las vacunas aplicadas y siin repetirla
            state.applyVaccinesUniqByIds = payload.applyVaccinesUniqByIds;
            //Todas las dosis aplicadas
            state.byDependentAppliedDosis = payload.byDependentAppliedDosis;
            state.dosis = [];
            state.vaccine = {};
            state.isConsultVaccineForDosis = false;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.currentPage = payload.currentPage;
        },
        clearConsultVaccine: ( state ) => {
            state.dosis =   [];
            state.vaccine = {};
            state.dependent = {};
            state.tableData = [];
            state.byDependentApplyVaccines = [];
            state.applyVaccinesUniqByIds = [];
            state.byDependentAppliedDosis = [];
            state.dosis = [];
            state.vaccine = {};
            state.isConsultVaccineForDosis = false;
            state.isLoading = false;
            state.desde = 0;
            state.limite = 10000;
            state.total = 0;
            state.currentPage =0;
        },
    }
});
// Action creators are generated for each case reducer function
export const {   stopConsultVaccines,
                 startConsultVaccines,
                 loadDataConsultVaccine,
                 clearConsultVaccine,

            } = consultVaccineSlice.actions;