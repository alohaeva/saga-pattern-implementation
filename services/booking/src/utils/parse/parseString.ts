export const parseString = (str: string | undefined, def: string): string => {
  return str ?? def;
};
