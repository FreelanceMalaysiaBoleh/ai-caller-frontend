import React, { useState } from 'react';

type DropdownProps = {
  value?: string,
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean
  onSelect: (value: string) => void;
};

const NodeDropdown: React.FC<DropdownProps> = ({ value = "", options, placeholder = 'Select an option', onSelect, disabled = false }) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', width: "100%" }}>
      <select
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={disabled}
        style={{
          width: "100%",
          padding: '5px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#2B2B2B',
          color: selectedValue ? '#FFF' : '#BBB',
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NodeDropdown;