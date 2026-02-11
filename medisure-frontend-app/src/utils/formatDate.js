export default function formatDate(dateString) {
  if (!dateString) return "N/A";

  // Expecting YYYY-MM-DD
  const [year, month, day] = dateString.split("-");

  if (!year || !month || !day) return "Invalid Date";

  return `${day}/${month}/${year}`; // DD/MM/YYYY
}