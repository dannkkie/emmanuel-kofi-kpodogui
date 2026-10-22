export function downloadFuneralCalendarEvent() {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Emmanuel Kofi Kpodogui Memorial//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:funeral-kpodogui-20261024@emmanuel-kofi-kpodogui",
    "DTSTAMP:20261022T000000Z",
    "DTSTART:20261024T070000Z",
    "DTEND:20261024T140000Z",
    "SUMMARY:Funeral Service of Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die)",
    "DESCRIPTION:Memorial and Burial Service celebrating the life of Ex-WO1 Emmanuel Kofi Kpodogui (1954 - 2026).\\nPre-Burial: 07:00 AM | Burial Service: 08:30 AM\\nAttire: Black & White / Military Blues",
    "LOCATION:Garrison Methodist and Presbyterian Church (GMPC), Burma Camp, Accra, Ghana",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Ex-WO1-Emmanuel-Kofi-Kpodogui-Service.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
