import React from 'react';

export interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    /** add element with 'unwrap' class to expand content area */
    unwrap: Boolean;
    children: React.ReactNode;
}

/**
 * Wrapper element for template content
 */
const ContentWrapper = ({ unwrap, children }: ContentWrapperProps) => (
    <div className="content-wrapper">
        {unwrap ?
            <div className="unwrap">
                {children}
            </div>
            :
            children
        }
    </div>
);

ContentWrapper.defaultProps = {
    unwrap: false
};

export default ContentWrapper;
