export function getLength(obj) {
    return Array.isArray(obj) ? obj.length : 1;
}
export function selection(obj, pos) {
    return Array.isArray(obj) ? obj[pos] : obj;
}
export function randomSelection(obj) {
    return selection(obj, Math.floor(Math.random() * getLength(obj)))
}