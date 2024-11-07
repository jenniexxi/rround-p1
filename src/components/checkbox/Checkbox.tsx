import * as S from './Checkbox.style';

/* value 값이 없을 수 있으니 옵셔널 처리 */

type CheckboxProps = {
  id: string;
  value?: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

const Checkbox = ({ id, value = '', name, checked, onChange, disabled = false }: CheckboxProps) => {
  return (
    <S.CheckboxContainer>
      <S.CheckboxInput
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.checked);
        }}
        disabled={disabled}
      />
      <S.CheckboxLabel htmlFor={id}>{value}</S.CheckboxLabel>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
