import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Arrow } from '../../../icons/arrow';

export type TOpenCloseField = {
    title: string | ReactNode;
    children: ReactNode;
    onDelete?: () => void;
};

export const OpenClose = ({ title, children, onDelete }: TOpenCloseField) => {
    const [isOpen, setIsOpen] = useState(true);
    const [height, setHeight] = useState<number | null>(null);
    const ocContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setHeight(ocContentRef.current?.offsetHeight || 0);
    }, []);

    return (
        <div className={`oc-wrap ${isOpen ? 'open' : ''}`}>
            <div className="oc-title-wrap">
                <h2 className="ft">{title}</h2>
                <div className="oc-action-btns-wrap">
                    {onDelete && !isOpen && (
                        <button className="del" type="button" onClick={onDelete}>
                            Delete
                        </button>
                    )}
                    <button className="arrow" type="button" onClick={() => setIsOpen((prevState) => !prevState)}>
                        <Arrow />
                    </button>
                </div>
            </div>
            <div ref={ocContentRef} style={{ overflow: 'hidden', height: isOpen ? `${height}px` : 0 }} className={`oc-content `}>
                {children}
            </div>
        </div>
    );
};
