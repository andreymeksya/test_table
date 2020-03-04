import React from 'react';


class AdditionalRowView extends React.Component {
  render() {
    return (
      <div>
        <p>Выбран пользователь <b>{this.props.person.firstName + ' ' + this.props.person.lastName}</b></p>
        <p>Описание: <br />
        <textarea defaultValue={this.props.person.description} />
        </p>
 
        <p>Адрес проживания: <b>{this.props.person.address.streetAddress}</b></p>
        <p>Город: <b>{this.props.person.address.city}</b></p>
        <p>Провинция/штат: <b>{this.props.person.address.state}</b></p>
        <p>Индекс: <b>{this.props.person.address.zip}</b></p>
      </div>
    );
  }
}

export default AdditionalRowView;