import React, { useState, useRef, useEffect } from 'react';

const DropdownSearch = ({ label, options, searchValue, setSearchValue, className, more, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    //Outside Click
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSearchChange = (value) => {
        setSearchValue(value);
        const filtered = options.filter(option =>
            option.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleOptionClick = (option) => {
        setSearchValue(option);
        setIsOpen(false);
    };



    return (
        <div className="relative flex justify-between items-center gap-1" ref={dropdownRef}>
            <div className='flex justify-end items-center'>
                <div className='flex '>
                    <label className='w-20'>{label}</label>
                    <input value={searchValue} onChange={(e) => { handleSearchChange(e.target.value) }} onClick={handleToggle} placeholder={placeholder} className='pl-1 w-52 border border-gray-500' type="text" />
                </div>
                {isOpen && (
                    <div className={`${className} absolute mt-1 top-6 bg-white border border-gray-200 rounded shadow-lg w-52`}>
                        {filteredOptions.map(option => (
                            <div
                                key={option}
                                onClick={() => { handleOptionClick(option) }}
                                className="p-1 px-2 hover:bg-gray-100 cursor-pointer "
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {more}
        </div>
    );
};

export default DropdownSearch;
