import { createSlice } from '@reduxjs/toolkit';
import {  Dependent, LIMITE_PAGE } from '../../../interfaces';
 
 
// {
//     name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth: new Date(), gender_id:'', status:true
//  }
  const initialState: Dependent = {
    _id:'',
    age:0,
    name :'',
    lastname :'',
    isChildren: false,
    isUser: false,
    email:'',
    phone:'',
    gender_id:'',
    city:'',
    state:'',
    birth:null,
    user_id:'',
    relationship_id:'',
    status:true,
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
    tableData: [],
    dependentsResume:[],
    desde:      0,
    limite:     LIMITE_PAGE,
    total:      0,
    currentPage:0,
    isDelete: false,
    isEdit: false

  };



export const dependentSlice = createSlice({
    name: 'dependentStore',
    initialState,
    reducers: {
        startLoadingDependent: (state, /* action */ ) => {
            state.isLoading = true;
            state.resp = false;
        },
        stopLoadingDependent: (state, /* action */ ) => {
            state.isLoading = false;
        },
        editFalseDependent: (state, /* action */ ) => {
            state.isEdit = false;
        },
        setDependentResponse: ( state, { payload } ) => {
            state.statusCode = payload.statusCode;
            state.resp = payload.resp;
            state.message = payload.message;
            state.isLoading = false;
            state.dependentsResume = payload.dependentsResume;
            state.total = payload.total;
        },
        setDependentById: ( state, { payload } ) => {
            state._id = payload._id
            state.name = payload.name;
            state.lastname = payload.lastname;
            state.phone = payload.phone;
            state.email = payload.email;
            state.birth = payload.birth;
            state.gender_id = payload.gender_id;
            state.relationship_id = payload.relationship_id;
            state.city = payload.city;
            state.state = payload.state;
            state.age = payload.age;
            state.isChildren = payload.isChildren;
            state.isEdit = true;
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
            state.city = '';
            state.state = '';
            state.age = '';
            state.isChildren = false;
            state._id ='';
            
        },
        clearDependent: ( state ) => {
            state.name = '';
            state.lastname = '';
            state.phone = '';
            state.email = '';
            state.birth = '';
            state.gender_id ='';
            state.relationship_id = '';
            state.message = '';
            state.isLoading = false;
            state.isDelete = true;
            state.city = '';
            state.state = '';
            state.age = '';
            state.isChildren = false;
            state._id ='';
            
        },
        loadDataDependent: ( state, { payload } ) => {
            state.tableData = payload.dependents;
            state.dependentsResume = payload.dependentsResume;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.currentPage = payload.currentPage;
        },
        deleteDataDependent: ( state, { payload } ) => {
            state.dependentsResume = payload.dependentsResume;
            state.total = state.total - 1;
        },
       addMessage: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
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
               setDependentDelete, clearDependent, stopLoadingDependent, editFalseDependent,
               deleteDataDependent } = dependentSlice.actions;