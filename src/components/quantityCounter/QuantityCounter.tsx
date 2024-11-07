import { ChangeEvent } from 'react';

import Button, { BtnSize } from '@components/button/Button';
import Input from '@components/input/Input';

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  size?: BtnSize;
  width?: number;
  maxValue?: number;
  minValue?: number;
};

const QuantityCounter = ({ quantity, setQuantity, size = 'sm', minValue = 1, width, maxValue }: Props) => {
  const plusQuantity = () => {
    if (maxValue) {
      if (quantity + 1 > maxValue) return;
    }

    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity === minValue) return;
    setQuantity(quantity - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isNaN(parseInt(newValue))) {
      setQuantity(1);
      return;
    }
    if (maxValue) {
      if (parseInt(newValue) > maxValue) {
        setQuantity(maxValue);
      } else {
        setQuantity(parseInt(newValue));
      }
    } else {
      setQuantity(parseInt(newValue));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Button
        title={'-'}
        type='common.outline.grey'
        onClick={minusQuantity}
        size={size}
        width={width}
      />
      <Input
        name='name'
        type='number'
        value={quantity.toString()}
        onChange={handleChange}
        width={100}
        height={'sm'}
      />
      <Button
        title={'+'}
        type='common.outline.grey'
        onClick={plusQuantity}
        size={size}
        width={width}
      />
    </div>
  );
};

export default QuantityCounter;
