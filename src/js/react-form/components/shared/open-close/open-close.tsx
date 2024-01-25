import React, { ReactNode, useEffect, useRef, useState } from 'react';

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
                <h5>{title}</h5>
                <div className="oc-action-btns-wrap">
                    {onDelete && !isOpen && (
                        <button type="button" onClick={onDelete}>
                            Delete
                        </button>
                    )}
                    <button type="button" onClick={() => setIsOpen((prevState) => !prevState)}>
                        ^
                    </button>
                </div>
            </div>
            <div ref={ocContentRef} style={{ overflow: 'hidden', height: isOpen ? `${height}px` : 0 }} className={`oc-content `}>
                {children}
            </div>
        </div>
    );
};
