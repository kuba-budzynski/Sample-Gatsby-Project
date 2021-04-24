import React from 'react';
import Link from 'gatsby-link'
import logo from '../images/logo.svg'

const Navbar = () => {
    return (
        <nav className="w-screen max-w-full bg-blueGray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between justify-items-start px-4 py-3">
                <Link to="/">
                    <div className="flex">
                        <img className="h-16 w-16" src={logo} alt="logo"></img>
                        <p className="pl-8 text-gray-50 font-bold tracking-widest text-xl lg:text-4xl my-auto uppercase font-merienda">Statyczny blog</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
