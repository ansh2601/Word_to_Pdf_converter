import React, { useState } from 'react';
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";


function Home() {
    const [selectedfile,setselectedfile]=useState(null)
    const [convert,setconvert]=useState('')
    const [downloadError,setdownloadError]=useState('')
    const handlefilechange=(e)=>{
       // console.log(e.target.files[0])
        setselectedfile(e.target.files[0])
    }
    const handlesubmit=async(event)=>{
      event.preventDefault()
      if(!selectedfile){
        setconvert('please select file')
        return
      }
      const formdata=new FormData()
      formdata.append('file',selectedfile)
      try {
        const response=await axios.post("http://localhost:3000/convertfile",formdata,{
         responseType:'blob'
        })
        const url=window.URL.createObjectURL(new Blob([response.data]))
        const link=document.createElement('a')
        link.href=url
        link.setAttribute('download', selectedfile.name.replace(/\.[^/.]+$/,"")+".pdf")
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
        setselectedfile(null)
        setdownloadError('')
        setconvert('file converted successfully')
      } catch (error) {
        consolelog('error')
        if(error.response && error.response.status==400){
        setdownloadError('error occured',error.response.data.message)}
        else{
            setconvert('')
        }
       
      }
    }
  return (
   <>
   <div className='max-w-screen-2xl mx-auto container px-6 py-3 mid:px-40'>
    <div className='flex h-screen items-center justify-center'>
        <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg'>
            <h1 className='text-3xl font-bold text-center mb-4'>CONVERT WORD TO PDF</h1>
            <p className='text-sm text-center mb-5'>it is fastest and easy to convert your word file to pdf</p>
       
        <div className='flex flex-col items-center space-y-4'>
            <input type="file" accept='.doc,.docx' className='hidden' id='fileInput' onChange={handlefilechange} />
            <label htmlFor="fileInput" className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300  hover:text-white'>
            <FaFileWord className='text-3xl mr-3'/><span className='text-3xl mr-2'>{selectedfile?selectedfile.name:'choose file'}</span>
           </label>
            <button 
            onClick={handlesubmit}
            disabled={!selectedfile} className='text-white bg-blue-500 hover:bg-blue-700 duration-300 disabled:bg-gray-400 disabled:pointer-events-none font-bold px-4 py-2 rounded-lg'>convert file</button>
            {convert && (<div className='text-green-500 text-center'>{convert}</div> ) }
            {downloadError && (<div className='text-red-500 text-center'>{downloadError}</div> ) }
        </div>
        </div> 
    </div>
   </div>
   </>
  )
}

export default Home