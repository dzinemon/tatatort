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
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleMissClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMissClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])


  

  if (!open) return null
  return ReactDom.createPortal(
    <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop, show/hide based on modal state. */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div ref={modalRef} className="relative transform overflow-hidden rounded-xl bg-white text-left flex-col flex shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
            
            <div className="flex items-center justify-center relative bg-neutral-100">
              {children}
              
              {/* Desktop Navigation Buttons (Overlay) */}
              <div className="absolute inset-x-0 inset-y-0 hidden sm:block">
                <div className="flex flex-row justify-between h-full">
                  <button 
                    onClick={setPrev}
                    title="Previous"
                    type="button" 
                    className="group w-24 h-full flex items-center justify-start pl-4 focus:outline-none"
                  >
                    <span className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-all opacity-75 hover:opacity-100 ring-1 ring-white/20">
                      <ChevronLeftIcon className="w-8 h-8 text-white drop-shadow-md" />
                    </span>
                  </button>
                
                  <button 
                    onClick={setNext}
                    title="Next"
                    type="button" 
                    className="group w-24 h-full flex items-center justify-end pr-4 focus:outline-none"
                  >
                   <span className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-all opacity-75 hover:opacity-100 ring-1 ring-white/20">
                      <ChevronRightIcon className="w-8 h-8 text-white drop-shadow-md" />  
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Controls & Close Button */}
            <div className="bg-white flex items-center justify-between sm:justify-end  border-t border-neutral-100">
              
              {/* Mobile Navigation */}
              <div className="flex sm:hidden gap-3 w-full sm:px-6 px-4 py-4">
                 <button 
                  onClick={setPrev}
                  type="button" 
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-neutral-50 px-3 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-neutral-100 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-neutral-500 mr-1" />
                  Назад
                </button>
                <button 
                  onClick={setNext}
                  type="button" 
                  className="flex-1 inline-flex justify-center items-center rounded-lg bg-neutral-50 px-3 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-neutral-100 transition-colors"
                >
                  Далі
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500 ml-1" />  
                </button>
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="absolute font-poiret top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all z-20 bg-white/80 backdrop-blur-sm sm:bg-transparent"
                title="Close"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}