import React, { useEffect, useRef } from "react";
import ReactDom from 'react-dom';
import { XMarkIcon,  ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'


export default function Modal({ setNext, setPrev, modalItem, open, children, onClose, setModalItem}) {

  const modalRef = useRef()

  useEffect(() => {
    const handleMissClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleMissClick)
    return () => {
      document.removeEventListener('mousedown', handleMissClick)
    }
  }, [onClose])


  

  if (!open) return null
  return ReactDom.createPortal(
    <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white text-left flex-col flex shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
          
          <div className="flex items-center justify-center relative">
            {children}
            <div className="absolute inset-x-0 inset-y-16">
              <div className="flex flex-row justify-between h-full">
                
                  <button 
                    onClick={setPrev}
                    
                    title="Prevoius"
                    type="button" className="bg-white opacity-0 w-1/2 h-full">
                    <ChevronLeftIcon className="w-5 h-5 hover:text-yellow-900 text-red-600" />  
                  </button>
                
                
                  <button 
                    onClick={setNext}
                    title="Next"
                    type="button" className="bg-white opacity-0 w-1/2 h-full">
                    <ChevronRightIcon className="w-5 h-5 hover:text-yellow-900 text-red-600" />  
                  </button>
                
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-center sm:px-6">
            
          
            <button onClick={onClose} className="absolute rounded-full p-1 backdrop-blur-sm bg-white/40 top-5 right-5">
              <XMarkIcon className="w-7 h-7 hover:text-yellow-900 text-red-600" />
            </button>
            <button 
              onClick={setPrev}
              
              type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
              <ChevronLeftIcon className="w-5 h-5 hover:text-yellow-900 text-red-600" />  
            </button>
            <button 
              onClick={setNext}
              type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
              <ChevronRightIcon className="w-5 h-5 hover:text-yellow-900 text-red-600" />  
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>,
    document.getElementById('portal')
  )
}