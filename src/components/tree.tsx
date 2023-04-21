import React, { FC, ReactNode, useState, useMemo, useEffect, ComponentType } from 'react';
import './tree.less';
import classnames from 'classnames';
import { CaretRightOutlined } from '@ant-design/icons';

export type DataNode = {
  disabled?: boolean // 是否禁用节点
  key: string; // 节点唯一标识
  title: ReactNode; // 节点标题，可以是字符串或React组件
  icon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode); // 节点图标，可以是React节点或函数类型
  children?: DataNode[]; // 子节点数据
};
export type NodeProps = {
  data: DataNode;
}
interface IProps {
  disabled?: boolean // 将树禁用
  treeData: DataNode[]; // 树形结构数据
  defaultSelectedKeys?: string[]; // 默认选中的节点的key
  defaultExpandAll?: boolean; // 默认展开所有节点
  icon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode); // 树形控件节点的图标，可以是React节点或函数类型
  onSelect?: (selectedKeys: string[], e: { selectedNodes: DataNode[] }) => void; // 选中节点的回调函数
  NodeRender?: ComponentType<NodeProps>;
}
const defaultNodeRender: ComponentType<NodeProps> = ({ data })=> <span>{data.title}</span>
const Tree: FC<IProps> = ({ disabled = false, icon, treeData, defaultSelectedKeys = [], defaultExpandAll = false, onSelect, NodeRender = defaultNodeRender }) => {
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandAll ? generateDefaultExpandedKeys(treeData) : []);
  const handleExpand = (key: string, isExpand: boolean) => {
    if (isExpand) {
      setExpandedKeys((keys) => [...keys, key]);
    } else {
      setExpandedKeys((keys) => keys.filter((item) => item !== key));
    }
  };
  const handleSelect = (item: DataNode) => {
    if (disabled || item.disabled) {
      return;
    }
    const newSelectedKeys = selectedKeys.includes(item.key) ? [] : [item.key]; // 切换选中状态
    setSelectedKeys(newSelectedKeys);
    onSelect?.(newSelectedKeys, { selectedNodes: [item] });
  };
  const renderTreeNodes = (nodes: DataNode[], level = 0, isOpen = true) => {
    return nodes.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedKeys.includes(item.key);
      const isSelected = selectedKeys.includes(item.key);
      const switcherRotate = isExpanded ? 90 : 0;
      const nodeIcon = item.icon || icon || null
      return (
        <div key={item.key} className={classnames('zov-tree__node', { 'zov-tree__node--hide': !isOpen })} style={{ paddingLeft: `${level * 16}px` }}>
          {/* 展开/收起 */}
          {hasChildren && (
            <span
              className="zov-tree__switcher"
              onClick={() => handleExpand(item.key, !isExpanded)}
            >
              <CaretRightOutlined style={{ transform: `rotate(${switcherRotate}deg)` }} />
            </span>
          )}
          <span
            className={classnames('zov-tree__node-content-wrapper', { 'zov-tree__node-content-wrapper--selected': isSelected, 'zov-tree__node-content-wrapper--disabled': disabled || item.disabled })}
            onClick={() => handleSelect(item)}
          >
            {/* 自定义节点图标 */}
            {nodeIcon && (<span className="zov-tree__icon">{typeof nodeIcon === 'function' ? nodeIcon({ expanded: isExpanded }) : nodeIcon}</span>)}
            {/* 标题 */}
            <NodeRender data={item} />
          </span>
          {/* 递归渲染子节点 */}
          {hasChildren && renderTreeNodes(item.children!, level + 1, isExpanded)}
        </div>
      );
    });
  };

  useEffect(() => {
    if (defaultSelectedKeys.length > 0) {
      setSelectedKeys(defaultSelectedKeys);
    }
  }, [defaultSelectedKeys]);

  const memoizedTreeData = useMemo(() => {
    return treeData;
  }, [treeData]);

  return <div className="zov-tree">{renderTreeNodes(memoizedTreeData)}</div>;
};
// 获取默认展开keys
function generateDefaultExpandedKeys(data: DataNode[]): string[] {
  const keys: string[] = [];
  function loop(nodes: DataNode[]) {
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children) {
        loop(node.children);
      }
    });
  }
  loop(data);
  return keys;
}
export default Tree;
