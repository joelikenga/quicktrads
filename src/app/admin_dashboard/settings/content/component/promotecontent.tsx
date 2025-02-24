import React from 'react'

interface PromoteContentProps {
    onClick: () => void;
}

const PromoteContent: React.FC<PromoteContentProps> = ({ onClick }) => {
    return (
        <div>
            PromoteContent
            <p onClick={onClick}>Go back</p>
            </div>
    )
}

export default PromoteContent