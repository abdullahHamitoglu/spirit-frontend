import React from 'react';
import ContentLoader from 'react-content-loader';

const NavLoader = () => {
    const loader = (
        <ContentLoader
            width="950"
            height="80"
            className="nav-menu" 
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="35" rx="5" ry="5" width="150" height="30" />
            <rect x="18%" y="35" rx="5" ry="5" width="150" height="30" />
            <rect x={(18 * 2 ) + '%'} y="35" rx="5" ry="5" width="150" height="30" />
            <rect x={(18 * 3 ) + '%'} y="35" rx="5" ry="5" width="150" height="30" />
            <rect x={(18 * 4 ) + '%'} y="35" rx="5" ry="5" width="150" height="30" />
            <rect x={(18 * 5 ) + '%'} y="35" rx="5" ry="5" width="150" height="30" />
        </ContentLoader>
    );

    return loader;
};

export default NavLoader;
