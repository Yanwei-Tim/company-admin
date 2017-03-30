import React,{Component} from 'react';
import {Form,Input,Row,Col,Button} from 'antd';
import {Link} from 'dva/router'
import md5 from 'md5';
import sha1 from 'sha1';
import api from '../../utils/constant';
import CountDown from '../../components/CountDown/CountDown';
import styles from './FindPwd.less';
const FormItem=Form.Item;
class FindPwd extends Component{
  constructor(props){
    super(props);
    this.state={
      text:'获取验证码',
      disabled:false,
      valid:""
    }
  }
  handleOk(e){
    e.preventDefault();
    const {onOk}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const appId=api.APP_ID;
        onOk(Object.assign({},values,{appId,newPwd:md5(sha1(values.newPwd))}));
      }
    });
  }
  codeHandle=()=>{
    const {getCode}=this.props;
    const phone=this.props.form.getFieldValue('phone');
    if(phone){
      getCode(phone);
      return true;
    }
    return false;
  }
  validAccount=(account)=>{
    const {checkAccount}=this.props;
    if(account.target.value){
      checkAccount(account.target.value);
    }
  }
  componentWillReceiveProps(nextProps){
    const { status,loading, isLogin,loginSuccess} = nextProps;
    if(!loading&&isLogin==1){
      loginSuccess()
    }
    switch (status){
      case 0:
        this.setState({
          valid:"error"
        });
        break;
      case 1:
        this.setState({
          valid:"success"
        });
        break;
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14}
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };
    return (
      <div className={styles.container}>
        <div className={styles.title}>
           找回密码
        </div>
        <div className={styles.content}>
          <Row>
            <Col span={12}>
              <Form onSubmit={this.handleOk.bind(this)} autoComplete="off" hideRequiredMark>
                <FormItem {...formItemLayout} label="手机号" colon={false} hasFeedback className={styles["cloud-form-item"]}>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: '请填写正确的手机号'
                      }
                    ]
                  })(<Input size="large" placeholder="" autoComplete="false" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="验证码" colon={false} className={styles["cloud-form-item"]}>
                  <Row gutter={8}>
                    <Col span={16}>
                      {getFieldDecorator('validCode', {
                        rules: [
                          {
                            required: true,
                            message: '请填写验证码'
                          }
                        ]
                      })(
                        <Input size="large" />
                      )}
                    </Col>
                    <Col span={8}>
                      <CountDown
                        auto={false} // 自动开始
                        times={60} // 正向计时 时间起点为0秒
                        intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回//
                        setCode={this.codeHandle}
                      />
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="新密码" extra="字母、数字或者英文符号，最短8位，区分大小写" colon={false} hasFeedback className={styles["cloud-form-item"]}>
                  {getFieldDecorator('newPwd', {
                    rules: [
                      {
                        required: true,
                        min:8,
                        message: '密码不符合要求'
                      }
                    ]
                  })(<Input size="large" type="password" placeholder="" autoComplete="off" />)}
                </FormItem>
                <Row>
                  <FormItem {...tailFormItemLayout} colon={false}>
                    <Button type="primary" size="large" htmlType="submit" loading={loading} className={styles.button}>
                      提 交
                    </Button>
                  </FormItem>
                </Row>
              </Form>
            </Col>
            <Col span={12}>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Form.create()(FindPwd);
