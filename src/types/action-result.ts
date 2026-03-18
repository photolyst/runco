export type ActionSuccess = {
  success: true;
  message?: string;
};

export type ActionError = {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
};

export type ActionResult = ActionSuccess | ActionError;
