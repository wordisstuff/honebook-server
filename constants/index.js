const { SERVER, DOMAIN, GLOBAL_DOM } = process.env;
console.log(SERVER);
console.log(DOMAIN);
export const redirectUrl =
    SERVER === 'global' ? `${GLOBAL_DOM}` : `${DOMAIN}5174`;

console.log(redirectUrl);
