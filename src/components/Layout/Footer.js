import React from 'react';
import styles from './main.less';
import config from '../../utils/config'
function Footer(props) {
  return (
    <div className={styles.footer}>
      {config.footerText}
    </div>
  );
}

export default Footer;
