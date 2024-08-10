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

export const isCheckFutureDate = (date: string | null): boolean => {
  if (date === null) {
    return false;
  }

  const inputDate = new Date(date);
  const currentDate = new Date();
  if (inputDate > currentDate) {
    return true;
  }

  return false;
};

export const formatDay = (value: number) => {
  switch (value) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    default:
      return '토';
  }
};
