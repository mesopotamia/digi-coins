export const getNetworth = (coins, profile) => {
    return coins.reduce((result, item) => {
        const coinName = item.name;
        const price = item.price;
        result = result + (item.price * profile[coinName]);
        return result;
    }, 0);
};
export const checkIfCompareCryptoResponseIsInvalid = (response) => {
    /*If compareCrypto has a message key then it's determined to be invalid*/
    return response.Message;
};