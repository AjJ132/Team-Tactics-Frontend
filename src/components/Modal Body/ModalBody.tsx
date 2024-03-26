import React from 'react';

interface ModalBodyProps {
    title: string;
    subtitle: string;
    actionText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onActionSuccessful: (returnData: any) => void;
    hideCancel?: boolean;
    modalContent: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({
    title,
    subtitle,
    onCancel,
    onActionSuccessful,
    modalContent,
    cancelText,
    hideCancel,
    actionText,
}) => {

    const handleModalClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // This prevents the click from propagating to the backdrop
    };

    return (
            <div className='modal-backdrop' onClick={onCancel}>
                <div className='modal-content' onClick={handleModalClick}>
                    <div className='modal-header'>
                        <h2>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                    <div className='modal-body w-full h-full'>
                        {modalContent}
                    </div>
                   <div className='modal-footer mt-8'>
                        {!hideCancel && <button onClick={onCancel}>{cancelText}</button>}
                        <button onClick={onActionSuccessful}>{actionText}</button>
                   </div>
                </div>
            </div>
        
    );
};

export default ModalBody;