import { useState, useEffect } from 'react';

export const useNazirValidation = (value: number) => {
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (value > 10) {
      setError("Jatah Nazir tidak boleh melebihi batas 10% sesuai regulasi.");
    } else if (value === 10) {
      setWarning("Batas maksimum jatah Nazir (10%) telah tercapai.");
      setError(null);
    } else {
      setError(null);
      setWarning(null);
    }
  }, [value]);

  return { error, warning };
};
