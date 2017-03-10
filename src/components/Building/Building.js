import React,{Component} from 'react';
import {Form,Button,Input,message} from 'antd';
const FormItem=Form.Item;
class Building extends Component{
  constructor(props){
    super(props);
  }
  submitHandler(){
    const {onOk}=this.props;
    this.props.form.validateFields((err,values)=>{
        if(!err){
          onOk(values);
          this.props.form.resetFields()
        }
    })
  }
  render(){
    const {getFieldDecorator}=this.props.form;
    const {name,id}=this.props.record;
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
      <div>
          <Form vertical onSubmit={this.submitHandler.bind(this)}>
            <FormItem {...formItemLayout} label='所属社区'>
              {getFieldDecorator(`communityId`,{
                 initialValue:id,
                rules:[
                  {
                    required: true,
                    message: '请选择社区'
                  }
                ]
              })(
                <span className="ant-form-text">{name}</span>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='楼宇名称'>
              {getFieldDecorator(`name`,{
                rules:[
                  {
                    required: true,
                    message: '请填写楼宇名称'
                  }
                ]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='楼宇编号'>
              {getFieldDecorator(`code`,{
                rules:[
                  {
                    required: true,
                    message: '请填写楼宇编号'
                  }
                ]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout} >
              <Button type="primary" htmlType="submit" size="large">提交</Button>
            </FormItem>
          </Form>
      </div>
    );
  }

}

export default Form.create()(Building);
