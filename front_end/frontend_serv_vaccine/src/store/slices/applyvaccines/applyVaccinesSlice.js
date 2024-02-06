import { createSlice } from '@reduxjs/toolkit';
import {  ApplyVaccine, LIMITE_PAGE } from '../../../interfaces';
 
 
// {
//     name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth: new Date(), gender_id:'', status:true
//  }
  const initialState: ApplyVaccine = {
    _id:'',
    dependent_id:     '',
    dependent: {},
    dosis:         {},
    image:            '',
    lote:             '',
    vaccination_date: '',
    

    status:true,
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
    tableData: [],
    vaccineuniqueFromTableData: [],
    dosisFilterbyVaccineIdFromTableData: [],
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
        startLoadingApplyVaccine: (state, /* action */ ) => {
            state.isLoading = true;
            state.resp = false;
        },
        stopLoadingApplyVaccine: (state, /* action */ ) => {
            state.isLoading = false;
        },
        setDependentById: ( state, { payload } ) => {
            state.dependent_id = payload;
        },
        setDependent: ( state, { payload } ) => {
            state.dependent = payload;
        },
        
        responseApplyVaccine: ( state, { payload } ) => {
            state.statusCode = payload.statusCode;
            state.resp = payload.resp;
            state.message = payload.message;
            state.isLoading = false;
            state.tableData = payload.tableData;
            state.total = payload.total;
        },
        byIdApplyVaccine: ( state, { payload } ) => {
            state._id = payload._id
            state.dependent_id = payload.dependent_id;
            state.dosis = payload.dosis;
            state.image = payload.image;
            state.lote = payload.lote;
            state.vaccination_date = payload.vaccination_date;
        },
        deleteApplyVaccine: ( state, { payload } ) => {
            state._id = '';
            state.dependent_id =     '';
            state.dosis =         {};
            state.image =            '';
            state.lote =             '';
            state.vaccination_date = '';
            state.message = payload
            state.isLoading = false;
            state.isDelete = true;
            state.tableData = payload.tableData;
            state.total = state.total - 1;
            state.dependent  = {}
        },
        clearApplyVaccine: ( state ) => {
            state._id = '';
            state.dependent_id =     '';
            state.dosis =         {};
            state.image =            '';
            state.lote =             '';
            state.vaccination_date = '';
            state.message = '';
            state.isLoading = false;
            state.isDelete = false;
            state.dependent  = {}
            
        },
        loadDataApplyVaccine: ( state, { payload } ) => {
            state.tableData = payload.tableData;
            state.vaccineuniqueFromTableData = payload.vaccineuniqueFromTableData
            state.dosisFilterbyVaccineIdFromTableData = [];
            state.isConsultVaccineForDosis = false;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.currentPage = payload.currentPage;
        },
        loadbyDosisOff: ( state, { payload } ) => {
            state.isConsultVaccineForDosis = false;
        },
        loadbyDosis: ( state, { payload } ) => {
            state.isConsultVaccineForDosis = true;
        },
        loadDosisFilterbyVaccineId: ( state, { payload } ) => {
            state.dosisFilterbyVaccineIdFromTableData = payload.dosisFilterbyVaccineIdFromTableData;
        },
        
       addMessageApplyVaccine: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
        },
        removeMessageApplyVaccine: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
            state.isDelete = false;
           
        },
        onIsConsultVaccine: (state, { payload }) => {
            state.isConsultVaccine = true;
            state.isAddApplyVaccine    = false;
        },
        onIsAddApplyVaccine: (state, { payload }) => {
            state.isConsultVaccine   = false;
            state.isAddApplyVaccine  = true;
        },
        onIsOffVaccine: (state, { payload }) => {
            state.isConsultVaccine = false;
            state.isAddApplyVaccine    = false;
        }
    }
});
// Action creators are generated for each case reducer function
export const {  startLoadingApplyVaccine,
                stopLoadingApplyVaccine,
                setDependentById,
                setDependent,
                responseApplyVaccine,
                byIdApplyVaccine,
                deleteApplyVaccine,
                clearApplyVaccine,
                loadDataApplyVaccine,
                loadDosisFilterbyVaccineId,
                addMessageApplyVaccine,
                removeMessageApplyVaccine,
                onIsConsultVaccine,
                onIsAddApplyVaccine,
                onIsOffVaccine,
                loadbyDosisOff,
                loadbyDosis
            } = applyVaccineSlice.actions;