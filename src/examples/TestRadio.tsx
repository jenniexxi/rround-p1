import { useState } from 'react';

import { Radio } from '@components';

type RadioItem = {
  id: string;
  value: string;
  radioGroup: string;
};

const TestRadio = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const radioItems: RadioItem[] = [
    { id: 'radio1', value: 'Option 1', radioGroup: 'group1' },
    { id: 'radio2', value: 'Option 2', radioGroup: 'group1' },
    { id: 'radio3', value: 'Option 3', radioGroup: 'group1' },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      {radioItems.map((item) => (
        <Radio
          key={item.id}
          id={item.id}
          value={item.value}
          name={item.radioGroup}
          selectedValue={selectedValue}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default TestRadio;
