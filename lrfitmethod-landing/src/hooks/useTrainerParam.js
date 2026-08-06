import { useState, useEffect } from 'react';

const VALID_TRAINERS = ['renata', 'leandro'];

export function useTrainerParam() {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trainerParam = params.get('trainer');

    if (VALID_TRAINERS.includes(trainerParam)) {
      setTrainer(trainerParam);
    }
  }, []);

  return trainer;
}
