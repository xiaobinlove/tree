import { FC } from 'react'
import { NodeProps } from './tree'

export const Test:FC<NodeProps> = (props) => {
  return (
    <div>
          {props.data.title}
          <input type="text" />
    </div>
  )
}