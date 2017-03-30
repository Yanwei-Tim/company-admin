import React,{Component} from 'react';
import {Form,Input,Row,Col,Button} from 'antd';
import StepsComponent from '../../components/Register/Steps';
import styles from './Company.css';
const FormItem=Form.Item;
class Register extends Component{
  constructor(props){
    super(props);
  }
  handleOk(e){
    e.preventDefault();
    const {onOk}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { loading,company,code } = this.props;
    const formItemLayout = {
      labelCol: { span: 2},
      wrapperCol: { span: 8}
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 2,
      },
    };
    return (
      <div className={styles.container}>
        <StepsComponent titles={["基本信息","信息登记","提交审核"]} current={1}/>
        <div className={styles.content}>
          <h3 className={styles.title}>企业信息登记</h3>
          <article className={styles.description}>
              <h5 className={styles["description-title"]}>本平台致力于打造真实、合法、有效的管理平台。为了更好的保障您和广大用户的合法权益，请认真填写一下登记信息</h5>
              <h5>用户信息审核通过后：</h5>
              <ol className={styles.list}>
                 <li>您可以依法享有本企业账号所产生的权益和收益；</li>
                 <li>您将对本企业账号的所有行为承担全部责任；</li>
                 <li>您的注册信息将在法律允许的范围内想企业用户展示；</li>
                 <li>人民法院、检察机关、公安机关等司法机关可向智慧云依法调查您的企业信息等。</li>
              </ol>
          </article>
          <div style={{"marginTop":"50px"}}>
            <Form onSubmit={this.handleOk.bind(this)} autoComplete="off" hideRequiredMark>
               <FormItem {...formItemLayout} label="企业名称" colon={false}  extra="须与当地政府颁发的商业许可证书或者企业注册证书上的企业名称完全一致，信息审核成功后企业名称不可修改" className={styles["cloud-form-item"]}>
                {getFieldDecorator('company', {
                  initialValue:company,
                  rules: [
                    {
                      required: true,
                      message: '请填写企业名称'
                    }
                  ]
                })(<Input size="large" placeholder="" autoComplete="false" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="营业执照号" extra="15位营业执照注册号或者18位统一信用代码" colon={false} className={styles["cloud-form-item"]}>
                {getFieldDecorator('code', {
                  initialValue:code,
                  rules: [
                    {
                      required: true,
                      min:15,
                      max:18,
                      message: '请填写15位营业执照注册号或者18位统一信用代码'
                    }
                  ]
                })(<Input size="large"  placeholder="" autoComplete="off" />)}
              </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" size="large" htmlType="submit" loading={loading} className={styles.button}>
                    下一步
                  </Button>
                </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Register);
