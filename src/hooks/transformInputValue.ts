import type {Endomorphism} from 'fp-ts/Endomorphism'

type TransformInputValue = (
  transform: Endomorphism<string>
) => (node: HTMLInputElement) => void

export const transformInputValue: TransformInputValue = transform => node => {
  const update = () => (node.value = transform(node.value))

  node.addEventListener('input', update, {capture: true})

  update()
}
