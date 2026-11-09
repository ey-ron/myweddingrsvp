import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';

function App() {
  return (
    <div className="bg-[#FAF8F5] text-[#2A2725] flex flex-col font-sans selection:bg-[#B89B6D] selection:text-white">
      <main className="w-full">
        <Hero />
        <EventDetails />
        <RSVPForm />
      </main>
    </div>
  );
}

export default App;
