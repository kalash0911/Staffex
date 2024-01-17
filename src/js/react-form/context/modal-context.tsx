/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext, PropsWithChildren, useContext } from 'react';
import { Modal } from '../components/shared/modal/modal';
import { IModalBasicProps } from '../models/common/modal';

interface IModalContextValues {
    isOpened: boolean;
    openModal: <P extends IModalBasicProps>(
        ContentComponent: React.FC<PropsWithChildren<any>>,
        componentProps?: PropsWithChildren<P>,
        modalProps?: IModalProps,
    ) => void;
    hideModal: () => void;
    setComponentProps: (componentProps: PropsWithChildren<any>) => void;
}

interface IModalProps extends IModalBasicProps {
    onClose?: () => void;
}

interface IModalState {
    isOpened: boolean;
    ContentComponent: React.FC<PropsWithChildren<any>> | null;
    componentProps: PropsWithChildren<any>;
    modalProps: IModalProps;
}

interface IModalProviderProps {
    children: React.ReactNode;
}

const ModalContext = createContext<IModalContextValues | null>(null);

const ModalProvider = ({ children }: IModalProviderProps) => {
    const initialState = {
        ContentComponent: null,
        componentProps: {},
        modalProps: {},
        isOpened: false,
    };

    const [modalState, setModalState] = useState<IModalState>(initialState);

    /**
     * openModal function.
     *
     * @param {React.FC} ContentComponent - a modal content component
     * @param {any} [componentProps={}] - a modal content component (ContentComponent) props
     * @param {IModalProps} [modalProps={}] - a modal props
     *
     * @example
     *     const BasicModalContent = ({title}: string) => <p>This is a basic modal's content. {title}</p>;
     *     const modalProps = { size: 'sm' };
     *
     *     openModal(BasicModalContent, { title: 'Modal Title' }, modalProps);
     */
    const openModal = (
        ContentComponent: React.FC<PropsWithChildren<any>>,
        componentProps: PropsWithChildren<any> = {},
        modalProps: IModalProps = {},
    ) => {
        setModalState({
            ContentComponent,
            componentProps,
            modalProps,
            isOpened: true,
        });
    };

    /**
     * hideModal function for hiding (closing) opened modal
     *
     */
    const hideModal = () => {
        setModalState({
            ContentComponent: null,
            componentProps: {},
            modalProps: {},
            isOpened: false,
        });
    };

    const setComponentProps = (componentProps: PropsWithChildren<any>) => {
        setModalState((prevModalState) => ({
            ...prevModalState,
            componentProps: { ...prevModalState.componentProps, ...componentProps },
        }));
    };

    return (
        <ModalContext.Provider
            value={{
                openModal,
                hideModal,
                isOpened: modalState.isOpened,
                setComponentProps,
            }}
        >
            <Modal open={modalState.isOpened} onClose={hideModal} {...modalState.modalProps}>
                {modalState.ContentComponent && (
                    <modalState.ContentComponent hideModal={hideModal} {...modalState.componentProps} />
                )}
            </Modal>
            {children}
        </ModalContext.Provider>
    );
};

const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within the ModalProvider');
    }
    return context;
};

export { ModalProvider, ModalContext, useModal };
