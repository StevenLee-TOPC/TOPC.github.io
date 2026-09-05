export const STORE_URL = "https://www.jotform.com/app/top-c-cards/top-c";
export const CONTACT_EMAIL = "slee.topc@gmail.com";

export type Product = {
  name: string;
  blurb: string;
  price?: string;
  image: string;
  alt: string;
  comingSoon?: boolean;
  light?: boolean;
};

export const products: Product[] = [
  {
    name: "New Testament Deck",
    blurb: "Wholesome, strategy-driven play anchored in the New Testament.",
    price: "$25.95",
    image: "/assets/nt-box.png",
    alt: "New Testament Deck box",
  },
  {
    name: "Old Testament Deck",
    blurb: "Classic narratives and wisdom literature reimagined for card play.",
    price: "$29.95",
    image: "/assets/ot-box.png",
    alt: "Old Testament Deck box",
  },
  {
    name: "Junior Version",
    blurb: "Kid-friendly learning and family fun — accessible and engaging.",
    price: "$15.95",
    image: "/assets/jd-box.png",
    alt: "Junior Version deck box",
  },
  {
    name: "TOP-C Rule Book",
    blurb:
      "Comprehensive guide with clear rules and quick-start instructions for every game.",
    image: "/assets/rule-book-cover.jpg",
    alt: "Official rules for TOP-C card games",
    price: "$10.00",
    light: true,
  },
  {
    name: "T-Shirts Coming Soon",
    blurb: "Wear your passion for TOP-C — branded apparel launching shortly.",
    image: "/assets/tshirt-logo.jpg",
    alt: "Navy TOP-C t-shirt with TOP wordmark",
    comingSoon: true,
  },
];

export const onlineGames = [
  { name: "Bible Bid", cta: "Coming Soon" },
  {
    name: "Spread Love",
    cta: "Early Access",
    href: "/games/spread-love",
  },
  { name: "Fly Over", cta: "Coming Soon" },
  { name: "Declaration", cta: "Coming Soon" },
] as const;

export const SPREAD_LOVE_PASSCODE = "GLORY";
export const SPREAD_LOVE_UNLOCK_KEY = "topc-spread-love-unlocked";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#shop", label: "Shop" },
  { href: "/#games", label: "Online Games" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
