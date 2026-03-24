// src/lib/utils/dateFormatter.ts

function getTimezoneOffset(): number {
  return -new Date().getTimezoneOffset() / 60; // Retorna offset en horas
}

export function dateFormatter(dateString: string): string {

  // convertir la fecha a utc-5


  // Parsear la fecha en formato MM-DD-YYYY HH:MM:SS
  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = timePart.split(':');

  const postDate = new Date(
    parseInt(year),
    parseInt(month) - 1, // Los meses en JavaScript son 0-indexados
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );

  const offset = getTimezoneOffset() * 60 * 60 * 1000;
  const dateUTC = new Date(postDate.getTime() + offset);

  const diffDays = Math.floor((new Date().getTime() - dateUTC.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Hoy, ${dateUTC.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Si es más antigua, mostrar la fecha formateada
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  console.log(dateUTC);


  return new Intl.DateTimeFormat('es-MX', options).format(dateUTC);
}