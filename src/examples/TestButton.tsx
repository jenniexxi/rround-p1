import { Button, TwoButton } from '@components';

const TestButton = () => {
  return (
    <div style={{ padding: 10 }}>
      <Button title='test' />
      <div style={{ height: 10 }} />
      <Button
        title={<span>hello</span>}
        type='common.outline.grey'
        size='md'
      />
      <div style={{ height: 10 }} />
      <Button
        title='hello'
        type='common'
        size='sm'
      />
      <div style={{ height: 10 }} />
      <TwoButton
        leftTitle={'111'}
        rightTitle={'222'}
        leftSize={3}
        rightSize={7}
        btnGap={20}
        leftType='common.outline.bk'
        rightType='primary.outline'
        size='tiny'
      />
    </div>
  );
};
export default TestButton;
