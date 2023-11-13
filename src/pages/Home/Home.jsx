import s from './Home.module.css';

export default function Home() {
  return (
    <div className={s.homeContainer}>
      <h1 className={s.homeTitle}>
        Getting Started with the Phonebook
        <span className={s.homeIcon} role="img" aria-label="Greeting icon">
          ☎
        </span>
      </h1>
      <p className={s.homeContent}>
        Phonebook - an accessible application that is constantly within reach,
        eliminating the need to search for crucial contacts in your notes. Now,
        all your contacts are conveniently stored on your phone. The intuitive
        interface enables swift addition of new contacts, and a user-friendly
        filter allows you to effortlessly organize contacts by name, eliminating
        the need to scroll through endless lists. Welcome to Phonebook, and may
        you have a pleasant day!
      </p>
    </div>
  );
}
