import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import logo from '../resources/grocery.jpeg';
import { categories } from '../data/categories';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Grocery store</span>
            <img className="h-8 w-auto" src={logo} alt="Grocery store logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          <div className="flex items-center gap-x-1">
            <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">
              Products
            </Link>
            <Popover className="relative">
              <Popover.Button className="flex items-center text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open product categories</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {categories.map((item) => (
                      <Link
                        to={`/products/${item.slug}`}
                        key={item.slug}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <img src={item.icon} alt="" className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <div className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </div>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
          <Link to="/cart" className="text-sm font-semibold leading-6 text-gray-900">
            Cart
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={closeMobileMenu}>
              <span className="sr-only">Grocery store</span>
              <img className="h-8 w-auto" src={logo} alt="Grocery store logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/products"
                  onClick={closeMobileMenu}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Products
                </Link>
                {categories.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/products/${item.slug}`}
                    onClick={closeMobileMenu}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
