let envConfig = null;

export const initEnvironment = async () => {
  const response = await fetch("/config/env.json");
  envConfig = await response.json();
};

export const getConfig = () => envConfig;
