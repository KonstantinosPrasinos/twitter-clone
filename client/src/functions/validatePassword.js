export const validatePassword = (password) => {
    // Accepts password with length 6-16
    // requires one lowercase, one upper case, one number and one special character
    if (typeof password !== "string") return "Your password must be string";
    if (password.length < 6 ) return "Your password is too short";
    if (password.length > 16) return "Your password is too long";
    if (!/\d/.test(password)) return "Your password must include a number";
    if (!/.*[a-z].*/.test(password)) return "Your password must include a lower case letter";
    if (!/.*[A-Z].*/.test(password)) return "Your password must include a capital letter";
    if (!/[@.#$!%*?&^]/.test(password)) return "Your password must include a special character";
    return true;
}