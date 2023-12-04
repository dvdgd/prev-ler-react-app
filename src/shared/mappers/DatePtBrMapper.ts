
export function BrDateStringToDateInstance(dateStr: string): Date | undefined {
  const dateParts = dateStr.split('/');
  if (!dateParts || dateParts.length !== 3) return;

  const day = parseInt(dateParts[0], 10)
  const monthIdx = parseInt(dateParts[1], 10) - 1;
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(monthIdx) || isNaN(year)) return;
  return new Date(year, monthIdx, day);
}

export function DateonlyPtBrToISO(dateString: string): string | undefined {
  const date = BrDateStringToDateInstance(dateString);
  return date ? date.toISOString() : undefined;
}
