export const getYear = (date: string) => {
  return date?.split("-")[0];
};

export const formatRating = (rating: number) => {
  return rating.toFixed(1);
};