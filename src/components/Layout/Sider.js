import React from 'react';
import {Menu,Button,Icon,Switch} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less';
import config  from '../../utils/config'
const SubMenu = Menu.SubMenu;
function Sider({location,darkTheme,changeTheme}) {
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        <span>{config.logoText}</span>
      </div>
      <Menu
        mode="inline"
        theme={darkTheme}
      >
        {/*<Menu.Item key="1"><Link to="home"><Icon type="home"/>我的首页</Link></Menu.Item>
        <Menu.Item key="sub1"><Link to="company"><Icon type="laptop"/>企业管理</Link></Menu.Item>
        <Menu.Item key="sub2"><Link to="organization"><Icon type="windows-o"/>组织机构</Link></Menu.Item>
        <Menu.Item key="sub3"><Link to="community"><Icon type="pie-chart" />社区管理</Link></Menu.Item>
        <Menu.Item key="sub4"><Link to="application"><Icon type="appstore-o"/>应用管理</Link></Menu.Item>*/}

        <Menu.Item key="1"><Link to="home"><Icon type="home"/>我的首页</Link></Menu.Item>
        <Menu.Item key="sub2"><Link to="organization"><Icon type="windows-o"/>组织机构</Link></Menu.Item>
        <SubMenu key="sub3" title={<span><Icon type="pie-chart" /><span>社区</span></span>}>
          <Menu.Item key="sub3-0"><Link to="community">社区管理</Link></Menu.Item>
          <Menu.Item key="sub3-1"><Link to="community/append">新增社区</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="cloud-o" /><span>楼宇</span></span>}>
          <Menu.Item key="sub4-0"><Link to="building">楼宇管理</Link></Menu.Item>
          <Menu.Item key="sub4-1"><Link to="building/append">新增楼宇</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub8" title={<span><Icon type="share-alt" /><span>权限角色</span></span>}>
          <Menu.Item key="sub8-0"><Link to="authorize">权限管理</Link></Menu.Item>
          <Menu.Item key="sub8-1"><Link to="role">角色管理</Link></Menu.Item>
        </SubMenu>
       <SubMenu key="sub6" title={<span><Icon type="team" /><span>员工</span></span>}>
          <Menu.Item key="sub6-0"><Link to="users">员工管理</Link></Menu.Item>
          <Menu.Item key="sub6-1"><Link to="users/append">新增员工</Link></Menu.Item>
        </SubMenu>
      </Menu>
      <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch checkedChildren="黑" unCheckedChildren="白" onChange={changeTheme} defaultChecked={darkTheme}/>
      </div>
    </div>
  );
}
export default Sider;
