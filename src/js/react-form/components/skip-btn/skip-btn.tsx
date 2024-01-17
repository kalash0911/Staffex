import React from 'react';
import { Button, TButtonProps } from '../shared/button/button';
import { useModal } from '../../context/modal-context';
import { ISkipModalProps, SkipModal } from '../modals/skip/skip-modal';
import { useAppFormState } from '../../context/app-form-context';

export type TSkipButtonProps = Partial<ISkipModalProps> & Partial<TButtonProps>;

export const SkipButton = ({ onSkip, onClose, onClick, ...rest }: TSkipButtonProps) => {
    const { openModal, hideModal } = useModal();
    const { handleNextQuestion } = useAppFormState();

    const handleOnClick = () => {
        onClick && onClick();
        openModal<ISkipModalProps>(
            SkipModal,
            {
                onSkip: onSkip
                    ? onSkip
                    : () => {
                          handleNextQuestion();
                          hideModal();
                      },
                onClose: onClose ? onClose : hideModal,
            },
            {
                size: 'lg',
            },
        );
    };

    return <Button {...rest} label={rest.label || 'Skip'} variant={rest.variant || 'secondary'} onClick={handleOnClick} />;
};
