import { useEffect, useState, useCallback } from 'react';

type Weather = {
  main: { temp: number; humidity: number; feels_like: number };
  weather: { description: string; icon: string }[];
  name: string;
  wind: { speed: number };
  sys: { country: string };
  dt: number;
};

type Props = {
  city: string;
};

export default function WeatherCard({ city }: Props) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const base = import.meta.env.VITE_OPENWEATHER_BASE || 'https://api.openweathermap.org/data/2.5';
      const key = import.meta.env.VITE_OPENWEATHER_KEY;
      if (!key) throw new Error('API key no encontrada en VITE_OPENWEATHER_KEY');
      const url = `${base}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}&lang=es`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const json = await res.json();
      setData(json);
      
      // Actualizar hora
      const now = new Date();
      setTime(now.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    } catch (e: any) {
      setError(e.message || 'Error al obtener clima');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => { 
    fetchWeather();
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  if (loading) return (
    <div className="liquid-glass p-8 max-w-sm mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-white/30 rounded-full animate-spin"></div>
        </div>
        <p className="text-white/70 text-sm">Cargando datos climáticos...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="liquid-glass p-8 max-w-sm mx-auto">
      <div className="text-center">
        <div className="text-red-300 text-4xl mb-4">⚠️</div>
        <p className="text-red-300 text-sm">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-sm"
          onClick={fetchWeather}
        >
          Reintentar
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  const icon = data.weather[0]?.icon;
  const desc = data.weather[0]?.description;

  return (
    <div className="liquid-glass p-8 max-w-sm mx-auto relative overflow-hidden">
      {/* Border animation */}
      <div className="liquid-glass-border"></div>
      
      {/* City and time */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-white">{data.name}</h2>
          <p className="text-sm text-white/60">{data.sys.country}</p>
        </div>
        <div className="text-right">
          <div className="text-white/80 text-sm">Actualizado</div>
          <div className="text-white font-semibold">{time}</div>
        </div>
      </div>

      {/* Weather icon and description */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        {icon && (
          <div className="relative">
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
              alt={desc} 
              className="w-24 h-24 drop-shadow-lg"
            />
          </div>
        )}
        <div>
          <p className="text-5xl font-bold text-white mb-2">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-sm text-white/70 capitalize">{desc}</p>
        </div>
      </div>

      {/* Additional weather data */}
      <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-white/60 mb-1">Sensación</p>
          <p className="text-xl font-semibold text-white">{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-white/60 mb-1">Humedad</p>
          <p className="text-xl font-semibold text-white">{data.main.humidity}%</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-white/60 mb-1">Viento</p>
          <p className="text-xl font-semibold text-white">{Math.round(data.wind.speed)} km/h</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-white/60 mb-1">Condición</p>
          <p className="text-lg font-semibold text-white capitalize truncate">{desc}</p>
        </div>
      </div>

      {/* Update button */}
      <div className="mt-8 relative z-10">
        <button 
          className="w-full py-3 bg-linear-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-white font-medium"
          onClick={fetchWeather}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar los datos
          </span>
        </button>
      </div>
    </div>
  );
}