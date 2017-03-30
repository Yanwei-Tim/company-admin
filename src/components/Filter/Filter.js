import React from 'react';
import {Select,Cascader } from 'antd'
import styles from './Filter.css';
class Filter extends React.Component{
   constructor(props){
      super(props);
      this.state={
        defaultValue:this.props.parents
      }
   }
  changeHandler=(node)=>{
    const {onChange}=this.props;
    onChange(node[node.length-1]);
  }
  displayRender=(label, selectedOptions)=>{
     if(label.length>3){
       return label.slice(3,label.length).join(' / ');
     }
     return label.join(' / ');
  }
    render(){
     let {nodes,style,placeholder="请选择",allowClear=true}=this.props;
     const options = {
       value: nodes.id,
       label: nodes.nodeName,
       children: [],
     };
     const loop=(data=[],children)=>{
       data.map((item)=>{
          let obj={
            label:item.nodeName,
            value:item.id
          };
         children.push(obj);
         if(item.organizationList.length){
           obj.children=[];
           loop(item.organizationList,obj["children"])
         }
       })
     }
     loop(nodes.organizationList,options.children);
     return(
         <Cascader options={[options]} placeholder={placeholder}  onChange={this.changeHandler} style={style} changeOnSelect={true}   displayRender={this.displayRender} allowClear={allowClear} />
       )
   }
}
export default Filter;
