import React ,{Component}from 'react';
import { Form, Input, Button } from 'antd';
import styles from './Search.css';
const FormItem = Form.Item;

class Search extends Component{
  constructor(props){
    super(props);
  }
  submitHandler(){
    const {onSearch}=this.props;
    this.props.form.validateFields((err,values)=>{
        if(!err){
          onSearch(values)
        }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span:0 },
      wrapperCol: { span: 24},
    };
    return (
      <div className={styles.container}>
        <Form layout="inline" onSubmit={this.submitHandler.bind(this)}>
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`number`)(
                  <Input placeholder="房间编号"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`houseNumber`)(
                  <Input placeholder="房间号"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`ownerName`)(
                  <Input placeholder="业主"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label=''>
                <Button type="primary" htmlType="submit" >搜索</Button>
              </FormItem>


        </Form>
      </div>
    );
  }
}

export default Form.create()(Search);
