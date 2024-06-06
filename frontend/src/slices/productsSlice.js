import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    columns: ['Nome', 'Categoria', 'Informação', 'Preço', 'Data / Hora', 'Criador', 'Reposição', 'Stock'],
    filters: false,
    searchName: '',
    searchStock: '',
    searchCategory: '',
    searchUser: '',
    deleteList: [],
}

const productsSlice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetFilters: (state, action) => {
            state.filters = false;
            if (action.payload) {
                state.searchName = '';
                state.searchCategory = '';
                state.searchUser = '';
            }
        },
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        setSearchName: (state, action) => {
            state.searchName = action.payload;
        },
        setSearchStock: (state, action) => {
            state.searchStock = action.payload;
        },
        setSearchCategory: (state, action) => {
            state.searchCategory = action.payload;
        },
        setSearchUser: (state, action) => {
            state.searchUser = action.payload;
        },
        setDeleteList: (state, action) => {
            state.deleteList = action.payload;
        }
    }
})

export const { setProducts, setStatus, setError, resetFilters, setColumns, setSearchName, setSearchStock, setSearchCategory, setSearchUser, setDeleteList } = productsSlice.actions;

export default productsSlice.reducer;
