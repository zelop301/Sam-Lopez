import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, Sun, Moon, CloudRain, CloudLightning, Wind, Snowflake, 
  Sparkles, Compass, RefreshCw, Thermometer, Droplets, VolumeX, Radio
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface AmbientAtmosphereProps {
  lang: 'en' | 'ja';
}

interface LocationPreset {
  id: string;
  nameEn: string;
  nameJa: string;
  lat: number;
  lon: number;
  defaultIntensity: number;
  presetTheme: string;
}

const LOCATIONS: LocationPreset[] = [
  { id: 'tokyo', nameEn: 'Tokyo Neon Hub', nameJa: '東京 ネオンハブ', lat: 35.6762, lon: 139.6503, defaultIntensity: 1.4, presetTheme: 'cyberpunk' },
  { id: 'seoul', nameEn: 'Seoul Esports Arena', nameJa: 'ソウル eスポーツアリーナ', lat: 37.5665, lon: 126.9780, defaultIntensity: 1.15, presetTheme: 'chroma' },
  { id: 'reykjavik', nameEn: 'Reykjavik Aurora Station', nameJa: 'レイキャビク オーロラ観測局', lat: 64.1466, lon: -21.9426, defaultIntensity: 1.6, presetTheme: 'ice' },
  { id: 'seattle', nameEn: 'Seattle Rainy Setup', nameJa: 'シアトル レインセットアップ', lat: 47.6062, lon: -122.3321, defaultIntensity: 0.75, presetTheme: 'toxic' },
  { id: 'cyber', nameEn: 'Cosmic Void Terminal', nameJa: 'コズミック ボイド端末', lat: 0, lon: 0, defaultIntensity: 0.9, presetTheme: 'matrix' }
];

const TRANSLATIONS = {
  en: {
    title: "Ambient Atmosphere",
    subtitle: "Synchronize physical climatic metrics & telemetry to adapt background glow intensities.",
    syncBtn: "Sync Telemetry",
    syncing: "Querying Satellites...",
    realTime: "Real-World Telemetry",
    simulated: "Simulated Aura Void",
    glowIntensity: "Glow Intensity Override",
    temp: "Temp",
    humidity: "Humidity",
    wind: "Wind",
    noise: "Acoustics",
    statusText: "Atmosphere Engine Status: ONLINE",
    statusTextJa: "大気演出エンジン稼働状況：オンライン"
  },
  ja: {
    title: "環境光 ＆ 気候アトモスフィア",
    subtitle: "リアルタイムの気象データやノイズ指数と同期し、背景の発光強度や演出をダイナミックに変化させます。",
    syncBtn: "気候データ同期",
    syncing: "衛星データ照会中...",
    realTime: "気象衛星リアルタイム同期",
    simulated: "シミュレーション環境",
    glowIntensity: "発光強度調整",
    temp: "気温",
    humidity: "湿度",
    wind: "風速",
    noise: "環境音響",
    statusText: "Atmosphere Engine Status: ONLINE",
    statusTextJa: "大気演出エンジン稼働状況：オンライン"
  }
};

