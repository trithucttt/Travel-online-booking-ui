import { useEffect, useRef, useState } from 'react';

export default function useClickOutSide(dom = 'button') {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.matches(dom)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        showDropdown,
        setShowDropdown,
        dropdownRef,
    };
}
