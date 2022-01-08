type StripParams = <T, R>(f: (x?: T) => R) => () => R
export const stripParams: StripParams = f => () => f()
