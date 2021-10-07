type Keys = "BASE_API_URL";

export function getEnvVariable(key: Keys) {
  return process.env[`REACT_APP_${key}`];
}