export const AmbientAtmosphere: React.FC<AmbientAtmosphereProps> = ({ lang }) => {
  const trans = TRANSLATIONS[lang];
  const [selectedLoc, setSelectedLoc] = useState<LocationPreset>(LOCATIONS[0]);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Weather variables
  const [temperature, setTemperature] = useState<number>(18.5);
  const [humidity, setHumidity] = useState<number>(64);
  const [windSpeed, setWindSpeed] = useState<number>(12);
  const [noiseLevel, setNoiseLevel] = useState<number>(42); // simulated ambient noise in dBA
  const [weatherCode, setWeatherCode] = useState<number>(0); // WMO weather code
  
  // Custom interactive variables
  const [glowIntensity, setGlowIntensity] = useState<number>(1.2);
  const [isPulseActive, setIsPulseActive] = useState<boolean>(true);
  const [syncFeedback, setSyncFeedback] = useState<boolean>(false);

  // Sync real-time weather using Open-Meteo free API
  const fetchWeather = async (loc: LocationPreset) => {
    if (loc.id === 'cyber') {
      // Simulate space/matrix telemetry
      setLoading(true);
      setTimeout(() => {
        setTemperature(-270.4);
        setHumidity(0);
        setWindSpeed(320); // Solar wind
        setNoiseLevel(5); // Silence of space
        setWeatherCode(99); // cosmic storm
        setGlowIntensity(0.9);
        setLoading(false);
      }, 600);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      
      const curr = data.current;
      setTemperature(curr.temperature_2m);
      setHumidity(curr.relative_humidity_2m);
      setWindSpeed(curr.wind_speed_10m);
      setWeatherCode(curr.weather_code);

      // Generate a dynamic ambient noise dBA based on wind speed and climate
      const baseNoise = 32 + Math.floor(curr.wind_speed_10m * 0.8);
      setNoiseLevel(Math.min(baseNoise, 75));

      // Adapt background glow intensity to local weather humidity & temperature
      // Higher humidity or extreme temperature creates more vapor/glow dispersion
      let computedGlow = loc.defaultIntensity;
      if (curr.relative_humidity_2m > 75) computedGlow += 0.25; // mist dispersion
      if (curr.weather_code >= 51) computedGlow += 0.3; // rain or storm glows brighter
      if (curr.weather_code >= 95) computedGlow += 0.45; // thunderstorms flare up
      
      setGlowIntensity(parseFloat(computedGlow.toFixed(2)));
    } catch (e) {
      console.warn("Weather sync failed, using mock cyberpunk defaults:", e);
      // Fallback to high-quality localized values
      const randOffset = Math.random() * 4 - 2;
      setTemperature(parseFloat((15 + randOffset).toFixed(1)));
      setHumidity(Math.floor(55 + Math.random() * 20));
      setWindSpeed(Math.floor(8 + Math.random() * 12));
      setNoiseLevel(Math.floor(38 + Math.random() * 10));
      setWeatherCode(3); // cloudy
      setGlowIntensity(loc.defaultIntensity);
    } finally {
      setLoading(false);
    }
  };

  // Trigger when preset location changes
  useEffect(() => {
    if (!isSimulated) {
      fetchWeather(selectedLoc);
    } else {
      // Setup customized simulation preset values
      if (selectedLoc.id === 'tokyo') {
        setTemperature(24.2); setHumidity(78); setWindSpeed(14); setNoiseLevel(62); setWeatherCode(3); setGlowIntensity(1.5);
      } else if (selectedLoc.id === 'seoul') {
        setTemperature(21.0); setHumidity(50); setWindSpeed(8); setNoiseLevel(55); setWeatherCode(0); setGlowIntensity(1.2);
      } else if (selectedLoc.id === 'reykjavik') {
        setTemperature(4.5); setHumidity(88); setWindSpeed(28); setNoiseLevel(45); setWeatherCode(71); setGlowIntensity(1.75);
      } else if (selectedLoc.id === 'seattle') {
        setTemperature(13.2); setHumidity(95); setWindSpeed(16); setNoiseLevel(38); setWeatherCode(53); setGlowIntensity(0.8);
      } else {
        setTemperature(-270); setHumidity(0); setWindSpeed(400); setNoiseLevel(2); setWeatherCode(99); setGlowIntensity(0.9);
      }
    }
  }, [selectedLoc, isSimulated]);

  // Synchronize dynamic CSS properties in the DOM root in real-time
  useEffect(() => {
    document.documentElement.style.setProperty('--ambient-glow-intensity', glowIntensity.toString());
  }, [glowIntensity]);

  // Handle manual sync button click
  const handleSyncClick = () => {
    audioSystem.playSuccess();
    setSyncFeedback(true);
    setTimeout(() => setSyncFeedback(false), 1200);
    fetchWeather(selectedLoc);
  };

  // Get appropriate weather icon & label based on WMO weather code
  const getWeatherVisuals = () => {
    // Custom space weather
    if (selectedLoc.id === 'cyber') {
      return {
        icon: <Radio className="text-violet-400 animate-pulse" size={40} />,
        descEn: "Cosmic Pulsar Wind",
        descJa: "極小宇宙背景放射"
      };
    }

    if (weatherCode === 0) {
      return {
        icon: <Sun className="text-amber-400 animate-spin-slow" size={40} />,
        descEn: "Solar Clearance",
        descJa: "快晴・サンシャイン"
      };
    } else if (weatherCode >= 1 && weatherCode <= 3) {
      return {
        icon: <Cloud className="text-zinc-300 animate-bounce-slow" size={40} />,
        descEn: "Scattered Nebulae",
        descJa: "薄曇り・大気分散"
      };
    } else if (weatherCode >= 51 && weatherCode <= 67) {
      return {
        icon: <CloudRain className="text-teal-400 animate-pulse" size={40} />,
        descEn: "Precipitation Flow",
        descJa: "降雨・ネオンシャワー"
      };
    } else if (weatherCode >= 71 && weatherCode <= 77) {
      return {
        icon: <Snowflake className="text-sky-300 animate-pulse" size={40} />,
        descEn: "Cryo Freeze Storm",
        descJa: "降雪・冷却結晶"
      };
    } else if (weatherCode >= 80 && weatherCode <= 82) {
      return {
        icon: <CloudRain className="text-blue-400" size={40} />,
        descEn: "High Density Downpour",
        descJa: "激しいゲリラ豪雨"
      };
    } else if (weatherCode >= 95) {
      return {
        icon: <CloudLightning className="text-purple-400 animate-bounce" size={40} />,
        descEn: "Cyber Thunderstrike",
        descJa: "雷雨・電磁嵐"
      };
    } else {
      return {
        icon: <Wind className="text-emerald-400 animate-pulse" size={40} />,
        descEn: "Atmospheric Wind Vector",
        descJa: "強風気流・ウインド"
      };
    }
  };

  const visuals = getWeatherVisuals();

  return (
    <section className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-3xl relative overflow-hidden group">
      {/* Background soft glow linked to glow intensity */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-teal-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{ filter: `blur(40px) opacity(${Math.min(glowIntensity * 0.45, 1.0)})` }}
      />

      <div className="relative bg-[#070708]/90 border border-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 overflow-hidden text-left">
        <div className="absolute top-4 right-4 text-purple-400/30 group-hover:text-purple-400/70 transition-colors pointer-events-none">
          <Compass size={24} className="animate-spin-slow" />
        </div>

        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400 font-mono block mb-1 font-bold">
            {lang === 'ja' ? 'アトモスフィア統計' : 'AMBIENT CLIMATIC ENGINE'}
          </span>
          <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-zinc-100">
            {trans.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
            {trans.subtitle}
          </p>
        </div>

        {/* Dynamic weather indicators & Location chooser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
          {/* Preset buttons */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    audioSystem.playClick();
                    setSelectedLoc(loc);
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border select-none cursor-pointer ${
                    selectedLoc.id === loc.id
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-200 font-bold shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                  }`}
                >
                  {lang === 'ja' ? loc.nameJa : loc.nameEn}
                </button>
              ))}
            </div>

            {/* Mode selection & Sync */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={isSimulated}
                  onChange={(e) => {
                    audioSystem.playClick();
                    setIsSimulated(e.target.checked);
                  }}
                  className="rounded border-zinc-700 bg-zinc-950 text-purple-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span className="text-xs font-mono text-zinc-400 hover:text-zinc-200">
                  {lang === 'ja' ? 'シミュレーターモード' : 'Manual Simulation Mode'}
                </span>
              </label>

              <button
                disabled={loading}
                onClick={handleSyncClick}
                onMouseEnter={() => audioSystem.playHover()}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border-none bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white shadow-lg active:scale-95 disabled:opacity-50`}
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                <span>{loading ? trans.syncing : trans.syncBtn}</span>
              </button>
            </div>
          </div>

          {/* Large climatic status circle */}
          <div className="lg:col-span-5 p-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl">
            <div className="bg-[#030303]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-5 relative overflow-hidden">
              {/* Dynamic decorative backdrop wave */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5 pointer-events-none"
                animate={isPulseActive ? {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="shrink-0 relative z-10 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                {visuals.icon}
              </div>

              <div className="relative z-10">
                <span className="text-[9px] uppercase tracking-wider text-teal-400 font-mono block mb-0.5">
                  {lang === 'ja' ? '大気ステータス' : 'LOCAL ENVIRONMENT'}
                </span>
                <h4 className="text-base font-bold text-zinc-200 truncate">
                  {lang === 'ja' ? visuals.descJa : visuals.descEn}
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">
                  {isSimulated ? "SIMULATED TELEMETRY" : "SAT-LINK ACTIVE"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Climatic Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group/metric">
            <div className="flex items-center gap-2 mb-1.5 text-zinc-400 group-hover/metric:text-purple-400 transition-colors">
              <Thermometer size={14} />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{trans.temp}</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-200">
              {temperature > -250 ? `${temperature}°C` : `${temperature}°K`}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group/metric">
            <div className="flex items-center gap-2 mb-1.5 text-zinc-400 group-hover/metric:text-purple-400 transition-colors">
              <Droplets size={14} />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{trans.humidity}</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-200">
              {humidity}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group/metric">
            <div className="flex items-center gap-2 mb-1.5 text-zinc-400 group-hover/metric:text-purple-400 transition-colors">
              <Wind size={14} />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{trans.wind}</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-200">
              {windSpeed} <span className="text-xs text-zinc-500">{selectedLoc.id === 'cyber' ? 'km/s' : 'km/h'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group/metric">
            <div className="flex items-center gap-2 mb-1.5 text-zinc-400 group-hover/metric:text-purple-400 transition-colors">
              <Radio size={14} />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{trans.noise}</span>
            </div>
            <div className="text-xl font-bold font-mono text-zinc-200">
              {noiseLevel} <span className="text-xs text-zinc-500">dBA</span>
            </div>
          </div>
        </div>

        {/* Glow Intensity Overrider Control */}
        <div className="p-4 bg-[#030303]/75 rounded-2xl border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  {trans.glowIntensity}
                </span>
                <span className="text-xs font-mono font-bold text-teal-400">
                  {(glowIntensity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.5"
                step="0.05"
                value={glowIntensity}
                onChange={(e) => {
                  setGlowIntensity(parseFloat(e.target.value));
                }}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
            </div>

            <div className="flex items-center gap-2 sm:self-end">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={isPulseActive}
                  onChange={(e) => {
                    audioSystem.playClick();
                    setIsPulseActive(e.target.checked);
                  }}
                  className="rounded border-zinc-700 bg-zinc-950 text-teal-400 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {lang === 'ja' ? 'アトモスフィア脈動' : 'Climatic Pulse'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Interactive feedback particle layer */}
        <AnimatePresence>
          {syncFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-teal-500/5 border border-teal-500/20 rounded-3xl pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 bg-zinc-950/90 border border-teal-500/30 px-4 py-2 rounded-2xl shadow-xl">
                <Sparkles size={14} className="text-teal-400 animate-spin" />
                <span className="text-xs font-mono font-bold text-teal-300">
                  {lang === 'ja' ? '衛星大気データを同期しました！' : 'Atmospheric conditions successfully calibrated!'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping shrink-0" />
            <span>{lang === 'ja' ? trans.statusTextJa : trans.statusText}</span>
          </p>
          <span className="text-[9px] font-mono text-zinc-600">
            v2.4-CLIMATIC
          </span>
        </div>
      </div>
    </section>
  );
};
