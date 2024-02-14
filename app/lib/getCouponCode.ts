export function getCouponCode() {
    const convertRandomlyToUpperCase = (str: string) => {
        return str.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char).join('');
    };

    const first = convertRandomlyToUpperCase(Math.random().toString(36).substring(2, 6));
    const second = convertRandomlyToUpperCase(Math.random().toString(36).substring(2, 6));
    const third = convertRandomlyToUpperCase(Math.random().toString(36).substring(2, 6));

    return `${first}-${second}-${third}`;
}