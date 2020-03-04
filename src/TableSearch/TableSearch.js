import React from "react";

class TableSearch extends React.Component {
  state = {
    value: "",
  };
  valueChangeHandler = event => {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  };
  render() {
    const this_ = this;
    function searchData() {
      this_.props.onSearch(document.getElementById("search-field").value);
    }
    return (
      <div className="input-group mb-3 mt-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary" onClick={searchData}>
            Search
          </button>
        </div>
        <input
          type="text"
          className="form-control"
          id="search-field"
          onChange={this.valueChangeHandler}
          value={this.state.value}
        />
          <button className="btn btn-outline-secondary" onClick={this.props.changeModelState} >
            Open Modal
        </button>
      </div>
    );
  }
}

export default TableSearch;
