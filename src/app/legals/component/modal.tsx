import React from 'react'

interface ModalProps {
    content: React.ReactNode;
    isActive: boolean;
}

export default function modal({ content, isActive }: ModalProps) {
    if (!isActive) return (
        <>Error</>
    )
    return (
        <div className="w-full lg:w-[800px] lg:mx-auto h-max">
            {content}
        </div>
    )
}
