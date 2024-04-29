const EMAIL_ERROR_CODE = ['EXISTS_EMAIL', 'METHOD_ARGUMENT_NOT_VALID'];
const PASSWORD_ERROR_CODE = ['METHOD_ARGUMENT_NOT_VALID'];

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const handleErrorData = (error: any) => {
  if (
    EMAIL_ERROR_CODE.includes(error.code) &&
    error.message.includes('이메일')
  ) {
    return { category: 'email', message: error.message };
  }

  if (
    PASSWORD_ERROR_CODE.includes(error.code) &&
    error.message.includes('비밀번호')
  ) {
    return { category: 'password', message: error.message };
  }
};

export { validateEmail, validatePassword, handleErrorData };
