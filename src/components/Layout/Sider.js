import React from 'react';
import {Menu,Button,Icon,Switch} from 'antd';
import {Link} from 'dva/router';
import styles  from './Sider.less';
import classnames from 'classnames'
const SubMenu = Menu.SubMenu;
function Sider({location}) {
  const {pathname}=location;
  const {tools,users,lock,vcard,popup,cog,bag,active,container,toolsActive,usersActive,lockActive,vcardActive,popupActive,cogActive,bagActive,role,roleActive}=styles;
  const linkStyle=(name,activeStyle,path)=>{
    return classnames({
      [name]:pathname.indexOf(path)===-1,
      [active]:pathname.indexOf(path)>-1,
      [activeStyle]:pathname.indexOf(path)>-1
    })
  }
  return (
    <div className={container}>
      <dl className={styles['menu-group']}>
        <dt>管理</dt>
        <dd className={linkStyle(tools,toolsActive,'community')}><Link to="community">社区管理</Link></dd>
        <dd className={linkStyle(users,usersActive,'users')}><Link to="users">员工管理</Link></dd>
        <dd className={linkStyle(lock,lockActive,'authorize')}><Link to="authorize">权限管理</Link></dd>
        <dd className={linkStyle(role,roleActive,'role')}><Link to="role">角色管理</Link></dd>
      </dl>
      <dl className={styles['menu-group']}>
        <dt>企业</dt>
        <dd className={linkStyle(vcard,vcardActive,'company')}><Link to="company">企业信息</Link></dd>
        <dd className={linkStyle(popup,popupActive,'organization')}><Link to="organization">组织机构</Link></dd>
      </dl>
      <dl className={styles['menu-group']}>
        <dt>应用</dt>
        {/* <dd className={linkStyle(cog,cogActive,'system')}><Link to="system">系统设置</Link></dd>
          <dd className={linkStyle(bag,bagActive,'application')}><Link to="application">应用管理</Link></dd>*/}
        <dd >
          <div className={styles.appendApp}>
            <Link to="application">
              <Icon type="plus" /> 添加应用功能
            </Link>

          </div>
        </dd>
      </dl>
    </div>
  );
}
export default Sider;
