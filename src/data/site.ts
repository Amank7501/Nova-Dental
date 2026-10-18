export type Stat = { value: string; label: string };
export const tints = {
  mint: { bg: "#ECFDF5", ink: "#064E3B", accent: "#10B981" },
  sand: { bg: "#FEF3C7", ink: "#78350F", accent: "#D97706" },
  peach: { bg: "#FFE4E6", ink: "#881337", accent: "#FB7185" },
  lavender: { bg: "#EDE9FE", ink: "#4C1D95", accent: "#8B5CF6" },
  sky: { bg: "#E0F2FE", ink: "#0C4A6E", accent: "#0EA5E9" },
} as const;
export type TintName = keyof typeof tints;

export type Service = {
  slug: string;
  tint: TintName;
  icon: string; // lucide-react icon name, resolved in src/lib/icons.ts
  title: string;
  short: string;
  bullets: [string, string, string];
  image: string;
};
export type Doctor = {
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  image: string;
  yearsExperience?: number;
  specialties?: string[];
  regNumber?: string;
};
export type Testimonial = {
  name: string;
  rating: number;
  quote: string;
  initials: string;
  treatment?: string;
  date?: string;
  source?: "Google" | "Practo" | "In-clinic";
};
export type AboutPillar = { icon: string; title: string; desc: string };
export type GalleryImage = {
  src: string;
  alt: string;
  span: "normal" | "wide" | "tall";
};
export type Faq = { q: string; a: string };

export type Site = {
  name: string;
  url: string;
  geo: { latitude: string; longitude: string };
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  address: { line1: string; line2: string; city: string; state: string; pin: string };
  hours: { day: string; time: string }[];
  socials: { instagram: string; facebook: string; google: string };
  mapEmbedUrl: string;
  since: string;
  rating: { score: string; reviews: string };
  reviewsSummary: { rating: number; count: number; source: string };
  stats: Stat[];
  services: Service[];
  doctors: Doctor[];
  testimonials: Testimonial[];
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    pillars: AboutPillar[];
  };
  gallery: GalleryImage[];
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    landmarks: string[];
  };
  appointment: {
    eyebrow: string;
    heading: string;
    subheading: string;
    trustPoints: string[];
  };
  faqs: Faq[];
};

