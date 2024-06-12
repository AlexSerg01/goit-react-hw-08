import ContactsForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import css from "./App.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/selectors";

export default function App() {
  const err = useSelector(selectError);
  const load = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className={css.main}>
        <h1>Phonebook</h1>
        <ContactsForm />
        <SearchBox />
      </div>
      {!err && load && <div>Loading...</div>}
      <ContactList />
    </div>
  );
}
