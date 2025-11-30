'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { use } from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';

const NavBar = () => {

    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' },
    ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => <Link 
                            key={link.href}
                            className={classNames(
                                {
                                    'text-zinc-900': pathname === link.href,
                                    'text-zinc-500': pathname !== link.href, 
                                    'hover:text-zinc-800 transition-colors': true
                                  })}
                            href={link.href}>{link.name}</Link>)}
      </ul>
      
    </nav>
  )
}

export default NavBar
