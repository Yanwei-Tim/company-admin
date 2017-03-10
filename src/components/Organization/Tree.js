import React,{Component} from 'react';
import {Pagination ,Tree,Input} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
class TreeComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      size:20,
      current:1,
      defaultExpandedKeys:[this.props.eid],
      defaultSelectedKeys:[this.props.eid]
    }
  }
  render(){
    const {loadData,rootData,eid, nodesData,onPageChange,onSearch,selectHandler}=this.props;
    const props={
      showLine:true,
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
      }
    };
    const pagination={
      total:rootData.count,
      pageSize:this.state.size,
      simple:true,
      current:this.state.current,
      onChange:(page)=>{
        this.setState({
          current:page
        });
        onPageChange(page)
      }
    };
    const generatorNode=(eid,nodes)=>{
      if(!nodes){
        return false
      }
      let arr=[];
      nodes.organizationList&&nodes.organizationList.map((node)=>{
        const children=node.organizationList;
        let _arr=[];
        if(children&&children.length){
            children.map((_node)=>{
              _arr.push(
                <TreeNode title={_node.nodeName} key={_node.id} isOrgan={true} disabled={_node.disable} parentId={_node.parentId} eid={_node.eid} isLeaf={!_node.organizationList||_node.organizationList.length==0}></TreeNode>
              );
              generatorNode(_node)
            });
        }
        arr.push(
          <TreeNode title={node.nodeName} key={node.id} isOrgan={true} disabled={node.disable} parentId={node.parentId} eid={node.eid} isLeaf={!node.organizationList||node.organizationList.length==0}>{_arr}</TreeNode>
        );
      });
      if(eid===nodes.eid){
        return (
          <TreeNode title={nodes.nodeName} key={nodes.id} isOrgan={true} disabled={nodes.disable} parentId={nodes.parentId}  eid={nodes.eid}>
            {arr}
          </TreeNode>
        )
      }
    };
    const generator=(roots,nodes)=>{
       return roots.map((root)=>{
          return ( <TreeNode title={root.company} key={root.id} isOrgan={false} disabled={root.disable}>
            {
              generatorNode(root.id,nodes)
            }
          </TreeNode>)
        })
    };
    return (
      <div>
        <Search placeholder="企业名称" onSearch={onSearch} style={{"width":"65%"}}/>
        <Tree {...props} expandedKeys={this.state.expandedKeys}>
            {generator(rootData.data,nodesData)}
        </Tree>
        <br/>
        <Pagination size="small" {...pagination}/>
      </div>
    );
  }
}
export default TreeComponent;