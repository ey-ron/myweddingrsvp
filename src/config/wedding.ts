export const WEDDING_CONFIG = {
  couple: {
    partner1: "Aaron",
    partner2: "Eileen",
    monogram: "A & E",
    fullTitle: "Aaron & Eileen",
  },
  date: {
    display: "Sunday, April 11, 2027",
    time: "4:00 PM",
    isoDate: "2027-04-11T16:00:00",
    calendarTitle: "Wedding of Aaron & Eileen",
    calendarDescription: "Join us in celebrating our wedding! Please arrive 15-30 minutes early.",
  },
  venue: {
    name: "Mt. Carmel Parish Church",
    city: "",
    country: "",
    address: "Mt. Carmel Parish Church",
    googleMapsUrl: "https://maps.app.goo.gl/p5YX9vzFD33irEPB8",
  },
  schedule: [
    {
      time: "01:00 PM",
      title: "Pre-Wedding",
      location: "Rio Villa",
      mapUrl: "https://maps.app.goo.gl/ZLPgkDo3a6gscz1B9",
      description: "Groomsmen and Bridesmaids moments.",
      image: "./riovilla.jpeg",
    },
    {
      time: "01:30 PM",
      title: "Wedding Ceremony",
      location: "Mt. Carmel Parish Church",
      mapUrl: "https://maps.app.goo.gl/p5YX9vzFD33irEPB8",
      description: "Exchange of vows and blessing.",
      image: "./mtcarmel.jpeg",
    },
    {
      time: "02:00 PM",
      title: "Reception & Program",
      location: "The Chapters",
      mapUrl: "https://maps.app.goo.gl/Er1iJFEG5BsBR24R9",
      description: "Celebration, dining, and toasts.",
      image: "./thechapter.jpeg",
    },
  ],
  dressCode: {
    title: "Wedding Attire",
    gentlemen: "White or beige polo/top and black pants",
    ladies: "Light green dress",
    description: "Gentlemen: White or beige polo/top with black pants. Ladies: Light green dress.",
  },
  notes: {
    rsvpDeadline: "March 19, 2026",
  },
  accommodations: [
    {
      name: "The Greenery",
      description: "Lighthouse & scenic green fields",
      mapUrl: "https://maps.app.goo.gl/yJkWaJY4kYRdtiJZ6",
      image: "./greenery.jpeg",
    },
    {
      name: "River Safari Resort",
      description: "Bali-inspired scenic river resort",
      mapUrl: "https://maps.app.goo.gl/yJkWaJY4kYRdtiJZ6",
      image: "./river safari.jpeg",
    },
  ],
  entourage: {
    parents: {
      groom: [
        { role: "Father", name: "Mr. Pedro Serrano" },
        { role: "Mother", name: "Mrs. Noemi Serrano" },
      ],
      bride: [
        { role: "Father", name: "Mr. Eddie Sto Domingo" },
        { role: "Mother", name: "Mrs. Lydia Sto Domingo" },
      ],
    },
    principalSponsors: [
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
      { ninong: "AAA", ninang: "BBB" },
    ],
    honorAttendants: {
      bestMan: { name: "Avril Lennon Serrano", role: "Best Man" },
      matronOfHonor: { name: "Elaine Sto Domingo", role: "Matron of Honor" },
    },
    bridalParty: {
      groomsmen: ["AAA", "AAA", "AAA"],
      bridesmaids: ["BBB", "BBB", "BBB", "BBB", "BBB", "BBB", "BBB"],
    },
    littleOnes: [
      { role: "Coin Bearer", name: "AAA" },
      { role: "Ring Bearer", name: "BBB" },
      { role: "Bible Bearer", name: "AAA" },
      { role: "Flower Girl", name: "BBB" },
    ],
  },
};

