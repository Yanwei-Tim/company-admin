import React from 'react';
import {Input} from 'antd';
import styles from './Search.css';
const SearchInput=Input.Search
class Search extends React.Component{

  searchHandle=(name)=>{
    const {onSearch}=this.props;
    onSearch({name})
  }
  render(){
    const {placeholder,onSearch}=this.props;
    return (
      <div className={styles.search}>
        <SearchInput
          placeholder={placeholder}
          style={{ width: 200 }}
          onSearch={this.searchHandle}/>
      </div>
    );
  }
}
export default Search;
