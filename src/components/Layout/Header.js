import React from 'react';
import {Row,Col} from 'antd'
import {Link} from 'dva/router';
import styles from './Header.less';
import {getSession} from '../../utils/index'
function Header() {
  const user=getSession("PROFILE");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Row type="flex" align="middle" className={styles.row}>
          <Col span={20}>
            <Link to="home" className={styles.logo}/>
            <Link to="home" className={styles.company}/>
          </Col>
          <Col span={4} className={styles.operation}>
            <Link to="login" className={styles['logout-link']}>退出</Link>
             <span className={styles.avatar} style={{"backgroundImage":`url(${user.headImgUrl})`}}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Header;
