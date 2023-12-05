import React from 'react';
import ContentLoader from 'react-content-loader';

const MenuLoader = () => {
    const loader = (
        <ContentLoader
            width="100%"
            height="100%"
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="10%" y="20" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="80" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="140" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="200" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="260" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="320" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="380" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="440" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="500" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="560" rx="0" ry="0" width="80%" height="40" />
            <rect x="10%" y="620" rx="0" ry="0" width="80%" height="40" />
        </ContentLoader>
    );

    return loader;
};

export default MenuLoader;
