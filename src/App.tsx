import WeatherCard from './components/WeatherCard';
import './styles/glass.css';

const cities = [
  "Ciudad de México,MX",
  "Guadalajara,MX",
  "Monterrey,MX",
  "Puebla,MX",
  "Cancún,MX",
  "Tijuana,MX"
];

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Clima MX
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Pronóstico en tiempo real con diseño Liquid Glass
          </p>
        </header>

        {/* Cities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <WeatherCard key={index} city={city} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Datos proporcionados por OpenWeatherMap • Actualizado en tiempo real
          </p>
        </footer>
      </div>
    </div>
  );
}