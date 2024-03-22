const delay = 400; // Add a delay of 400ms to debounce

export function debounce(func) {
    let timeoutId;

    return function (...args) {
        // Clear the previous timeout
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}