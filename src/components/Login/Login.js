import React, { Component } from 'react';
import {Button, Row,Form,Input,Checkbox
} from 'antd';
import {Link} from 'dva/router'
import sha1 from 'sha1';
import md5 from 'md5';
import {signature} from '../../utils/index'
import api from '../../utils/constant';
import styles from './login.less';
import  Cookie from 'js-cookie'
const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:''
    }
  }
  handleOk(e){
     e.preventDefault();
     const {onOk}=this.props;
     this.props.form.validateFields((err, values) => {
       if (!err) {
         const timestamp=new Date().getTime();
         const nonce=Math.random().toString(36);
         const appId=api.APP_ID;
         const sign=signature(appId,timestamp,nonce);
         if(values.remember){
           Cookie.set("PROFILE-NAME",values.account,{ expires: 365, path: '' })
         }else {
           Cookie.remove("PROFILE-NAME");
         }
         delete values.remember;
         onOk(Object.assign({},values,{appId,signature:sign,timestamp,nonce,pwd:md5(sha1(values.pwd))}))//
       }
     });
  }
  componentDidMount(){
    const {logout} =this.props;
    this.setState({
      name:Cookie.get("PROFILE-NAME")
    });
    logout();
  }
  componentWillReceiveProps(nextProps){
    const {loading,isLogin,loginSuccess} =nextProps;
    if(!loading&&isLogin==1){
      loginSuccess()
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return(
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.form}>
              <div className={styles.logo}>
                <h2>登 录</h2>
              </div>
              <form onSubmit={this.handleOk.bind(this)}>
                <FormItem>
                  {getFieldDecorator('account', {
                    initialValue:this.state.name,
                    rules: [
                      {
                        required: true,
                        message: '请填写用户名'
                      }
                    ]
                  })(<Input size="large" placeholder="用户名"/>)}
                </FormItem>
                <FormItem style={{"marginBottom":"10px"}}>
                  {getFieldDecorator('pwd', {
                    rules: [
                      {
                        required: true,
                        message: '请填写密码'
                      }
                    ]
                  })(<Input size="large" type="password" placeholder="密码"/>)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                      <Checkbox>记住用户名</Checkbox>
                  )}
                  <Link to="/find/password" className={styles["login-form-forgot"]}>忘记密码</Link>
                </FormItem>
                <Row>
                  <Button type="primary" size="large" htmlType="submit" loading={loading}>
                    登录
                  </Button>
                </Row>
              </form>
            </div>
          </div>
        </div>
    )
  }
}
export default Form.create()(Login);
