import React, { Component } from 'react';
import {  Form, Input,Button,Spin } from 'antd';

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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
                this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading}=this.props;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 2,
            },
        };
        const {id,title}=this.props.record;
        return (

             <Spin spinning={false}>
               <span>
                 <Form onSubmit={this.okHandler}>
              <FormItem
                  {...formItemLayout}
                  label="部门"
              >
                  {
                      getFieldDecorator('organizationId', {
                          initialValue: id,
                          rules:[
                              {
                                  required:true,
                                  message:"选择部门"
                              }
                          ]
                      })(<span className="ant-form-text">{title}</span>)
                  }
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="工号"
            >
              {
                  getFieldDecorator('code', {
                      initialValue: '',
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
                      initialValue: '',
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
                      initialValue: '',
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
               </span>
             </Spin>


        );
    }
}
export default Form.create()(User);