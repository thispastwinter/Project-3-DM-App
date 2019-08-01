module.exports = lightning = (method, method2) => {
let value = setTimeout(() => method, 500)
clearTimeout(value);
value = setTimeout(() => method2, 1000)
clearTimeout(value);
value = setTimeout(() => method, 1500)
clearTimeout(value);
value = setTimeout(() => method2, 2000)
clearTimeout(value);
value = setTimeout(() => method, 2500)
clearTimeout(value);
value = setTimeout(() => method2, 3000)
clearTimeout(value);
value = setTimeout(() => method2, 1000)
clearTimeout(value);
value = setTimeout(() => method, 1500)
clearTimeout(value);
value = setTimeout(() => method2, 2000)
clearTimeout(value);
value = setTimeout(() => method, 2500)
clearTimeout(value);
value = setTimeout(() => method2, 3000)
clearTimeout(value);
};
