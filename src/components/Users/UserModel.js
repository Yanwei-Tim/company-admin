import React, { Component } from 'react';
import { Modal, Form, Input,Cascader } from 'antd';
const FormItem = Form.Item;
class UserEditModal extends Component {
  constructor(props) {
    super(props);
    const { nodes } = this.props;
    this.state = {
      visible: false,
      parents:[],
      options:{
        value: nodes.id,
        label: nodes.nodeName,
        children: [],
      }
    };
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    const { nodes,getParents,parents } = this.props;
    const {organizationId } = this.props.record;
    getParents(organizationId);
    const loop=(data=[],children)=>{
      const options = this.state.options;
      data.map((item)=>{
        let obj={
          label:item.nodeName,
          value:item.id,
          children:[]
        };
        children.push(obj);
        loop(item.organizationList,obj["children"])
      })
    };
    loop(nodes.organizationList,this.state.options.children);
    this.setState({
      visible: true,
      parents:parents
    });
  };
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { code,name, phone,id } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="编辑员工"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          key={id}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem {...formItemLayout}
                      label="部门">
                    {
                      getFieldDecorator('organizationId', {
                        initialValue: this.state.parents,
                        rules: [
                          {
                            required: true,
                            message: '请选择部门'
                          }
                        ]
                      })(<Cascader options={[this.state.options]}  changeOnSelect={true} placeholder=""/>)
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
              label="姓名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                    rules:[
                        {
                            required:true,
                            message:"输入姓名"
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
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(UserEditModal);
