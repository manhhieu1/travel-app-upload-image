export const USER_ACTIVE = {
  INACTIVE: 0,
  ACTIVE: 1,
};

export const CONFIG_END_DATE = "23:59:59.999";

export const CACHE_TIME = 60 * 5;

export const TOKEN_EXPIRES = 60 * 5;

export const THROW_ERR_MES = {
  UNAUTHORIZED: "Không có quyền truy cập",
  ACCOUNT_EXIST: "Số điện thoại đã được đăng ký",
  ACCOUNT_NOTFOUND: "Không tìm thấy tài khoản",
  WRONG_PASSWORD: "Sai mật khẩu",
  DEPARTMENT_NOTFOUND: "Không tìm thấy phòng ban",
  DOCTOR_NOTFOUND: "Không tìm thấy thông tin bác sĩ",
  ROOM_EXIST: "Mã phòng đã được sử dụng",
  ROOM_NOTFOUND: "Không tìm thấy phòng",
};

export const USER_SEX = {
  MALE: 0,
  FEMALE: 1,
};

export const USER_TYPE = {
  ADMIN: 1,
  DOCTOR: 2,
  PATIENT: 3,
};
