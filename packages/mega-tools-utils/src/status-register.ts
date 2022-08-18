const SR_MASK = 0b1111011100011111
const SR_TRACE_MASK = 0b1100000000000000
const SR_SUPERVISOR_MASK = 0b0010000000000000
const SR_MASTER_MASK = 0b0001000000000000
const SR_INTERRUPT_MASK = 0b0000011100000000
const SR_SYSTEM_MASK = 0b1111111100000000
const SR_USER_MASK = 0b0000000011111111
const SR_EXTEND_MASK = 0b0000000000010000
const SR_NEGATIVE_MASK = 0b0000000000001000
const SR_ZERO_MASK = 0b0000000000000100
const SR_OVERFLOW_MASK = 0b0000000000000010
const SR_CARRY_MASK = 0b0000000000000001

export interface StatusRegisterValues {
    traceMode: number;
    isSupervisor: boolean;
    isMaster: boolean
    interruptMask: number;
    isExtend: boolean;
    isNegative: boolean;
    isZero: boolean;
    isOverflow: boolean;
    isCarry: boolean;
}

export function IdentifyConstant(n: number): StatusRegisterValues {
    if (~SR_MASK & n) {
        throw new Error("Invalid Status Register Constant")
    }
    const isExtend = !!(n & SR_EXTEND_MASK)
    const isNegative = !!(n & SR_NEGATIVE_MASK)
    const isZero = !!(n & SR_ZERO_MASK)
    const isOverflow = !!(n & SR_OVERFLOW_MASK)
    const isCarry = !!(n & SR_CARRY_MASK)
    return {
        traceMode: 0,
        isSupervisor: false,
        isMaster: false,
        interruptMask: 0,
        isExtend, isNegative, isZero, isOverflow, isCarry
    }
}

