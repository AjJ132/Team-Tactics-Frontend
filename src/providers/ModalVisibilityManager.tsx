import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import ModalBody from '../components/Modal Body/ModalBody';

interface ModalProps {
    title: string;
    subtitle: string;
    actionText?: string;
    cancelText?: string;
    modalContent: ReactNode;
    onActionSuccessful?: (returnData: any) => void;
}

interface ModalVisibilityContextType {
    showModal: (modalProps: ModalProps) => void;
    hideModal: () => void;
}

const ModalVisibilityContext = createContext<ModalVisibilityContextType | undefined>(undefined);

export const useModalVisibility = () => {
    const context = useContext(ModalVisibilityContext);
    if (context === undefined) {
        throw new Error('useModalVisibility must be used within a ModalVisibilityProvider');
    }
    return context;
};

export const ModalVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProps, setModalProps] = useState<ModalProps | null>(null);

    const showModal = useCallback((props: ModalProps) => {
        setModalProps(props);
        setIsModalVisible(true);
    }, []);

    const hideModal = useCallback(() => {
        setIsModalVisible(false);
        // Optionally reset modal props or keep them for the next render
        // setModalProps(null);
    }, []);

    return (
        <ModalVisibilityContext.Provider value={{ showModal, hideModal }}>
            {children}
            {isModalVisible && modalProps && (
                <ModalBody
                    {...modalProps}
                    onCancel={hideModal}
                    onActionSuccessful={(returnData) => {
                        modalProps.onActionSuccessful?.(returnData);
                        hideModal();
                    }}
                />
            )}
        </ModalVisibilityContext.Provider>
    );
};
