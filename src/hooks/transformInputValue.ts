type TransformFunction = (str: string) => string
type ReturnFunction = (node: HTMLInputElement) => void

type TransformInputValue = (transform: TransformFunction) => ReturnFunction
export const transformInputValue: TransformInputValue = transform => node => {
  const update = () => (node.value = transform(node.value))

  node.addEventListener('input', update, {capture: true})

  update()
}
