export const getRandomColor = () => {
  const minBrightness = 100; // Establecer un umbral mínimo para la luminosidad

  let color = `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`; // Generar un color hexadecimal aleatorio

  // Convertir el color a RGB
  const rgb = parseInt(color.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calcular la luminosidad (brillo)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Si la luminosidad es menor que el umbral mínimo, generar un nuevo color
  if (brightness < minBrightness) {
    return getRandomColor();
  }

  return color;
};

export const toSeconds = (milliseconds) => {
  return milliseconds / 1000;
};
