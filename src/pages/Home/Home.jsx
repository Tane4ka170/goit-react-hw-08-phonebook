import s from './Home.module.css';

export default function Home() {
  return (
    <div style={s.container}>
      <h1 style={s.title}>
        Contacts manager welcome page{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </h1>
    </div>
  );
}
