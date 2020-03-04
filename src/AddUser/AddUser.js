import React from 'react';


class AddUser extends React.Component {
  render() {
    const this_ = this
    function addField(){
    var inpValue = document.getElementsByClassName("inp");
    this_.props.addField({id: inpValue[0].value,
                         firstName: inpValue[1].value,
                         lastName: inpValue[2].value,
                         phone: inpValue[3].value,
                         email: inpValue[4].value,
                        })
    }
    return (
      <div>
        <input className="inp"></input>
        <input className="inp"></input>
        <input className="inp"></input>
        <input className="inp"></input>
        <input className="inp"></input>
        <button onClick={addField}>КНОПКА</button>
      </div>
    );
  }
}

export default AddUser;