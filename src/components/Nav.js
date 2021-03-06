import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline'
import { NavLink } from "react-router-dom";

function Nav({user, doLogout, doLogin}) {

const navigation = [
    { name: 'Preguntar', to: '/preguntar', current: false },
    { name: 'Preguntas Respondidas', to: '/respuestas', current: false },
    { name: '¿Como funciona esto?', to: '/faq', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const handleCurrent = (name) => {
      navigation.map( item => item.name === name ? item.current = true : item.current = false )
  }

    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Abrir menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <a href="https://elcoritohistorico.com">
                        <img
                          className="block lg:hidden h-8 w-auto"
                          src="https://elcoritohistorico.com/wp-content/uploads/2020/07/cropped-ici.png"
                          alt="Logo"
                        />
                        <img
                          className="hidden lg:block h-8 w-auto"
                          src="https://elcoritohistorico.com/wp-content/uploads/2020/07/cropped-ici.png"
                          alt="Logo"
                        />
                      </a>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                            
                          <NavLink
                            onClick={() => handleCurrent(item.name)}
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) => isActive ? 
                            'bg-gray-700 text-white border-2 block px-3 py-2 rounded-md text-base font-medium' 
                            : 
                            'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                            }
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Abrir menu usuario</span>
                              { !!user ? <img
                                className="h-8 w-8 rounded-full"
                                src={user.photoURL}
                                alt="foto usuario"
                              />:
                              <UserIcon className="block h-6 w-6 text-white" aria-hidden="true" />}
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                    <button
                                    onClick={()=> {!!user ? doLogout() : doLogin()}}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'text-left w-full px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {!!user ? 'Desloguear' : 'Loguear' }
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
    
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) => isActive ? 
                      'bg-gray-700 text-white border-2 block px-3 py-2 rounded-md text-base font-medium' 
                      : 
                      'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                      }
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )
}

export default Nav
