import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteslice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const {id} =useParams();
  const allpastes=useSelector((state)=>state.paste.pastes)
  const paste=allpastes.filter((p)=>p._id===id)[0]
  console.log("Final paste", paste)

  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
      <input className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
      type='text'
      placeholder='Enter title here'
      value={paste.title} 
      disabled
      onChange={(e)=>setTitle(e.target.value)}
      />  
      {/* <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
      </button > */}
    </div>
    <div className='mt-8'>
        <textarea
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        value={paste.content} 
        placeholder='Enter Content Here'
        onChange={(e)=>setValue(e.target.value)}
        disabled
        rows={10}
        />
      </div> 
    </div>
  )
}

export default ViewPaste
