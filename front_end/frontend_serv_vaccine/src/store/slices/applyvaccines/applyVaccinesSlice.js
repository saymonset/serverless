import { createSlice } from '@reduxjs/toolkit';
import {  ApplyVaccine, LIMITE_PAGE } from '../../../interfaces';
 
 
// {
//     name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth: new Date(), gender_id:'', status:true
//  }
  const initialState: ApplyVaccine = {
    _id:'',
    dependent_id:     '',
    dosis_id:         '',
    image:            '',
    lote:             '',
    vaccination_date: '',
    

    status:true,
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
    tableData: [],
    desde:      0,
    limite:     LIMITE_PAGE,
    total:      0,
    currentPage:0,
    isDelete: false,
    isEdit: false

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
            state.isEdit = true;
        },
        editFalseApplyVaccine: (state, /* action */ ) => {
            state.isEdit = false;
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
            state.dosis_id = payload.dosis_id;
            state.image = payload.image;
            state.lote = payload.lote;
            state.vaccination_date = payload.vaccination_date;
            state.isEdit = true;
        },
        deleteApplyVaccine: ( state, { payload } ) => {
            state._id = '';
            state.dependent_id =     '';
            state.dosis_id =         '';
            state.image =            '';
            state.lote =             '';
            state.vaccination_date = '';
            state.message = payload
            state.isLoading = false;
            state.isDelete = true;
            state.tableData = payload.tableData;
            state.total = state.total - 1;
        },
        clearApplyVaccine: ( state ) => {
            state._id = '';
            state.dependent_id =     '';
            state.dosis_id =         '';
            state.image =            '';
            state.lote =             '';
            state.vaccination_date = '';
            state.message = '';
            state.isLoading = false;
            state.isDelete = false;
            
        },
        loadDataApplyVaccine: ( state, { payload } ) => {
            state.tableData = payload.tableData;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            console.log('antes state='+state.currentPage)
            state.currentPage = payload.currentPage;
            //onsole.log('despues'+payload.currentPage)
            console.log('despues state='+state.currentPage)
            console.log(' desde pyload slice core' )
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
    }
});
// Action creators are generated for each case reducer function
export const {  startLoadingApplyVaccine,
                stopLoadingApplyVaccine,
                setDependentById,
                editFalseApplyVaccine,
                responseApplyVaccine,
                byIdApplyVaccine,
                deleteApplyVaccine,
                clearApplyVaccine,
                loadDataApplyVaccine,
                addMessageApplyVaccine,
                removeMessageApplyVaccine} = applyVaccineSlice.actions;