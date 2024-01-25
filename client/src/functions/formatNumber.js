export function formatNumber(number) {
    if (number >= 1000000) {
        const formattedNumber = (number / 1000000).toFixed(1);
        return formattedNumber.endsWith('.0') ? `${Math.floor(formattedNumber)}M` : `${formattedNumber}M`;
    } else if (number >= 1000) {
        const formattedNumber = (number / 1000).toFixed(1);
        return formattedNumber.endsWith('.0') ? `${Math.floor(formattedNumber)}K` : `${formattedNumber}K`;
    } else {
        return `${number}`;
    }
}