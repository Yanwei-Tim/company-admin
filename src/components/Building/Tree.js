import React,{Component} from 'react';
import { Table,Pagination ,message,Button,Tag,Tree,Row,Col,Input} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
class TreeComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      size:20,
      current:1
    }
  }
  render(){
    const {treeProps,treeData,onPageChange,onSearch}=this.props;
    const pagination={
      total:treeData.count,
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
    const children=treeData.data.map((node)=>{
      return ( <TreeNode title={node.name} key={node.id} />)
    });
    return (
      <div>
        <Search style={{ width: '85%' }} placeholder="社区名称" onSearch={onSearch} />
        <br/>
        <Tree {...treeProps}>
          <TreeNode title="全部社区" key="0-0">
            {children}
          </TreeNode>
        </Tree>
        <br/>
        <Pagination size="small" {...pagination}/>
      </div>
    );
  }
}
export default TreeComponent;
