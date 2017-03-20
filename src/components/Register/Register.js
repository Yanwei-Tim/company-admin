import React,{Component} from 'react';
import {Form,Input,Row,Col,Button} from 'antd';
import md5 from 'md5';
import sha1 from 'sha1';
import CountDown from '../../components/CountDown/CountDown'
import styles from './Register.css';
const FormItem=Form.Item;
let time=60;
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'获取验证码',
            disabled:false
        }
    }
    handleOk(e){
        e.preventDefault();
        const {onOk}=this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //md5(sha1(values.pwd))
                const appId="3e8e82198a0f4a6fa69n2718a75cbe02";
                onOk(Object.assign({},values,{appId,pwd:md5(sha1(values.pwd))}));
            }
        });
    }
    timer=()=>{
        if(time!==60){
            this.setState({
                disabled:true
            })
        }else {
            time--
        }


    }
    codeHandle=()=>{
        const {getCode}=this.props;
        const phone=this.props.form.getFieldValue('phone');
        if(phone){
            this.timer();
            getCode(phone);
            return true;
        }
        return false;
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 8}
        };
        return (
            <div className={styles.container}>
                <Row>
                    <Col span={12}>
                    </Col>
                    <Col span={10}>
                        <Form onSubmit={this.handleOk.bind(this)} autoComplete="off">
                            <FormItem hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写手机号'
                                        }
                                    ]
                                })(<Input size="large" placeholder="用户名" autoComplete="false" />)}
                            </FormItem>
                            <FormItem>
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
                                            times={5} // 正向计时 时间起点为0秒
                                            intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回//
                                            setCode={this.codeHandle}
                                        />
                                    </Col>
                                </Row>

                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('pwd', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写密码'
                                        }
                                    ]
                                })(<Input size="large" type="password" placeholder="密码" autoComplete="off"/>)}
                            </FormItem>
                            <Row>
                                <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                    登录
                                </Button>

                            </Row>
                        </Form>
                    </Col>
                </Row>


            </div>
        );
    }

}

export default Form.create()(Register);
