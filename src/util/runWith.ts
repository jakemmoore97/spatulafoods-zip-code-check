type RunWith = <T, R>(x: T) => (f: (x: T) => R) => R
export const runWith: RunWith = x => f => f(x)
