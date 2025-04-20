import React from 'react'

const Footer = () => {
    return (
        <div className='flex items-center text-[16px] sm:text-xl justify-center bg-slate-700 h-12 text-white'>
            Created with
            <lord-icon
                className="sm:mx-1 h-5 sm:h-7"
                src="https://cdn.lordicon.com/dqhmanhc.json"
                trigger="morph"
                state="morph-glitter"
                colors="primary:#e83a30,secondary:#e83a30,tertiary:#e83a30,quaternary:#e83a30,quinary:#e83a30">
            </lord-icon>
            by Sahil Maurya
        </div>

    )
}

export default Footer
