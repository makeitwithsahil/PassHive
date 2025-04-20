import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white justify-between md:px-24 px-8 flex items-center h-14'>
      <div className='sm:text-[22px] text-[17px] font-bold'>PassHive</div>
      <div>
        <a href="https://github.com/sahilmaurya-glitchy/PassHive" target='_blank' rel='noopener noreferrer' className='flex sm:text-[16px] text-[14px] sm:gap-2 gap-0.5 items-center '>
          <lord-icon className="sm:h-10 h-6"
            src="https://cdn.lordicon.com/ioihllwu.json"
            trigger="hover"
            colors="primary:#314158,secondary:#ffffff">
          </lord-icon>
          Github</a>
      </div>
    </nav>
  )
}

export default Navbar
