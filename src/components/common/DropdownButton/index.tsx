"use client"

import { ReactNode, useRef, useState } from 'react';
import { useClickOutSide } from '@/hook/useClickOutSide';
import clsx from 'clsx';


interface DropdownButtonProps {
    children: ReactNode
    content: ReactNode
    className?: string
    placement?: string
}
const DropdownButton = ({ children, content, placement, className } : DropdownButtonProps) => {

    const optionRef = useRef<HTMLDivElement>(null)
    const [isOptions, setIsOptions] = useState(false);

    const handleHiddenOptions = () => {
        setIsOptions(false);
    }

    useClickOutSide(optionRef, handleHiddenOptions);

    return (
        <div ref={optionRef} className='relative'>
            <button onClick={() => setIsOptions(value => !value)}>
                {children}
            </button>
            {
                isOptions && (
                    <div className={`absolute z-10 ${className}`}>
                        {content}
                    </div>
                )
            }
        </div>
    )
}

export default DropdownButton;