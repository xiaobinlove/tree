import React, { FC, ReactNode, useState, useMemo, useEffect, ComponentType } from 'react';
import './tree.less';
import classnames from 'classnames';
import { CaretRightOutlined } from '@ant-design/icons';
type Key = string
type ExpandKey = {
  [key: Key]: boolean
}
type LevelKey = {
  [key: Key]: number
}
export type DataNode = {
  disabled?: boolean // 是否禁用节点
  key: Key; // 节点唯一标识
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
  defaultExpand?: number | 'all'; // 0 all 1 一级
  icon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode); // 树形控件节点的图标，可以是React节点或函数类型
  NodeRender?: ComponentType<NodeProps>;
  selectedKey?: Key // （受控）设置选中的树节点
  onSelect?: (selectedKey: Key, selectedNode: DataNode, e: Event) => void; // 选中节点的回调函数
}
const defaultNodeRender: ComponentType<NodeProps> = ({ data }) => <span>{data.title}</span>
const Tree: FC<IProps> = ({ disabled = false, icon, treeData, NodeRender = defaultNodeRender, selectedKey, onSelect, defaultExpand: _defaultExpand = 0 }) => {
  const defaultExpand = _defaultExpand === 'all' ? 99999 : _defaultExpand;
  const expandMap = useMemo(() => {
    let expandMap: ExpandKey = {}
    function loop(nodes: DataNode[], level: number) {
      nodes.forEach((node) => {
        expandMap[node.key] = level <= defaultExpand
        if (node.children) {
          loop(node.children, level + 1);
        }
      });
    }
    loop(treeData, 0);
    return expandMap
  }, [treeData])
  const [expandMapObj, setExpandMap] = useState(() => expandMap)
  const handleExpand = (key: Key) => {
    expandMap[key] = !expandMap[key]
    setExpandMap({ ...expandMapObj, [key]: !expandMap[key] })
  };
  const handleSelect = (item: DataNode, e: Event) => {
    if (disabled || item.disabled) {
      return;
    }
    onSelect?.(item.key, item, e)
  };
  const renderTreeNodes = (nodes: DataNode[]) => {
    return nodes.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandMap[item.key];
      const isSelected = selectedKey === item.key;
      const switcherRotate = isExpanded ? 90 : 0;
      const nodeIcon = item.icon || icon || null
      return (
        <div key={item.key} data-key={item.key} className={classnames('zov-tree__node')}>
          {/* 展开/收起 */}
          {
            <span
              className={classnames('zov-tree__switcher', { 'zov-tree--hidden': !hasChildren })}
              onClick={() => handleExpand(item.key)}
            >
              <CaretRightOutlined style={{ transform: `rotate(${switcherRotate}deg)` }} />
            </span>
          }
          <span
            className={classnames('zov-tree__node-content-wrapper', { 'zov-tree__node-content-wrapper--selected': isSelected, 'zov-tree__node-content-wrapper--disabled': disabled || item.disabled })}
            onClick={(e: any) => handleSelect(item, e)}
          >
            {/* 自定义节点图标 */}
            {nodeIcon && (<span className="zov-tree__icon">{typeof nodeIcon === 'function' ? nodeIcon({ expanded: isExpanded }) : nodeIcon}</span>)}
            {/* 标题 */}
            <NodeRender data={item} />
          </span>
          {/* 递归渲染子节点 */}
          {hasChildren && <div className={classnames({ 'zov-tree__children': true, 'zov-tree__node--hide': !isExpanded })}>{renderTreeNodes(item.children!)}</div>}
        </div>
      );
    });
  };

  return <div className="zov-tree">{renderTreeNodes(treeData)}</div>;
};
export default Tree;
