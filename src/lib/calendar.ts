export function generateIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Memorial//Ex-WO1 Emmanuel Kofi Kpodogui//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:funeral-kpodogui-20261024T070000Z@burmacamp",
    "DTSTAMP:20261023T120000Z",
    "DTSTART:20261024T070000Z",
    "DTEND:20261024T130000Z",
    "SUMMARY:Celebration of Life: Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die)",
    "DESCRIPTION:Celebration of Life and Burial Service for Ex-WO1 Emmanuel Kofi Kpodogui (1954 – 2026) at Garrison Methodist and Presbyterian Church, Burma Camp, Accra.",
    "LOCATION:Garrison Methodist and Presbyterian Church, Burma Camp, Accra, Ghana",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Emmanuel-Kofi-Kpodogui-Memorial-Service.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
