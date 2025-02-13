import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteslice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
 const[searchParams,setSearchParams]=useSearchParams()
 const pasteId=searchParams.get("pasteId")
  const[title,setTitle]=useState('');
  const[value,setValue]=useState('');
  const dispatch=useDispatch()
  const allpastes=useSelector((state)=>state.paste.pastes)

  useEffect(()=>{
    console.log("Inside useEffect Hook")
    if(pasteId){
      const paste=allpastes.find((p)=>p._id===pasteId); 
      console.log("Page found")
      setTitle(paste?.title);
      setValue(paste?.content);
    } 
  },[pasteId])

  function createPaste(){
    const paste={
        title:title,
        content:value,
        _id:pasteId || Date.now().toString(36),
        CreatedAt:new Date().toISOString(),
    };

    if(pasteId){
    dispatch(updateToPastes(paste))
    }
    else{
    dispatch(addToPastes(paste))
    }

    setTitle('');
    setValue('');
    setSearchParams({});

  }
  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
      <input className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
      type='text'
      placeholder='Enter title here'
      value={title} 
      onChange={(e)=>setTitle(e.target.value)}/>  
      <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
      </button >
    </div>
    <div className="mt-20">
      <div>
        <textarea
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        value={value} 
        placeholder='Enter Content Here'
        onChange={(e)=>setValue(e.target.value)}
        rows={10}
        />
      </div> 
    </div>
    </div>
  )
}

export default Home
