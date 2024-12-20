import React from 'react';
import Select from 'react-select';

const SelectInput = ({ options, value, onChange, placeholder, required, isLoading }) => {
    return (
        <Select
            options={options}
            value={options ? options.find(option => option.value === value) : null}
            onChange={selectedOption => onChange(selectedOption ? selectedOption.value : '')}
            placeholder={placeholder}
            isRequired={required}
            isLoading={isLoading}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
        />
    );
};

export default SelectInput;
