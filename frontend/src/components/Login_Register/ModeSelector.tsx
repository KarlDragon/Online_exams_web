import React, { useState } from 'react';
import './ModeSelector.scss';

interface ModeSelectorProps {
  options: { [key: string]: string };
  onSelect: (option: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(Object.keys(options)[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(options[option]);
    setIsOpen(false);
  };

  return (
    <div className="mode-selector">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="options">
          {Object.keys(options).map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModeSelector;