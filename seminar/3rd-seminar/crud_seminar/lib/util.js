// 응답 형식 통일하기 위한 유틸 - status, sucsess, message,data(있으면) 세가지 정보
const util = {
  success: (status, message, data) => {
    return {
      status,
      success: true,
      message,
      data,
    };
  },
  fail: (status, message) => {
    return {
      status,
      success: false,
      message,
    };
  },
};

module.exports = util;
