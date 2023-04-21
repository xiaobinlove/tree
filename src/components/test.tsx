import { FC } from 'react'
import { NodeProps } from './tree'

export const Test:FC<NodeProps> = (props) => {
  return <>
    {props.data.title}
  </>
}