import React from 'react';
import {Link} from 'dva/router'
import styles from './Header.less';
function Header({showRegister,showLogin}) {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <Link to="login" className={styles.logo}></Link>
            <Link to="login" className={styles.company}></Link>
            {
                showRegister?(<span className={styles['register-link']}>
                还没有账号?
                 <Link to="register">立即注册</Link>
            </span>):""

            }
          {
            showLogin?(<span className={styles['register-link']}>
                 已有账号?
                 <Link to="/login">立即登录</Link>
            </span>):""
          }
        </div>
    </div>
  );
}

export default Header;
