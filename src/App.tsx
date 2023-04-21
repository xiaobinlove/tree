import MyTree, { DataNode as DataNode2 } from './components/tree'
import { Tree } from 'antd'
import type { TreeProps, DataNode } from 'antd/es/tree'
import { StarOutlined, EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Test } from './components/test'
const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <StarOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        icon: <StarOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <StarOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'sfsfsfs', key: '0-0-1-0' }],
      },
    ]
  },
  {
    title: 'parent 1222222222222',
    key: '0-033',
  }
]
const treeData2: DataNode2[] = [
  {
    title: 'parent 2',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        icon: <StarOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0'
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'sfsfsfs', key: '0-0-1-0' }],
      },
    ]
  }
]
function App() {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  const [selectedKey, setSelectedKey] = useState('')
  const [dataSource, setDataSource] = useState(treeData2)

  const resetDataSource = ()=>{
    setDataSource([...treeData2,  {
      title: 'parent 1-12',
      key: '0-0-13'
    },])
  }
  return (
    <div className="App">
      <button onClick={resetDataSource}>xxx</button>
      <MyTree  NodeRender={Test} treeData={dataSource} selectedKey={selectedKey} onSelect={(key) => { setSelectedKey(key) } } />
      {/* <Tree
        autoExpandParent
        icon={<EditFilled />}
        defaultExpandAll
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        treeData={treeData}
        onSelect={onSelect}
        onCheck={onCheck}
        showIcon
       /> */}
    </div>
  )
}

export default App
