import * as S from './Radio.style';

type RadioProps = {
  id: string;
  value: string;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
};
const Radio = ({ id, value, name, selectedValue, onChange }: RadioProps) => {
  return (
    <S.RadioContainer>
      <S.RadioInput
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
      <S.RadioLabel htmlFor={id}>{value}</S.RadioLabel>
    </S.RadioContainer>
  );
};

export default Radio;
