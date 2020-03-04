import React from "react";


class Table extends React.Component {
  render() {
    const _this = this;
    let headers = Object.keys(_this.props.columns).map(function(key) {
    if (_this.props.columns[key] === true) {
      return <th onClick={_this.props.onSort.bind(null, {key})}>
                {key.toUpperCase()}{" "}
                {_this.props.sortField === {key} ? <small>{_this.props.sort}</small> : null}
              </th>
    }
    });
  
    
    return (
      <div>
        <table className="table" style={{ cursor: "pointer" }}>
          <thead>
            <tr>
              {headers}
      
              
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item => (
              <tr
                key={Math.random().toString().substring()}
              >
                {Object.keys(item).map(function(key) {
                  if (_this.props.columns[key] === true) {
                    return <td>{item[key]}</td>;
                  }
                })}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
