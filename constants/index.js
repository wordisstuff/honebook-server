const { DOMAIN } = process.env;
const { GLOBAL_DOM } = process.env;
const { SERVER } = process.env;

export const redirectUrl =
    SERVER === 'global' ? `${GLOBAL_DOM}` : `${DOMAIN}5174`;
