export const PASSWORD_RULE =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
// Your password must be at least 8 characters long.
// and max of 16 characters
// It should contain at least one digit (0-9).
// It should include at least one lowercase letter (a-z).
// It should include at least one uppercase letter (A-Z).
// Lastly, it should feature at least one non-alphanumeric character (such as @, #, $, %, etc.).

export const PASSWORD_RULE_MESSAGE =
  "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number and one character";
