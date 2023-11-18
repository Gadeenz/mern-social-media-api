export const getCurrentDate = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  return {
    currentMonth,
    currentYear,
  };
};
