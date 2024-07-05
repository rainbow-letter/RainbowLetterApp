export const calculateDDay = (deathAnniversary: string) => {
  const anniversaryDate = new Date(deathAnniversary);
  const today = new Date();

  anniversaryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceInTime = anniversaryDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays > 0
    ? `D-${Math.ceil(differenceInDays)}`
    : `D+${Math.abs(Math.ceil(differenceInDays))}`;
};

export const filterNumericValue = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, '');

  return numericValue;
};
