import React from 'react';

import Header from './Header';
// import Sidebar from './Sidebar';
import Offsidebar from './Offsidebar';
import Footer from './Footer';

const Base: React.FC = ({ children }) => (
    <div className="wrapper">
        <Header />

        {/*<Sidebar />*/}

        <Offsidebar />

        <section className="section-container">
            {children}
        </section>

        <Footer />
    </div>
);

export default Base;
