export const logError = (e) => {
  const status = e.response?.status;
  const code = e.response?.data?.code;
  const message = e.response?.data?.msg;

  console.log(status, code, message);
  alert(message);
}