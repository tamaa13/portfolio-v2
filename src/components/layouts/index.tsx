import React from 'react';
import Navbar from '../molecules/Navbar';

type LayoutsProps = {
    children: React.ReactNode;
};

const Layouts: React.FC<LayoutsProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layouts;