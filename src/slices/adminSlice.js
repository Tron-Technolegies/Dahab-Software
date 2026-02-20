import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPopup: false,
  dataId: "",
  refetchTrigger: false,
  search: "",
  farm: "",
  currentPage: 1,
  limit: 20,
  sortData: "new",
  sats: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setShowPopupTrue: (state) => {
      state.showPopup = true;
    },
    setShowPopupFalse: (state) => {
      state.showPopup = false;
    },
    setDataId: (state, { payload }) => {
      state.dataId = payload;
    },
    setRefetchTrigger: (state) => {
      state.refetchTrigger = !state.refetchTrigger;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setFarm: (state, { payload }) => {
      state.farm = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setLimit: (state, { payload }) => {
      state.limit = payload;
    },
    setSortData: (state, { payload }) => {
      state.sortData = payload;
    },
    setSats: (state, { payload }) => {
      state.sats = payload;
    },
  },
});

export default adminSlice.reducer;
export const {
  setDataId,
  setShowPopupFalse,
  setShowPopupTrue,
  setRefetchTrigger,
  setFarm,
  setSearch,
  setCurrentPage,
  setLimit,
  setSortData,
  setSats,
} = adminSlice.actions;
