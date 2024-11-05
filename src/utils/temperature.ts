export function determineTemperatureUnits(low: number, high: number): string {
  if (low >= -45 && high <= 55) {
    return 'C';
  } else {
    return 'F';
  }
}

export function formatTemperature(low: number, high: number): string {
  const units = determineTemperatureUnits(low, high);
  return `${low}°-${high}°${units}`;
}
