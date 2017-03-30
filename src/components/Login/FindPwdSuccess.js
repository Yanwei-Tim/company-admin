import React,{Component} from 'react';
import {Button,Icon} from 'antd';
import {Link} from 'dva/router'
import styles from './FindPwd.less';

class FindPwd extends Component{
  render(){

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          找回密码
        </div>
        <div className={styles.content}>
           <div className={styles.success_content}>
             <h2 className={styles.success_icon}>
               <Icon type="check-circle" />
             </h2>
             <h3>密码修改成功</h3>
             <p>您的密码修改成功，请用新密码重新登录账号</p>
               <Link to="/login" className={styles.link_btn}>返回登录</Link>
           </div>
        </div>
      </div>
    );
  }
}
export default FindPwd;
