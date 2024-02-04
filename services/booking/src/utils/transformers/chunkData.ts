export const chunkData = <T>(data: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunkRecords = data.slice(i, i + chunkSize);

    result.push(chunkRecords);
  }

  return result;
};
