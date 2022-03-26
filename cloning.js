Object.clone = (obj) => Object.assign(new obj.constructor(), obj);
Function.executable = (func, args) => (() => wait(...args));
export { Object, Function };
