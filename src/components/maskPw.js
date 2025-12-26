
export const maskPassword = (pw, visible = 4) => {
  if (!pw) return "";
  if (pw.length <= visible) return pw;
  return pw.slice(0, visible) + "*".repeat(pw.length - visible);
}