import React from 'react';
import styles from './Steps.css';
import {Row,Col} from 'antd'
class Steps extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current:0
    }
  }
  render(){
    const {titles=[],current=0} =this.props;
    const steps=((list,index)=>{
      let arr=[];
      for(let i=0;i<list.length;i++){
         if(index===i){
           i===0?arr.push(<Col span={8} className={styles['step-current-0']} key={i}>{list[i]}</Col>):arr.push(<Col span={8} className={styles['step-current']} key={i}>{list[i]}</Col>)
         } else {
           arr.push (<Col span={8}  key={i}>{list[i]}</Col>)
         }
      }
      return arr;
    })(titles,current);
    return (
      <div className={styles.container}>
        <Row type="flex">
          {
            steps
          }
        </Row>
      </div>
    )
  }
}
export default Steps;
