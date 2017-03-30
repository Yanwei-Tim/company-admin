import React from 'react';
import {Menu,Button,Icon,Switch} from 'antd';
import {Link} from 'dva/router';
import styles  from './Sider.less';
import classnames from 'classnames';
const SubMenu = Menu.SubMenu;
class Sider extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidUpdate(){
    this.props.setHeight(this.refs.sider.clientHeight)
  }

  render(){
    const {pathname,search,key}=this.props.location;
    const {list=[]}=this.props;
    const {tools,users,lock,vcard,popup,cog,bag,active,container,toolsActive,usersActive,lockActive,vcardActive,popupActive,cogActive,bagActive,role,roleActive}=styles;
    const linkStyle=(name,activeStyle,path)=>{
      const link=pathname+search+key
      return classnames({
        [name]:link===path,
        [active]:link===path,
        [activeStyle]:link===path
      })
    }
    return (
      <div className={container} id="sider" ref="sider">
        <dl className={styles['menu-group']}>
          <dt>管理</dt>
          <dd className={linkStyle(tools,toolsActive,'/community')}><Link to="community">社区管理</Link></dd>
          <dd className={linkStyle(users,usersActive,'/users')}><Link to="users">员工管理</Link></dd>
          <dd className={linkStyle(lock,lockActive,'/authorize')}><Link to="authorize">权限管理</Link></dd>
          <dd className={linkStyle(role,roleActive,'/role')}><Link to="role">角色管理</Link></dd>
        </dl>
        <dl className={styles['menu-group']}>
          <dt>企业</dt>
          <dd className={linkStyle(vcard,vcardActive,'/company')}><Link to="company">企业信息</Link></dd>
          <dd className={linkStyle(popup,popupActive,'/organization')}><Link to="organization">组织机构</Link></dd>
        </dl>
        <dl className={styles['menu-group']}>
          <dt>应用</dt>
          {/*<dd className={linkStyle(cog,cogActive,'system')}><Link to="system">系统设置</Link></dd>*/}
          {
            list.map((item)=>{
              let linkProps={
                pathname:item.groupFlag===0?`/application/info`:`/application/community`,
                query:{id:item.id,key:item.groupFlag},
                state:{record:item}
              }
              return (<dd key={Math.random()} className={linkStyle(cog,cogActive,`/info?id=${item.id}&key=${item.groupFlag}`)} ><Link to={linkProps}  >{item.name}</Link></dd>)
            })
          }
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

}
export default Sider;
