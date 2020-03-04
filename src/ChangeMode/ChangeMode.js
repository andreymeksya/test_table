import React from 'react';

class ChangeMode extends React.Component {
  render() {
    const commentsUrl = `http://jsonplaceholder.typicode.com/comments`;
    const todosUrl = `https://jsonplaceholder.typicode.com/todos`;
    return (
        <div style={{display:'flex', 
                     justifyContent:'center', 
                     margin: '10px', 
                     padding: '50px 0'}}>
            <button style={{width: "150px"}} onClick={()=>this.props.onSelect(commentsUrl)} type="button" class="btn btn-outline-secondary">Comments</button>
            <button style={{width: "150px"}} onClick={()=>this.props.onSelect(todosUrl)} type="button" class="btn btn-outline-secondary">Todos</button>
        </div>
    );
  }
}

export default ChangeMode;