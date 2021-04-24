import React from 'react';

const Footer = () => {
    return (
        <footer className="w-screen max-w-full bg-blueGray-800 text-white py-5">
            <div className="max-w-8xl mx-auto">
                <p className="w-full text-center text-lg font-light text-white tracking-widest">Laboratorium 8 <span className="text-emerald-500">@ {(new Date()).getFullYear()}</span></p>
            </div>
        </footer>
    );
}

export default Footer;
