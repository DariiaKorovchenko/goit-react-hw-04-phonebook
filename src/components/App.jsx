import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useLocalStorage('Contacts', []);
  const [filter, setFilter] = useState('');
  localStorage.setItem('Contacts', JSON.stringify(contacts));

  const getContactListData = data => {
    const currentContact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    const including = contacts.some(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );
    if (including) {
      alert(`${data.name} is already in contacts.`);
    } else {
      setContacts([...contacts, currentContact]);
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={getContactListData} />

      <h2>Contacts</h2>
      <Filter value={filter} filterData={changeFilter} />

      {filter === null ? (
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      ) : (
        <ContactList
          contacts={visibleContacts()}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
}
