export function toBase(n, base = 16, minSize = 0, prefix = "0x") {
    const sN = n.toString(base);
    return prefix + "0".repeat(Math.max(0, minSize - sN.length)) + sN;
}
export function hex(n, minSize = 0, prefix = "0x") {
    return toBase(n, 16, minSize, prefix);
}
export function bin(n, minSize = 0, prefix = "0b") {
    return toBase(n, 2, minSize, prefix);
}
