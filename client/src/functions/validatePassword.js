export const validatePassword = (password) => {
    // Accepts password with length 6-16
    // requires one lowercase, one upper case, one number and one special character
    return String(password)
        .toLowerCase()
        .match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,16}$/
        );
}