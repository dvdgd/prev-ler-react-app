
export function DateonlyPtBrToISO(dateString: string): Date | undefined {
  const dateParts = dateString.split('/');
  if (dateParts.length !== 3) return;

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Subtracts 1 from the month
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return;
  return new Date(year, month, day);
}
