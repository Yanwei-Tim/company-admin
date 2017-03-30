import React from 'react';
import styles from './Footer.css';

function Footer() {
  return (
      <footer className={styles.footer}>
          <p>
              <small>
                  智慧云（厦门）物联网有限公司 版权所有
              </small>
          </p>
          <p>
              <small>
                  Copyright &copy; Smart Cloud IOT.All Rights Reserved.
              </small>
          </p>

      </footer>
  );
}

export default Footer;
