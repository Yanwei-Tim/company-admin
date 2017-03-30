import React, { Component } from 'react';
import {  Form, Input,Button,Spin,Cascader } from 'antd';
const FormItem = Form.Item;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    okHandler = () => {
        const { onOk } = this.props;
       const {id}=this.props.record;
        this.props.form.validateFields((err, values) => {
            if (!err) {
              let organizationId=values.parents[values.parents.length-1];
              delete values.parents;
              onOk(Object.assign({},values,{organizationId,id}));
              this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {parents=[],nodes}=this.props;
        const {code,name,phone}=this.props.record;
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
            wrapperCol: { span: 8 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 4,
            },
        };
        return (

             <Spin spinning={false}>
               <div style={{marginTop:50}}>
                 <Form onSubmit={this.okHandler}>
                  <FormItem
                  {...formItemLayout}
                  label="部门"
              >
                  {
                      getFieldDecorator('parents', {
                          initialValue: parents.length===1?[nodes.id,parents[0]]:parents,
                          rules:[
                              {
                                  required:true,
                                  message:"选择部门"
                              }
                          ]
                      })(<Cascader options={[options]}  changeOnSelect={true} placeholder="" />)
                  }
            </FormItem>
                  <FormItem
                {...formItemLayout}
                label="工号"
            >
              {
                  getFieldDecorator('code', {
                      initialValue: code,
                      rules:[
                          {
                              required:true,
                              message:"输入工号"
                          }
                      ]
                  })(<Input />)
              }
            </FormItem>
                  <FormItem
                {...formItemLayout}
                label="名称"
            >
              {
                  getFieldDecorator('name', {
                      initialValue:name,
                      rules:[
                          {
                              required:true,
                              message:"输入名称"
                          }
                      ]
                  })(<Input />)
              }
            </FormItem>
                  <FormItem
                {...formItemLayout}
                label="手机号"
            >
              {
                  getFieldDecorator('phone', {
                      initialValue: phone,
                      rules:[
                          {
                              required:true,
                              message:"输入手机号"
                          }
                      ]
                  })(<Input />)
              }
            </FormItem>
                  <FormItem {...tailFormItemLayout} >
                    <Button type="primary" onClick={this.okHandler.bind(this)} size="large">提交</Button>
                  </FormItem>
                 </Form>
               </div>
             </Spin>
        );
    }
}
export default Form.create()(User);
