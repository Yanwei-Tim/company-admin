import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import App from "./routes/App.js";
import Login from "./routes/Login"
import Company from "./routes/Company.js";
import Community from "./routes/Community.js";
import Community_Append from "./routes/CommunityAppend.js";
import Application from "./routes/Application.js";
import ApplicationAppend from "./routes/ApplicationAppend.js";
import ApplicationEdit from "./routes/ApplicationEdit.js";
import Building from "./routes/Building.js";
import BuildingAppend from "./routes/BuildingAppend.js";
import Organization from "./routes/Organization.js";
import Authorize from "./routes/Authorize.js";
import Role from "./routes/Role.js";
import Accredit from "./routes/Accredit.js";
import AccreditCompany from "./routes/AccreditCompany.js";
import AccreditCommunity from "./routes/AccreditCommunity.js";
import Room from "./routes/Room.js";
import UsersAppend from "./routes/UsersAppend.js";
import AccreditUsers from "./routes/AccreditUsers.js";
import CommunityEdit from "./routes/CommunityEdit.js";
import Register from "./routes/Register.js";
import RegisterCompanyInfo from "./routes/RegisterCompanyInfo.js";
import RegisterCompanyPost from "./routes/RegisterCompanyPost.js";
import CompanyReview from "./routes/CompanyReview.js";
import ApplicationInfo from "./routes/ApplicationInfo.js";
import UsersEdit from "./routes/UsersEdit.js";
import OrganizationEdit from "./routes/OrganizationEdit.js";
import ApplicationCommunity from "./routes/ApplicationCommunity.js";
import FindPwd from "./routes/FindPwd.js";
function RouterConfig({ history}) {
  return (
    <Router history={history} >
      <Route  component={App} >
        <Route path="/home" component={IndexPage}  />
        <Route path="/users" component={Users} breadcrumbName="员工管理" />
         <Route path="/users"  breadcrumbName="员工管理">
             <Route path="/users/append" component={UsersAppend} breadcrumbName="新增员工"/>
             <Route path="/users/edit" component={UsersEdit} breadcrumbName="编辑员工"/>
             <Route path="/accredit/users" component={AccreditUsers} breadcrumbName="绑定角色"/>
         </Route>
        <Route path="/company" component={Company} breadcrumbName="企业设置"/>
        <Route path="/community" component={Community} breadcrumbName="社区管理" />
        <Route path="/community" breadcrumbName="社区管理">
             <Route path="/community/append" component={Community_Append} breadcrumbName="新增社区"/>
             <Route path="/community/edit" component={CommunityEdit} breadcrumbName="编辑社区"/>
             <Route path="/accredit/community" component={AccreditCommunity} breadcrumbName="社区授权"/>
             <Route path="/community/building" component={Building} breadcrumbName="楼宇管理" />
        </Route>
        <Route path="/application" component={Application} breadcrumbName="添加应用"/>
        <Route path="/application"  breadcrumbName="添加应用">
          <Route path="/application/info" component={ApplicationInfo}  breadcrumbName="功能详情"/>
          <Route path="/application/community" component={ApplicationCommunity} breadcrumbName="社区应用"/>
        </Route>
        <Route path="/application/append" component={ApplicationAppend} breadcrumbName="应用接入"/>
        <Route path="/application/conf" component={ApplicationEdit} breadcrumbName="应用配置"/>
        <Route path="/community/building" breadcrumbName="楼宇管理" >
          <Route path="/community/building/append" component={BuildingAppend} breadcrumbName="新增楼宇" />
        </Route>
        <Route path="/community" breadcrumbName="社区管理" >
          <Route  breadcrumbName="楼宇管理" >
            <Route path="/room" component={Room} breadcrumbName="房间管理"/>
          </Route>
         </Route>
        <Route path="/organization" component={Organization} breadcrumbName="组织机构" />
        <Route path="/organization" breadcrumbName="组织机构" >
          <Route path="/organization/edit" component={OrganizationEdit} breadcrumbName="编辑"/>
        </Route>

        <Route path="/role" component={Role} breadcrumbName="角色管理"/>
        <Route path="/role"  breadcrumbName="角色管理">
          <Route path="/accredit" component={Accredit} breadcrumbName="绑定权限"/>
        </Route>
        <Route path="/authorize" component={Authorize} breadcrumbName="权限管理"/>
        <Route path="/accredit/company" component={AccreditCompany} breadcrumbName="企业授权"/>

      </Route>
      <Route path="/" >
        <IndexRoute component={Login}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register} />
      <Route path="/company/info" component={RegisterCompanyInfo} />
      <Route path="/company/post" component={RegisterCompanyPost} />
      <Route path="/company/review" component={CompanyReview} />
      <Route path="/find/password" component={FindPwd} />
    </Router>
  );
}
export default RouterConfig;
