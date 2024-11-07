import { useEffect, useState } from 'react';

import { useStore } from '@stores/testStore';

const StoreTest = () => {
  const { bears, increasePopulation, removeAllBears, updateBears } = useStore();
  const [bear, setBear] = useState(0);

  useEffect(() => {});

  return (
    <>
      <p>{bears}</p>
      <button
        onClick={() => {
          increasePopulation();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          removeAllBears();
        }}
      >
        삭제
      </button>
      <div>
        <input
          type='number'
          value={bear}
          onChange={(e) => setBear(Number(e.target.value))}
        />
        <button onClick={() => updateBears(bear)}>곰 마리수 변경</button>
      </div>
    </>
  );
};

export default StoreTest;
