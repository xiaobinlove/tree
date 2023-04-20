import React, { FC, ReactNode, useState, useMemo } from 'react'
import './tree.less'
import classnames from 'classnames'

import { CaretRightOutlined } from '@ant-design/icons';
export interface BasicDataNode {}
export type DataNode = {
  key: string,
  // title: string | ReactNode | ((data: DataNode) => (ReactNode)),
  title: string,
  children?: DataNode[]
}
interface IProps {
  autoExpandParent?: boolean,
  treeData: DataNode[],
  defaultSelectedKeys?: string[]
}
const Tree: FC<IProps> = ({ treeData, defaultSelectedKeys }) => {
  const [selectKeys, setSelectKeys] = useState(defaultSelectedKeys!)
  console.log(selectKeys, 'selectKeys');
  const handleSelect = (item: DataNode) => {
    console.log(item, 'item');
    
  }
  const renderTreeNodes = (nodes: DataNode[], level = 0) => {
    return nodes.map(item => {
      return (
        // zov-tree__treenode
        <div key={item.key} onClick={() => { handleSelect(item) }} className={classnames('zov-tree__treenode', { 'zov-tree__treenode': selectKeys.includes(item.key) }) }>
          <span className={ `zov-tree__switcher` } style={{ transform: 'rotate(90deg)' }}>
          <CaretRightOutlined />
          </span>
          <span className='zov-tree__node-content-wrapper'>
            { item.title }
            { item.children && renderTreeNodes(item.children, level + 1) }
          </span>
        </div>
      )
    })
  }
  return (
    <div className='zov-tree'>
      { renderTreeNodes(treeData) }
    </div>
  )
}
Tree.defaultProps = {
  autoExpandParent: true,
  defaultSelectedKeys: []
} as unknown as IProps
export default Tree