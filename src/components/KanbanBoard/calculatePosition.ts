export const calculatePosition = (
  prevPos?: number,
  nextPos?: number,
): number => {
  if (prevPos === undefined && nextPos === undefined) return 1;
  if (prevPos === undefined) return nextPos! / 2;
  if (nextPos === undefined) return prevPos + 1;
  return (prevPos + nextPos) / 2;
};
