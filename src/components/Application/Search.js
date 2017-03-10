import React,{ Component } from 'react';
import {Button,Form,Input,Row,Col,Select} from 'antd';
import AppModel from './AppModel'
import styles from './Search.css';
const SearchInput = Input.Search;
class Search extends Component  {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleSubmit(value){
    const { search } = this.props;
    search({name:value})
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };
    const {createHandler}=this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span="16" className={styles['ant-advanced-create-btn']}>
          <AppModel record={{}} onOk={createHandler} title="新增应用" >
            <Button type="primary">新增应用</Button>
          </AppModel>
        </Col>
        <Col span="8" className={styles['ant-advanced-search-form']}>
          <SearchInput
            placeholder="应用名称"
            style={{ width: 200,float:'right' }}
            onSearch={this.handleSubmit.bind(this)}
          />
        </Col>
      </Row>

    );
  }
}

export default Form.create()(Search);
