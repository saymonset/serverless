import { createSlice } from '@reduxjs/toolkit';
import {  Dependent } from '../../../interfaces/dependent-interfaces';
 
 
// {
//     name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth: new Date(), gender_id:'', status:true
//  }
  const initialState: Dependent = {
    _id:'',
    name :'',
    lastname :'',
    isUser: false,
    email:'',
    phone:'',
    gender_id:'',
    birth:null,
    user_id:'',
    relationship_id:'',
    status:true,
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
    tableData: [],
    desde:      0,
    limite:     2,
    total:      0,
    currentPage:0,
    isDelete: false,
    edit: false

  };

export const dependentSlice = createSlice({
    name: 'dependentStore',
    initialState,
    reducers: {
        startLoadingDependent: (state, /* action */ ) => {
            state.isLoading = true;
            state.resp = false;
        },
        setDependentResponse: ( state, { payload } ) => {
            state.statusCode = payload.statusCode;
            state.resp = payload.resp;
            state.message = payload.message;
            state.isLoading = false;
        },
        setDependentById: ( state, { payload } ) => {
            state._id = payload._id
            state.name = payload.name;
            state.lastname = payload.lastname;
            state.phone = payload.phone;
            state.email = payload.email;
            state.birth = payload.birth;
            state.gender_id = payload.gender_id;
            state.edit  = true
            state.relationship_id = payload.relationship_id;
        },
        setDependentDelete: ( state, { payload } ) => {
            state.name = '';
            state.lastname = '';
            state.phone = '';
            state.email = '';
            state.birth = '';
            state.gender_id ='';
            state.relationship_id = '';
            state.message = payload
            state.isLoading = false;
            state.isDelete = true;
            
        },
        loadDataDependent: ( state, { payload } ) => {
            state.tableData = payload.dependents;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.currentPage = payload.currentPage;
        },
       addMessage: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload
        },
        removeMessage: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
            state.isDelete = false;
           
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingDependent, setDependentResponse, 
               addMessage, removeMessage, loadDataDependent, setDependentById,
               setDependentDelete } = dependentSlice.actions;