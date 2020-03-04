import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import "./Modal.css";



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class ModalSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount(){
    let keys = Object.keys(this.props.columns)
    let columnsTemp = [];
    keys.forEach(element => {
    columnsTemp.push({
        'name': element,
        'checked': this.props.columns[element]  
      })
      
    });
    this.setState({ items: columnsTemp });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  changeChecked = (fieldName) => {
    let cloneItems = this.state.items;
    let index = cloneItems.findIndex(elem => elem.name === fieldName);
    cloneItems[index].checked = (cloneItems[index].checked === true) ? false : true
    this.setState({items: cloneItems})
  }  

  render() {
    const _this = this;

    let listItems = Object.keys(_this.props.columns).map(function(key) {
      if (_this.props.columns[key] === true) {
        return <div className="row">
          <input type="checkbox" checked></input>
          <p>{key}</p>
        </div>
      } else {
        return <div className="row">
          <input type="checkbox"></input>
          <p>{key}</p>
        </div>
      }
    });
    
    function saveData(){
      _this.props.changeStateData(_this.state.items)
    }
    
    return (
      <div className="tableModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    > 
                      {(item.checked === true) ? <input type="checkbox" checked onClick={this.changeChecked.bind(this, item.name)}/> : <input type="checkbox" onClick={this.changeChecked.bind(this, item.name)}/>}
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick = {this.props.closeModal} variant="secondary">Close</Button>
            <Button variant="primary" onClick={saveData}>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default ModalSelect;
