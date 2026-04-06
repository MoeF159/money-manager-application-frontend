export const validateFullName = (name) => {
  // Only letters and spaces, at least 2 characters
  const regex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
  return regex.test(name.trim());
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
};