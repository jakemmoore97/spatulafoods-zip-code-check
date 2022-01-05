type Includes = <T>(arr: T[]) => (value: T) => boolean
export const includes: Includes = arr => value => arr.includes(value)
