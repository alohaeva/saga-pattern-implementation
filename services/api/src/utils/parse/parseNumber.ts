export const parseNumber = (number: string | undefined, def = 0): number => {
  if (!number) return def;

  const parsedNumber = parseInt(number, 10);

  return isNaN(parsedNumber) ? def : parsedNumber;
};
