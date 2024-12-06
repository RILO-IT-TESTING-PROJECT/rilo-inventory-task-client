import Navbar from '../../components/Navbar/page';

export default function HomePage() {
  return (
    <>
      <Navbar page="home" />
      <main className="p-8">
        <h1>Welcome to MyApp!</h1>
      </main>
    </>
  );
}
