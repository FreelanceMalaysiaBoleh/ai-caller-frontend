import { useState } from "react";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  selectedValue: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  minWidth?: string;
  disabled?: boolean;
  variant?: 'default' | 'compact';
}

const Dropdown: React.FC<DropdownProps> = ({ 
  selectedValue, 
  onChange, 
  options, 
  placeholder = "Select option",
  minWidth = "120px",
  disabled = false,
  variant = 'default'
}) => {
  const size = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const baseStyle = {
    fontSize: responsiveValue(size, 12, 12, 12),
    color: "#CCCCCC",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: variant === 'compact' ? "3px 8px" : "5px 10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "5px",
    minWidth: minWidth,
    textAlign: "center" as const,
    backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "transparent",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s ease"
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div 
        style={baseStyle}
        onClick={handleToggle}
      >
        {displayText} {!disabled && "▼"}
      </div>
      
      {isOpen && !disabled && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          backgroundColor: "#2B2B2B",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "5px",
          minWidth: minWidth,
          zIndex: 1000,
          marginTop: "2px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
        }}>
          {options.map((option, index) => (
            <div
              key={option.value}
              style={{
                padding: variant === 'compact' ? "6px 10px" : "8px 12px",
                cursor: "pointer",
                fontSize: responsiveValue(size, 12, 14, 16),
                color: selectedValue === option.value ? "#F73587" : "#CCCCCC",
                backgroundColor: selectedValue === option.value ? "rgba(247, 53, 135, 0.1)" : "transparent",
                borderBottom: index < options.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                transition: "all 0.2s ease"
              }}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={(e) => {
                if (selectedValue !== option.value) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedValue !== option.value) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;