export const site: Site = {
  name: "Novu Dental",
  url: "https://novudental.in", // placeholder domain
  geo: { latitude: "0.0", longitude: "0.0" }, // placeholder — swap for real coordinates
  tagline: "Gentle, modern dental care for the whole family",
  phone: "+91 72095 50294",
  phoneHref: "tel:+917209550294",
  whatsapp:
    "https://wa.me/917209550294?text=Hello%20Novu%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment.",
  email: "hello@novudental.in",
  address: {
    line1: "12, 4th Cross, 80 Feet Road",
    line2: "Koramangala 4th Block",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560034",
  },
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed (emergencies only — call)" },
  ],
  socials: { instagram: "#", facebook: "#", google: "#" },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=PLACEHOLDER",
  since: "2013",
  rating: { score: "4.9", reviews: "240+" },
  reviewsSummary: { rating: 4.9, count: 240, source: "Google" },
  stats: [
    { value: "15,000+", label: "Happy patients" },
    { value: "12+", label: "Years of experience" },
    { value: "4.9/5", label: "Google rating" },
    { value: "40+", label: "Treatments offered" },
  ],
  services: [
    {
      slug: "general-checkup",
      tint: "mint",
      icon: "Stethoscope",
      title: "General Check-up & Cleaning",
      short: "Routine exams and professional cleaning to keep your smile healthy.",
      bullets: ["Digital X-rays", "Scaling and polishing", "Personalised care plan"],
      image: "/placeholders/service-1.jpg",
    },
    {
      slug: "teeth-whitening",
      tint: "sky",
      icon: "Sparkles",
      title: "Teeth Whitening",
      short: "Safe, quick whitening for a visibly brighter smile.",
      bullets: ["In-clinic one-hour session", "Low-sensitivity gels", "Take-home touch-up kit"],
      image: "/placeholders/service-2.jpg",
    },
    {
      slug: "dental-implants",
      tint: "peach",
      icon: "Anchor",
      title: "Dental Implants",
      short: "Permanent, natural-looking replacements for missing teeth.",
      bullets: ["Titanium implants", "3D-guided placement", "Lifetime support"],
      image: "/placeholders/service-3.jpg",
    },
    {
      slug: "braces-aligners",
      tint: "lavender",
      icon: "AlignCenter",
      title: "Braces & Clear Aligners",
      short: "Straighter teeth with metal, ceramic or invisible options.",
      bullets: ["Digital smile preview", "Teen and adult plans", "Flexible EMI options"],
      image: "/placeholders/service-4.jpg",
    },
    {
      slug: "root-canal",
      tint: "sand",
      icon: "Zap",
      title: "Root Canal Treatment",
      short: "Comfortable, single-visit treatment that saves your natural tooth.",
      bullets: ["Rotary endodontics", "Painless anaesthesia", "Same-day crown options"],
      image: "/placeholders/service-5.jpg",
    },
    {
      slug: "kids-dentistry",
      tint: "mint",
      icon: "Baby",
      title: "Children's Dentistry",
      short: "A friendly, fear-free experience for your little ones.",
      bullets: ["Fluoride and sealants", "Habit counselling", "Play-based visits"],
      image: "/placeholders/service-6.jpg",
    },
    {
      slug: "cosmetic-dentistry",
      tint: "sky",
      icon: "Palette",
      title: "Smile Makeover",
      short: "Veneers, bonding and contouring designed around your face.",
      bullets: ["Porcelain veneers", "Tooth-coloured fillings", "Gum contouring"],
      image: "/placeholders/service-7.jpg",
    },
    {
      slug: "emergency-care",
      tint: "peach",
      icon: "Siren",
      title: "Emergency Dental Care",
      short: "Fast relief for toothache, swelling, or accidents.",
      bullets: ["Same-day appointments", "Pain management", "Broken tooth repair"],
      image: "/placeholders/service-8.jpg",
    },
  ],
  doctors: [
    {
      name: "Dr. Ananya Rao",
      role: "Chief Dentist & Implantologist",
      qualifications: "BDS, MDS (Prosthodontics)",
      bio: "With 10 years of experience, Dr. Rao specialises in implants and full-mouth rehabilitation, focusing on comfort-first care.",
      image: "/placeholders/doctor-1.jpg",
      yearsExperience: 10,
      specialties: ["Dental Implants", "Full-Mouth Rehabilitation", "Smile Design"],
      regNumber: "A-17287",
    },
    {
      name: "Dr. Karthik Menon",
      role: "Orthodontist",
      qualifications: "BDS, MDS (Orthodontics)",
      bio: "Dr. Menon has straightened thousands of smiles with braces and clear aligners for teens and adults alike.",
      image: "/placeholders/doctor-2.jpg",
      yearsExperience: 8,
      specialties: ["Braces", "Clear Aligners"],
    },
    {
      name: "Dr. Meera Iyer",
      role: "Pediatric Dentist",
      qualifications: "BDS, MDS (Pedodontics)",
      bio: "Dr. Iyer makes dental visits fun for children, building healthy habits that last a lifetime.",
      image: "/placeholders/doctor-3.jpg",
      yearsExperience: 5,
      specialties: ["Pediatric Care", "Preventive Dentistry"],
    },
  ],
  testimonials: [
    {
      name: "Priya S.",
      initials: "PS",
      rating: 5,
      quote:
        "I was terrified of root canals, but the team made it completely painless. Wonderful, caring staff.",
      treatment: "Root Canal",
      date: "October 2026",
      source: "Google",
    },
    {
      name: "Rohit K.",
      initials: "RK",
      rating: 5,
      quote:
        "Got my aligners here and the results are amazing. Clear explanations and no hidden costs.",
      treatment: "Clear Aligners",
      date: "September 2026",
      source: "Google",
    },
    {
      name: "Sunita M.",
      initials: "SM",
      rating: 5,
      quote:
        "My kids actually look forward to their check-ups now. Spotlessly clean clinic and very friendly doctors.",
      treatment: "Children's Dentistry",
      date: "September 2026",
      source: "Google",
    },
    {
      name: "Arjun R.",
      initials: "AR",
      rating: 5,
      quote:
        "Dr. Rao walked me through the whole implant process step by step. I never felt rushed or confused.",
      treatment: "Dental Implant",
      date: "August 2026",
      source: "Google",
    },
    {
      name: "Neha D.",
      initials: "ND",
      rating: 5,
      quote:
        "My smile is visibly brighter after one whitening session, and there was no sensitivity at all.",
      treatment: "Scaling & Whitening",
      date: "August 2026",
      source: "Google",
    },
    {
      name: "Imran A.",
      initials: "IA",
      rating: 4,
      quote:
        "Got a same-day appointment for a broken tooth. Quick, professional, and fairly priced.",
      treatment: "Emergency Care",
      date: "July 2026",
      source: "Google",
    },
  ],
  about: {
    eyebrow: "About Novu Dental",
    heading: "Modern dentistry, with time taken to care.",
    body: "At Novu Dental we blend specialist expertise with a calm, unhurried approach. From the first consultation to post-treatment follow-up, you'll find clear explanations, honest pricing, and a team that genuinely listens.",
    pillars: [
      {
        icon: "Shield",
        title: "Sterile & Safe",
        desc: "Autoclave-sterilised instruments, single-use disposables, and strict infection control.",
      },
      {
        icon: "HeartPulse",
        title: "Gentle Care",
        desc: "Modern anaesthesia and anxiety-friendly protocols — most patients report zero discomfort.",
      },
      {
        icon: "GraduationCap",
        title: "Specialist-Led",
        desc: "Every treatment overseen by a dentist qualified in that specific speciality.",
      },
      {
        icon: "BadgeIndianRupee",
        title: "Honest Pricing",
        desc: "Clear quotes upfront. No hidden costs. EMI options available on major treatments.",
      },
    ],
  },
  gallery: [
    { src: "/placeholders/clinic-1.jpg", alt: "Novu Dental reception area", span: "wide" },
    { src: "/placeholders/clinic-2.jpg", alt: "Dental treatment chair", span: "tall" },
    { src: "/placeholders/clinic-3.jpg", alt: "Sterilisation room", span: "normal" },
    { src: "/placeholders/clinic-4.jpg", alt: "Waiting lounge", span: "normal" },
    { src: "/placeholders/clinic-5.jpg", alt: "Dental X-ray setup", span: "normal" },
    { src: "/placeholders/clinic-6.jpg", alt: "Pediatric corner", span: "wide" },
    { src: "/placeholders/clinic-7.jpg", alt: "Consultation room", span: "normal" },
    { src: "/placeholders/clinic-8.jpg", alt: "Clinic exterior at night", span: "wide" },
  ],
  contact: {
    eyebrow: "Find us",
    heading: "Visit Novu Dental.",
    subheading: "Walk-ins welcome. Appointments preferred for faster service.",
    landmarks: [
      "Opposite Forum Mall — ground floor entrance",
      "Free parking available for patients",
      "5 min walk from Koramangala Bus Stop",
    ],
  },
  appointment: {
    eyebrow: "Book a visit",
    heading: "Ready to see us?",
    subheading:
      "Pick a time that suits you. We'll confirm by call or WhatsApp within an hour (during clinic hours).",
    trustPoints: [
      "No consultation fee for first visit",
      "WhatsApp confirmation within 1 hour",
      "Reschedule anytime, no questions asked",
    ],
  },
  faqs: [
    {
      q: "Is dental treatment painful?",
      a: "We use modern anaesthesia and gentle techniques, so most treatments are comfortable and virtually painless.",
    },
    {
      q: "How often should I visit the dentist?",
      a: "We recommend a check-up and cleaning every six months, or sooner if you notice pain, bleeding or sensitivity.",
    },
    {
      q: "Do you offer EMI or payment plans?",
      a: "Yes. No-cost EMI is available on larger treatments such as implants, braces and smile makeovers.",
    },
    {
      q: "How long does a dental implant take?",
      a: "The implant is placed in a single visit; healing takes 3–4 months before the final crown is fitted.",
    },
    {
      q: "Is teeth whitening safe?",
      a: "Yes. Professional whitening is safe when supervised by a dentist, and we use low-sensitivity formulas.",
    },
    {
      q: "Can I book an appointment on WhatsApp?",
      a: "Absolutely. Message us on WhatsApp or call the clinic and we will confirm a slot within minutes.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept cash, UPI, all major cards, and EMI on treatments above ₹10,000.",
    },
    {
      q: "Do you accept insurance?",
      a: "We provide detailed invoices for insurance reimbursement. Direct billing is available with select insurers — please ask when booking.",
    },
  ],
};
