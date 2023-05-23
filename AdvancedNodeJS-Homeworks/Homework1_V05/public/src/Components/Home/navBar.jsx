import React, { useState } from 'react'

const NavBar = () => {
  let Links = [
    { name: 'HOME', link: '#' },
    { name: 'ABOUT', link: '#' },
    { name: 'LOGOUT', link: '#' },
  ]
  let [open, setOpen] = useState(false)
  return (
    <div className="fixed left-0 top-0 w-full shadow-md">
      <div className="items-center justify-between bg-white px-7 py-4 md:flex md:px-10">
        <div
          className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold 
    text-gray-800"
        >
          <span className="mr-1 pt-2 text-3xl text-indigo-600">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          Zoo
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer text-3xl md:hidden"
        >
          <ion-icon name={open ? 'close' : 'menu'}>Menu</ion-icon>
        </div>

        <ul
          className={`absolute left-0 z-[-1] w-full bg-white pb-12 pl-9 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${
            open ? 'top-20 ' : 'top-[-490px]'
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="my-7 text-xl md:my-0 md:ml-8">
              <a
                href={link.link}
                className="text-gray-800 duration-500 hover:text-gray-400"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NavBar
