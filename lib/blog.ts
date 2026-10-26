import type { StaticImageData } from "next/image";
import doorDings from "../assets/door_dings_1.jpg";
import garageDoorDamage from "../assets/garage_door_damage_1.jpg";
import hailDamage from "../assets/hail_damage_1.jpg";

/**
 * Blog posts, newest first by date (posts sharing a date keep the order
 * written here). To publish a post, add an entry: the blog index, the post
 * page, the home page teaser and the sitemap all read from this list.
 */

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** Closing brand line, set apart from the body. */
  | { type: "tagline"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Card summary and meta description. */
  excerpt: string;
  image: StaticImageData;
  imageAlt: string;
  body: BlogBlock[];
};

const POSTS: BlogPost[] = [
  {
    slug: "car-park-dent-removal-tauranga",
    title: "Car Park Dent Removal in Tauranga",
    date: "2025-09-03",
    excerpt:
      "Got a car park dent or door ding? DentLabNZ provides mobile car dent removal in Tauranga, the Bay of Plenty and Waikato, without traditional panel beating and repainting.",
    image: doorDings,
    imageAlt: "Door ding on a vehicle panel before paintless dent removal",
    body: [
      {
        type: "p",
        text: "Got a car park dent or door ding? DentLabNZ provides mobile car dent removal in Tauranga, the Bay of Plenty and Waikato, helping vehicle owners repair minor dents without traditional panel beating and repainting.",
      },
      { type: "h2", text: "What is paintless dent removal?" },
      {
        type: "p",
        text: "Paintless dent removal (PDR) is a specialist technique that reshapes damaged vehicle panels while preserving the original factory paint, where suitable. It can be an affordable alternative to conventional car dent repair.",
      },
      { type: "h2", text: "What dents can be repaired?" },
      { type: "p", text: "We assess a range of vehicle dents, including:" },
      {
        type: "ul",
        items: [
          "Car park dents and door dings.",
          "Minor dents in car doors and guards.",
          "Small dents caused by everyday knocks.",
          "Suitable panel damage where the paint remains intact.",
        ],
      },
      {
        type: "p",
        text: "Deep creases, damaged paint and certain panel locations may require alternative repair methods.",
      },
      {
        type: "h2",
        text: "Mobile car dent repair across the Bay of Plenty and Waikato",
      },
      {
        type: "p",
        text: "Our mobile PDR service makes car dent removal convenient for customers in Tauranga, Mount Maunganui, Papamoa, Rotorua, Hamilton and surrounding areas within our service region.",
      },
      {
        type: "p",
        text: "We also offer a 10% price-beat guarantee on eligible competing written quotes, subject to our terms and conditions.",
      },
      {
        type: "p",
        text: "Need car dent removal near you? Contact DentLabNZ and send us photos of your vehicle's damage for an initial assessment and quote.",
      },
      {
        type: "tagline",
        text: "DentLabNZ — Dents Happen. We make them disappear.",
      },
    ],
  },
  {
    slug: "garage-door-dent-repair-tauranga-waikato",
    title: "Garage Door Dent Repair in Tauranga and Waikato",
    date: "2026-04-25",
    excerpt:
      "Reversed your ute into the garage door? Before replacing the entire door, find out whether the damage can be repaired.",
    image: garageDoorDamage,
    imageAlt: "Dent in a steel sectional garage door panel",
    body: [
      {
        type: "p",
        text: "Reversed your ute into the garage door? Before replacing the entire door, find out whether the damage can be repaired.",
      },
      {
        type: "p",
        text: "DentLabNZ offers mobile garage door dent removal for suitable damage across Tauranga, the Bay of Plenty and Waikato.",
      },
      { type: "h2", text: "Can a dented garage door be repaired?" },
      {
        type: "p",
        text: "Some dents in metal garage doors can be improved using specialist dent repair techniques. Suitability depends on the door material, dent depth, panel construction and accessibility.",
      },
      { type: "p", text: "Common damage includes:" },
      {
        type: "ul",
        items: [
          "Utes or cars reversing into garage doors.",
          "Dents in metal sectional garage doors.",
          "Installation mishaps or defects.",
          "Minor impact damage to accessible panels.",
          "Everyday knocks and accidental bumps.",
        ],
      },
      {
        type: "p",
        text: "Deep creases, sharply folded metal, damaged coatings and structural damage may require alternative repairs.",
      },
      {
        type: "h2",
        text: "Is garage door dent removal cheaper than replacement?",
      },
      {
        type: "p",
        text: "Repairing suitable dents may be more affordable than replacing an entire door or panel. The cost depends on the damage and the repair method required.",
      },
      {
        type: "p",
        text: "Any damage affecting the door's tracks, springs, cables or safe operation should be assessed by a qualified garage door technician before use.",
      },
      { type: "h2", text: "Mobile garage door repairs" },
      {
        type: "p",
        text: "DentLabNZ provides mobile garage door dent assessment and repair for suitable damage in Tauranga, Mount Maunganui, Papamoa and the wider Bay of Plenty and Waikato.",
      },
      {
        type: "p",
        text: "Need garage door dent repair in Tauranga or Hamilton? Send DentLabNZ photos of the damage to discuss your repair options and request a quote.",
      },
      {
        type: "tagline",
        text: "DentLabNZ — mobile dent removal for vehicles and suitable garage door damage.",
      },
    ],
  },
  {
    slug: "hail-damage-car-repair-nz",
    title: "Hail Damage Car Repair NZ Wide",
    date: "2026-09-20",
    excerpt:
      "Has a hailstorm left dents across your car? DentLabNZ provides paintless hail damage repair for suitable vehicles anywhere in New Zealand.",
    image: hailDamage,
    imageAlt: "Hail dents across a vehicle panel",
    body: [
      {
        type: "p",
        text: "Has a hailstorm left dents across your car? DentLabNZ provides paintless hail damage repair for suitable vehicles for all New Zealand locations. Although we are based in the Bay of Plenty, we cover the entire country for hail damage repairs.",
      },
      {
        type: "h2",
        text: "Can hail dents be repaired without repainting?",
      },
      {
        type: "p",
        text: "Paintless dent removal (PDR) uses specialist tools and techniques to reshape dented metal while preserving the vehicle's original factory paint, where the damage allows.",
      },
      {
        type: "p",
        text: "PDR is commonly used to repair suitable hail dents across:",
      },
      {
        type: "ul",
        items: [
          "Car bonnets and roofs.",
          "Doors and side panels.",
          "Boot lids and rear panels.",
          "Multiple shallow dents caused by hailstorms.",
        ],
      },
      {
        type: "p",
        text: "Benefits can include reduced need for repainting, preservation of original paint and potentially lower repair costs compared with conventional body repairs.",
      },
      {
        type: "p",
        text: "The best repair method depends on dent severity, paint condition and panel accessibility.",
      },
      { type: "h2", text: "What should you do after hail damage?" },
      {
        type: "p",
        text: "Photograph the damage and contact your insurer if you intend to make a claim. Check any assessment and repair approval requirements before authorising work.",
      },
      { type: "h2", text: "Mobile hail damage repair" },
      {
        type: "p",
        text: "DentLabNZ offers mobile paintless dent removal from Tauranga to the entire country.",
      },
      {
        type: "p",
        text: "Looking for hail damage car repair in NZ? Contact DentLabNZ with photos of your vehicle for an initial assessment and quote.",
      },
      {
        type: "tagline",
        text: "DentLabNZ — specialist PDR for hail damage, car park dents and everyday vehicle dents.",
      },
    ],
  },
];

export const BLOG_POSTS = [...POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
