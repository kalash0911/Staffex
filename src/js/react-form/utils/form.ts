export const maskPhoneNumber = (value: string) => {
    if (value.length > 6) {
        return (value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`);
    }
    if (value.length > 3) {
        return (value = `(${value.slice(0, 3)}) ${value.slice(3)}`);
    }
    return value;
};
