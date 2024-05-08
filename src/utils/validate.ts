const EMAIL_ERROR_CODE = [
  '유효하지 않은 이메일 형식입니다.',
  '이미 존재하는 이메일입니다.',
];

const PASSWORD_ERROR_CODE = [
  '비밀번호는 영문, 숫자를 조합하여 8글자 이상으로 입력해주세요.',
  '이메일 및 비밀번호를 확인 해주세요.',
  '탈퇴된 계정입니다.',
  '항목을 입력해주세요.',
];

const PHONENUMBER_ERROR_CODE = [
  '항목을 입력해주세요.',
  '유효하지 않은 휴대폰 번호 형식입니다.',
];

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const handleErrorData = (error: any) => {
  if (EMAIL_ERROR_CODE.includes(error.message)) {
    return { category: 'email', message: error.message };
  }

  if (PASSWORD_ERROR_CODE.includes(error.message)) {
    return { category: 'password', message: error.message };
  }

  if (PHONENUMBER_ERROR_CODE.includes(error.message)) {
    return { category: 'phoneNumber', message: error.message };
  }
};

export { validateEmail, validatePassword, handleErrorData };
