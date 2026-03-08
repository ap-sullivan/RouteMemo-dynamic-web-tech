//  helper function to convert seconds to minutes and seconds to be used in teh activity siummary

export const getTimeParts = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return {
    minutes: mins,
    seconds: secs,
  };
};