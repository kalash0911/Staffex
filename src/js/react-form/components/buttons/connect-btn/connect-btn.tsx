import React from 'react';
import { Internet } from '../../../icons/internet';
import { Success } from '../../../icons/success';
import { Warning } from '../../../icons/warning';

const BTN_STATUSES = {
    hold: {
        label: 'Connect',
        icon: <Internet />,
    },
    fulfilled: {
        label: 'Connected',
        icon: <Success />,
    },
    rejected: {
        label: 'Reconnect',
        icon: <Warning />,
    },
    pending: {
        label: 'Connecting...',
        icon: <Internet />,
    },
};

export type TConnectButtonStatus = keyof typeof BTN_STATUSES;

export type TConnectButonProps = {
    status: TConnectButtonStatus;
    disabled?: boolean;
    onClick: () => void;
};

export const ConnectButton = ({ status = 'hold', disabled, onClick }: TConnectButonProps) => {
    return (
        <button disabled={disabled} type="button" onClick={onClick} className={`link-btn ${status}`}>
            {BTN_STATUSES[status].icon}
            {BTN_STATUSES[status].label}
        </button>
    );
};
