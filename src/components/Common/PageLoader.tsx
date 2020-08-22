import React from 'react';

// See more loading icons here:
// https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
const PageLoader : React.FC = () => (
    <div className="page-loader">
        <em className="fas fa-circle-notch fa-spin fa-2x text-muted" />
    </div>
)

export default PageLoader;