type TransformFunction = (str: string) => string
type ReturnFunction = (node: HTMLInputElement) => void

export const transformInputValue =
  (transform: TransformFunction): ReturnFunction =>
  node => {
    const update = () => (node.value = transform(node.value))

    node.addEventListener('input', update, {capture: true})

    update()
  }
