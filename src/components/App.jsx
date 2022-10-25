import React, { Component } from 'react';
import { Contacts } from './Contacts/Contacts';
import { FormEl } from './Form/Form';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PhonebookContainer, ContactsMassage } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  getCheckedContacts = name => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  formSubmitHandler = ({ name, number }) => {
    const checkNewContact = this.getCheckedContacts(name);

    if (checkNewContact) {
      Notify.info(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <PhonebookContainer>
        <h1>Phonebook</h1>
        <FormEl onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {this.state.contacts.length !== 0 ? (
          <>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ul>
              {visibleContacts.map(contact => (
                <Contacts
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  number={contact.number}
                  onDelete={this.deleteContact}
                />
              ))}
            </ul>
          </>
        ) : (
          <ContactsMassage>
            Your phonebook is empty, add your first contact
          </ContactsMassage>
        )}
      </PhonebookContainer>
    );
  }
}
