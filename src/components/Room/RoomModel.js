import React, { Component } from 'react';
import { Modal, Form, Input,Switch } from 'antd';

const FormItem = Form.Item;

class RoomModel extends Component {

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
        onOk(Object.assign({},values));
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, code,ownerName,ownerPhone } = this.props.record;
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
          title="编辑"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="编号"
            >
              {
                getFieldDecorator('code', {
                  initialValue: code,
                })(<span className="ant-form-text">{code}</span>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间号"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业主"
            >
              {
                getFieldDecorator('ownerName', {
                  initialValue: ownerName
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业主手机"
            >
              {
                getFieldDecorator('ownerPhone', {
                  initialValue: ownerPhone
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoomModel);
