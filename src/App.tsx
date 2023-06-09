import MyTree, { DataNode as DataNode2 } from './components/tree'
import { Tree } from 'antd'
import type { TreeProps, DataNode } from 'antd/es/tree'
import { StarOutlined, EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Test } from './components/test'
const treeData: DataNode2[] = [
  {
    title: 'parent 1',
    key: '0-022233',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-022133',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-1230',
          },
          {
            title: 'leaf',
            key: '0-0-0123123-1',
          },
        ],
      },
      {
        title: 'parent 3123211-1',
        key: '0-012312-1',
        children: [{ title: 'sfsfsfs', key: '0-013123-1-0' }],
      },
    ]
  },
  {
    title: 'parent 1222212322222222',
    key: '0-012312333',
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
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disabled: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
            disabled: true,
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
    setDataSource([...treeData2,  ...treeData])
  }
  return (
    <div className="App">
      <button onClick={resetDataSource}>xxx</button>
      <MyTree key={'11111'} nodeRender={(data) => <Test data={data}></Test>} treeData={dataSource} onSelect={(key) => { setSelectedKey(key) } } />
      {/* <MyTree key={'2222'} treeData={treeData2} selectedKey={selectedKey} onSelect={(key) => { setSelectedKey(key) } } /> */}
      {/* <Tree
        autoExpandParent
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
