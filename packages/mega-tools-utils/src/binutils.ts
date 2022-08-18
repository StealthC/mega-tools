export function toBase(n: number, base=16, minSize = 0, prefix = "0x", postfix = ""): string {
    const sN = n.toString(base)
    return prefix + "0".repeat(Math.max(0, minSize - sN.length)) + sN + postfix
}

export function hex(n: number, minSize = 0, prefix = "0x", postfix = ""): string {
    return toBase(n, 16, minSize, prefix, postfix)
}

export function bin(n: number, minSize = 0, prefix = "0b", postfix = ""): string {
    return toBase(n, 2, minSize, prefix, postfix)
}