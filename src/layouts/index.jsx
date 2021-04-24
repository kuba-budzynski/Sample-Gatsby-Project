import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TemplateWrapper = ({ children }) => {
    return (
        <div>
            <Helmet
                title="Labs 8th"
                meta={[
                    {name: 'description', content: 'This is a simple project for Advanced Web Technologies number 8'},
                    {name: 'keywords', content: 'labs, gatsby, project'}
                ]}    
            />
            <Navbar />
            <div className="my-0 mx-auto p-0 min-h-screen h-full w-full">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default TemplateWrapper;
