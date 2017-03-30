import React from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import CompanyModel from '../components/Company/CompanyModel';
import UploadModel from '../components/Company/UploadModel';
import styles from './Company.less'
function Company({dispatch,data,loading,OSS}) {
  console.log(OSS)
  const {company,logoUrl="http://img.iqcloud.cc/headImg/ic_default_head.png",boss,phone,address,fax,email,contract,contractPhone,readme}=data;
  function editHandler(values) {
    dispatch({
      type: 'company/patch',
      payload: values,
    });
  }
  return (
    <div className={styles.company_setting}>
      <Spin spinning={loading}>
        <div className={styles.main_bd}>
            <div className={styles.account_setting_area}>
                <h3 className={styles.sub_title}>企业信息</h3>
                <ul>
                  {/*<li className={styles.account_setting_item}>
                   <h4>头像</h4>
                   <div className={styles.meta_opr}>
                   <UploadModel  record={data} onOk={editHandler}>
                   <a id="changeHeadImg" href="javascript:;">修改头像</a>
                   </UploadModel>
                   </div>
                   <div className={styles.meta_content}>
                   <img className={styles.meta_pic} src={logoUrl} />
                   </div>
                   </li>*/}
                    <li className={styles.account_setting_item}>
                      <h4>名称</h4>
                      <div className={styles.meta_opr}>
                        <CompanyModel record={data} onOk={editHandler}>
                          <a href="javascript:;">修改</a>
                        </CompanyModel>

                      </div>
                      <div className={styles.meta_content}>
                        {company}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>法人代表</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {boss}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>联系电话</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {phone}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>地址</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {address}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>传真</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {fax}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>电子邮箱</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {email}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>联系人</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {contract}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>联系人电话</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {contractPhone}
                      </div>
                    </li>
                    <li className={styles.account_setting_item}>
                      <h4>备注</h4>
                      <div className={styles.meta_opr}>
                      </div>
                      <div className={styles.meta_content}>
                        {readme}
                      </div>
                    </li>
                </ul>
            </div>
        </div>
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  const { data} = state.company;
  const { OSS} = state.utils;
  return {
    loading:state.loading.models.company,
    data,
    OSS
  };
}
export default connect(mapStateToProps)(Company);

