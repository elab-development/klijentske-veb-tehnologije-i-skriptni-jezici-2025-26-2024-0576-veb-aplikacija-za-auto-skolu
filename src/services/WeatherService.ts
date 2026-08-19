const belgradeCoordinates = {
  latitude: 44.8125,
  longitude: 20.4612,
};

interface OpenMeteoDailyResponse {
  daily?: {
    precipitation_probability_max?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    time?: string[];
    weather_code?: number[];
    wind_speed_10m_max?: number[];
  };
}

export interface DailyWeatherForecast {
  condition: string;
  date: string;
  precipitationProbability: number;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  windSpeedMax: number;
}

const weatherCodeLabels: Record<number, string> = {
  0: 'Vedro',
  1: 'Pretežno vedro',
  2: 'Delimično oblačno',
  3: 'Oblačno',
  45: 'Magla',
  48: 'Magla sa injem',
  51: 'Slaba rosulja',
  53: 'Umerena rosulja',
  55: 'Jaka rosulja',
  61: 'Slaba kiša',
  63: 'Umerena kiša',
  65: 'Jaka kiša',
  71: 'Slab sneg',
  73: 'Umeren sneg',
  75: 'Jak sneg',
  80: 'Slabi pljuskovi',
  81: 'Umereni pljuskovi',
  82: 'Jaki pljuskovi',
  95: 'Grmljavina',
  96: 'Grmljavina sa gradom',
  99: 'Jaka grmljavina sa gradom',
};

const getWeatherCondition = (weatherCode: number) => {
  return weatherCodeLabels[weatherCode] ?? 'Promenljivo vreme';
};

export const getBelgradeDailyForecast = async (
  date: string,
): Promise<DailyWeatherForecast> => {
  const params = new URLSearchParams({
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
    end_date: date,
    latitude: String(belgradeCoordinates.latitude),
    longitude: String(belgradeCoordinates.longitude),
    start_date: date,
    timezone: 'Europe/Belgrade',
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Vremenska prognoza trenutno nije dostupna.');
  }

  const data = (await response.json()) as OpenMeteoDailyResponse;
  const daily = data.daily;
  const weatherCode = daily?.weather_code?.[0];
  const temperatureMax = daily?.temperature_2m_max?.[0];
  const temperatureMin = daily?.temperature_2m_min?.[0];
  const precipitationProbability = daily?.precipitation_probability_max?.[0];
  const windSpeedMax = daily?.wind_speed_10m_max?.[0];
  const forecastDate = daily?.time?.[0];

  if (
    forecastDate === undefined ||
    weatherCode === undefined ||
    temperatureMax === undefined ||
    temperatureMin === undefined ||
    precipitationProbability === undefined ||
    windSpeedMax === undefined
  ) {
    throw new Error('Nema prognoze za izabrani datum.');
  }

  return {
    condition: getWeatherCondition(weatherCode),
    date: forecastDate,
    precipitationProbability,
    temperatureMax,
    temperatureMin,
    weatherCode,
    windSpeedMax,
  };
};
