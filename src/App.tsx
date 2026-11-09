import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { EventDetails } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2A2725] flex flex-col font-sans selection:bg-[#B89B6D] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Countdown />
        <EventDetails />
        <RSVPForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
