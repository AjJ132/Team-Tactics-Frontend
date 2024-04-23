import { useState } from "react";
import SwitchSelector from 'react-switch-selector';


interface SelectionSwitchProps {
    selectedOption: 'Coach' | 'Athlete';
    // onOptionChange: (newOption: 'Coach' | 'Athlete') => void;
  }
  
  const SelectionSwitch: React.FC<SelectionSwitchProps> = ({
    selectedOption,
    // onOptionChange,
  }) => {
    const options = [
      {
        label: 'Coach',
        value: 'Coach',
        selected: selectedOption === 'Coach',
      },
      {
        label: 'Athlete',
        value: 'Athlete',
        selected: selectedOption === 'Athlete',
      },
    ];
  
    return (
      <SwitchSelector
        options={options}
      />
    );
  };
  
  export default SelectionSwitch;
  