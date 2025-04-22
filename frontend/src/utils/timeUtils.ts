export const calculateTimeLeft = (endDate: string) => {
  const timeLeft = Math.max(0, new Date(endDate).getTime() - Date.now());
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return { daysLeft, hoursLeft, minutesLeft };
};
