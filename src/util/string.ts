export type Eq = (x: string) => (y: string) => boolean
export const eq: Eq = x => y => x === y
