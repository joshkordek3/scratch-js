Object.clone = (obj, c) => {
  if (c) return Object.assign(new c(), obj);
  if (!obj.getClass) return {...obj};
  return Object.assign(new (obj.getClass())(), obj);
};
export Object;
