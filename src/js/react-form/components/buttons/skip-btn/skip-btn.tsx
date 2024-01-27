import React from 'react';
import { Button, TButtonProps } from '../../shared/button/button';
import { useModal } from '../../../context/modal-context';
import { ISkipModalProps, SkipModal } from '../../modals/skip/skip-modal';
import { useAppFormState } from '../../../context/app-form-context';
import { isMobile } from 'react-device-detect';
import { Tooltip } from '../../shared/tooltip/tooltip';

export type TSkipButtonProps = Partial<ISkipModalProps> & Partial<TButtonProps>;

export const SkipButton = ({
    onSkip,
    onClose,
    onClick,
    disabled,
    requiredText = "YOU CAN'T SKIP THIS STEP",
    ...rest
}: TSkipButtonProps) => {
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

    const skipTextNode = <span className="text-skip">{requiredText}</span>;

    const btnNode = (
        <Button
            {...rest}
            label={rest.label || 'Skip'}
            variant={rest.variant || 'secondary'}
            onClick={handleOnClick}
            disabled={disabled}
            requiredText={disabled ? skipTextNode : null}
        />
    );

    if (disabled && !isMobile) {
        return (
            <Tooltip content={skipTextNode} transform={`translate(-50%, 25px)`}>
                {btnNode}
            </Tooltip>
        );
    }

    return btnNode;
};
