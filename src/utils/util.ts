const getReadableDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getDaysSinceCreation = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  return Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export { getReadableDate, getDaysSinceCreation };
