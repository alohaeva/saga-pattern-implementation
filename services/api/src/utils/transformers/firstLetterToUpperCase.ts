export const firstLetterToUpperCase = (str: string): string => {
  return str.replace(/^./, c => c.toUpperCase());
};
