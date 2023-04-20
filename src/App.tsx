import MyTree, { DataNode as DataNode2 } from './components/tree'
import './App.less'
import { Tree } from 'antd'
import type { TreeProps, DataNode } from 'antd/es/tree'
import { StarOutlined, EditFilled } from '@ant-design/icons';
const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <StarOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
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
  }
]
const treeData2: DataNode2[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
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
  return (
    <div className="App">
      <StarOutlined />
      <MyTree treeData={treeData2}   defaultSelectedKeys={['0-0-0', '0-0-1']} />
      <Tree
        icon={<EditFilled />}
        defaultExpandAll
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        treeData={treeData}
        onSelect={onSelect}
        onCheck={onCheck}
        showIcon
       />
    </div>
  )
}

export default App
