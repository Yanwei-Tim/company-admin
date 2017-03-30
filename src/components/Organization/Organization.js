import React, { Component } from 'react';
import { Spin, Form, Input,Select,Cascader,Button } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
class OrganModel extends Component {
  constructor(props) {
    super(props);
  }
  okHandler = () => {
    const { onOk } = this.props;
    const {id}=this.props.record;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let parentId=values.parents[values.parents.length-1];
        let result=Object.assign({},values,{nodeName:values.node_Name,id,parentId});
        delete result.node_Name;
        delete result.parents;
        onOk(result);
      }
    });
  };
  render() {
    const {children,loading,nodes,parents=[]}=this.props;
    const {getFieldDecorator}=this.props.form;
    const {nodeName,id,nodeFlag,code}=this.props.record;
    const node_Name=nodeName;
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
    };
    loop(nodes.organizationList,options.children);
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 4,
      },
    };
    return (
    <Spin spinning={loading}>
      <div style={{marginTop:50}}>
         <Form  onSubmit={this.okHandler}>
              <FormItem {...formItemLayout} label='上级机构'>
                {getFieldDecorator('parents',{
                  initialValue:parents.length===1?[nodes.id]:parents.slice(0,parents.length-1),
                  rules:[
                    {
                      required: true,
                      message: '选择上级'
                    }
                  ]
                })(
                  <Cascader options={[options]}  changeOnSelect={true} placeholder=""/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='编号'>
                {getFieldDecorator('code',{
                  initialValue:code,
                  rules:[
                    {
                      required: true,
                      message: '请填写编号'
                    }
                  ]
                })(
                  <Input />
                )}
              </FormItem>
           <FormItem {...formItemLayout} label='机构名称'>
                {getFieldDecorator('node_Name',{
                  initialValue:node_Name,
                  rules:[
                    {
                      required: true,
                      message: '请填写机构名称'
                    }
                  ]
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='机构标志'>
                {getFieldDecorator('nodeFlag',{
                  initialValue:nodeFlag+"",
                  rules:[
                    {
                      required: true,
                      message: '机构标志'
                    }
                  ]
                })(
                  <Select>
                    <Option value="0">总部</Option>
                    <Option value="1">大区公司</Option>
                    <Option value="2">省级公司</Option>
                    <Option value="3">市级公司</Option>
                    <Option value="4">县级公司</Option>
                    <Option value="9">部门</Option>
                    <Option value="10">岗位</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout} >
                  <Button type="primary" onClick={this.okHandler.bind(this,id)} size="large">提交</Button>
                </FormItem>
              </Form>
      </div>
    </Spin>
    );
  }
}
export default Form.create()(OrganModel);
