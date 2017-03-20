import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
class TreeComponent extends React.Component {
    componentDidMount() {
    }
    render() {
        const {loadData,rootData={}, nodesData,selectHandler,draggable,onDrop}=this.props;
        const props={
            showLine:true,
            draggable:draggable,
            loadData:(node)=>{
                this.setState({
                    expandedKeys:[node.props.eventKey]
                });
                return new Promise((resolve) => {
                    setTimeout(() => {
                        loadData(node);
                        resolve();
                    }, 1000);
                });
            },
            onSelect:(key,node)=>{
                selectHandler(node)
            },
            onDrop:(node)=>{
                const {title,eventKey,nodeFlag,isOrgan,eid}=node.dragNode.props;
                const target=node.node.props.eventKey;
                if(isOrgan){
                    onDrop({
                        nodeName:title,
                        nodeFlag,
                        id:eventKey,
                        parentId:target,
                        eid
                    })
                }
            }
        };
        const loop = (data=[]) => data.map((item) => {
            if (item.organizationList&&item.organizationList.length>0) {
                return <TreeNode title={item.nodeName}  key={item.id} isOrgan={true} nodeFlag={item.nodeFlag} eid={item.eid}>{loop(item.organizationList)}</TreeNode>;
            }
            return <TreeNode title={item.nodeName} key={item.id} isLeaf={true}  nodeFlag={item.nodeFlag}  isOrgan={true} eid={item.eid}></TreeNode>;
        });
        const treeNodes = loop(nodesData.organizationList);
        return (
            <Tree {...props}>
                <TreeNode title={rootData.company} key={rootData.id}>
                    <TreeNode title={nodesData.nodeName} key={nodesData.id} eid={nodesData.eid} isOrgan={true}  nodeFlag={nodesData.nodeFlag} >
                        {treeNodes}
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}

export default TreeComponent;