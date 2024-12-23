const parseType = (type) => {
  const types = ["home", "work", "personal", "other"];
  if (types.includes(type)) return type;
};

const parseFilters = (query) => {
  return { type: parseType(query.type) };
};

export default parseFilters;
