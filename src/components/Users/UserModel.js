import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
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
    const { code,name, phone } = this.props.record;
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
        >
          <Form onSubmit={this.okHandler}>
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
                  initialValue: name,
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
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
