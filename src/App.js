import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import ChangeMode from './ChangeMode/ChangeMode';
import TableSearch from './TableSearch/TableSearch';
import Modal from './Modal/Modal'
import _ from 'lodash';
import AddUser from './AddUser/AddUser';

class App extends Component {
  state ={
    isChangeMode: false,
    isLoading: false,
    isOpenModal: false,
    data: [],
    columns: {},
    search: '',
    sort: 'asc',  // 'desc'
    sortField: 'id',
    row: null,
    currentPage: 0,
  }
  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
   
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
    
    
    let keys = Object.keys(data[0]);
    let columnsTemp = {};
    keys.forEach(element => {
      columnsTemp[element] = true;
    });
    this.setState({ columns: columnsTemp });

  }

  changeStateData = (columns) =>{
    let tempColumns = {}
    columns.forEach(element => {
      tempColumns[element.name] = element.checked;
    })
  
    let tempData = [];
    
    
    this.state.data.forEach(row => {
      let tempObj = {}
      columns.forEach(elem => {

        
          tempObj[elem.name] = row[elem.name];
        })
      tempData.push(tempObj)
    })
    
  
    this.setState(
      {
        columns: tempColumns,
        data: tempData
      }
    )
  }
  
  changeModelState = () => {
    if (this.state.isOpenModal === false){
      this.setState({isOpenModal: true})
    } else {
      this.setState({isOpenModal: false})
    }
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField.key, sort);
    this.setState({ data, sort, sortField })
  }
 
  changeModeHandler = url => {  
    // console.log(url)
    this.setState({
      isChangeMode: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  


  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  
  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
   var result = data.filter(item => {
     let keys = Object.keys(this.state.columns); 
     let resAr = []
     keys.forEach(key => resAr.push(item[key].toString().toLowerCase().includes(search.toLowerCase())))
     return (
          (resAr.every(elem => elem === false) === true) ? false : true
     );
   });
   if(!result.length){
     result = this.state.data
   }
    return result
  }

  render() {
    const this_ = this
    
    const pageSize = 20;
    if(!this.state.isChangeMode){
      return (
        <div className="container">
          <ChangeMode onSelect={this.changeModeHandler}/>
        </div>
      )
    }
   
    const filteredData = this.getFilteredData();
    // debugger
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler} changeModelState={this.changeModelState}/>
            {(this.state.isOpenModal === true) ? <Modal columns={this.state.columns} closeModal={this.changeModelState} changeStateData={this.changeStateData}/> : ''}
            <Table 
              columns={this.state.columns}
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              
            />
          </React.Fragment>
      }
      
      {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }

    
      </div>
    );
  }
}

export default App;
