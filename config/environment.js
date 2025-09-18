export const getConfig = async () => {
  const response = await fetch("/config/env.json");
  return await response.json();
};
