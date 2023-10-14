export const generateUuid = () => {
  return String.fromCharCode(
    ...new Array<number>(10)
      .fill(65)
      .map((n) => n + Math.floor(Math.random() * 26)),
  );
};
