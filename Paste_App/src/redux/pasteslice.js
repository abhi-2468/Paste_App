import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: JSON.parse(localStorage.getItem("pastes") || "[]")
  };

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;
      //add a check -->paste already exist wala case
      state.pastes.push(paste)
      console.log(paste)
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created Successfully")
    }, 
    updateToPastes: (state,action) => {
     const paste=action.payload;
     const index=state.pastes.findIndex((item)=>item._id===paste._id)

     if(index>=0){
      state.pastes[index]=paste;
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("paste updated")
     }
    },
    resetAllPastes: (state, action) => {
    state.pastes=[];
    localStorage.removeItem("pastes")
    toast.success("All pastes reset successfully!");
    },
    removeFromPastes:(state,action)=>{
      const pasteId=action.payload;
      console.log(pasteId)
      const index=state.pastes.findIndex((item)=>item._id===pasteId)
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted")
      }
    }, 
  },
})  

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes ,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer