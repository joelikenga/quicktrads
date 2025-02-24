'use client';
import React, { useState } from 'react';
import Content from './content';
import EditContent from './editcontent';
import ContentModal from './contentmodal';
import PromoteContent from './promotecontent';

const Body = () => {
    const [newPage, setNewPage] = useState<string>('content');

    // Function to update the modal content
    const updateModal = () => {
        switch (newPage) {
            case 'content':
                return <Content
                    onReturn={() => activeModal('hero-content')}         // Returns to original
                    onPromote={() => activeModal('promotion-content')} // Moves to PromoteContent
                />
            case 'hero-content':
                return <EditContent onClick={() => activeModal('content')} />;
            case 'promotion-content':
                return <PromoteContent onClick={() => activeModal('hero-default')} />;
            case 'hero-default':
                return <Body />;
            default:
                return null; // Fallback for invalid page
        }
    };

    // Function to change the active modal
    const activeModal = (type: string): void => {
        setNewPage(type);
    };

    return (
        <div className="flex flex-col gap-8 h-[82px] ml-[280px] mt-[150px]">
            {/* Modal component with dynamic content */}
            <ContentModal content={updateModal()} isActive={["content", "hero-content", "promotion-content", "hero-default"].includes(newPage)} />
        </div>
    );
};

export default Body;
