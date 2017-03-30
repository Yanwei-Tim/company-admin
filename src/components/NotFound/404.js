import React from 'react';
import styles from './404.less';
function NotFound({location}) {

  return (
    <div className={styles.container}>
     <div className={styles.content}>
           <h1 className={styles.title}>404</h1>
           <p>
             你要找的页面不存在
             <a href="javascript:void(0)" onClick={()=>{window.history.go(-1)}}>点击返回</a>
           </p>
     </div>
    </div>
  );
}
export default NotFound;
