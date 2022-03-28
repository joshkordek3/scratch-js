Object.clone = (obj) => Object.assign(new obj.constructor(), {...obj});
Function.executable = (func, args) => (() => func(...args));
export { Object, Function };
