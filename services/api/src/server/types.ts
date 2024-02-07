export type SuccessResult = {
  success: true;
  result: unknown;
};

export type ErrorResult = {
  success: false;
  error: {
    message: string;
  };
};
