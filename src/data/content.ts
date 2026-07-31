export interface Memory {
  id: number;
  title: string;
  date: string;
  image: string;
  caption: string;
  location?: string;
  tag: string;
}

export interface LoveNote {
  id: number;
  title: string;
  letter: string;
  date: string;
  tag: string;
}

export interface Reason {
  id: number;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface StarMessage {
  id: number;
  starName: string;
  x: number; // percentage
  y: number; // percentage
  quote: string;
  author: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  romanticFeedback: string;
}

export const COUPLE_DATA = {
  girlfriendName: "ISHA",
  boyfriendName: "Swayam",
  togetherSinceDate: "2025-08-11T00:00:00",
  girlfriendsDayDate: "August 1st",
  headline: "❤️ HAPPY GIRLFRIEND'S DAY ❤️",
  subheading: "To the most beautiful person in my world...",
  dedication: "Made with endless love by Swayam",
  heroSubtitle: "Isha ❤️ You are my dream come true, my daily sunshine, and my entire heart.",
};

export const GALLERY_PHOTOS = [
  { id: 1, src: "/photos/photo1.jpg", caption: "Your smile lights up my darkest days ✨", filterTag: "Sweet Smile", tilt: -3 },
  { id: 2, src: "/photos/photo2.jpg", caption: "Every moment with you feels like magic 💖", filterTag: "Magical Us", tilt: 2 },
  { id: 3, src: "/photos/photo3.jpg", caption: "The warmth of your hand in mine 🌹", filterTag: "Togetherness", tilt: -4 },
  { id: 4, src: "/photos/photo4.jpg", caption: "My favorite laugh in the entire universe 😊", filterTag: "Pure Joy", tilt: 3 },
  { id: 5, src: "/photos/photo5.jpg", caption: "Looking at you and knowing I'm home 🏡", filterTag: "My Safe Place", tilt: -2 },
  { id: 6, src: "/photos/photo6.jpg", caption: "Creating memories that last a lifetime 📸", filterTag: "Unforgettable", tilt: 4 },
  { id: 7, src: "/photos/photo7.jpg", caption: "You make every simple day extraordinary 💕", filterTag: "Precious Moments", tilt: -3 },
  { id: 8, src: "/photos/photo8.jpg", caption: "My heart beats only for you, Isha 💗", filterTag: "Heartbeat", tilt: 2 },
  { id: 9, src: "/photos/photo9.jpg", caption: "Crazy adventures & endless laughter 🌟", filterTag: "Adventures", tilt: -5 },
  { id: 10, src: "/photos/photo10.jpg", caption: "Forever fascinated by your beauty 🌺", filterTag: "Radiance", tilt: 3 },
  { id: 11, src: "/photos/photo11.jpg", caption: "The queen of my heart and dreams 👑", filterTag: "My Queen", tilt: -2 },
  { id: 12, src: "/photos/photo12.jpg", caption: "Side by side, hand in hand, always 🤝", filterTag: "Forever", tilt: 4 },
  { id: 13, src: "/photos/photo13.jpg", caption: "My best friend, my soulmate, my Isha ❤️", filterTag: "Soulmate", tilt: -3 },
];

export const TIMELINE_MEMORIES: Memory[] = [
  {
    id: 1,
    title: "The Spark That Changed Everything",
    date: "August 11, 2025",
    image: "/photos/photo1.jpg",
    caption: "The day our story officially began. Looking into your eyes, I knew my heart would belong to you forever.",
    location: "Where It All Began",
    tag: "First Chapter"
  },
  {
    id: 2,
    title: "Late Night Talks & Heartfelt Secrets",
    date: "September 2025",
    image: "/photos/photo2.jpg",
    caption: "Hours vanished like seconds whenever we talked. You shared your dreams, and I knew I wanted to protect them forever.",
    location: "Under the Moonlit Sky",
    tag: "Connection"
  },
  {
    id: 3,
    title: "Unstoppable Laughter",
    date: "November 2025",
    image: "/photos/photo4.jpg",
    caption: "The way you burst into pure, genuine laughter is the sweetest melody I've ever heard in my life.",
    location: "Our Favorite Cozy Corner",
    tag: "Joy & Smiles"
  },
  {
    id: 4,
    title: "Adventures & Memories Made",
    date: "January 2026",
    image: "/photos/photo6.jpg",
    caption: "Hand in hand, exploring new places and knowing that anywhere with you is paradise.",
    location: "Everywhere With You",
    tag: "Adventures"
  },
  {
    id: 5,
    title: "Quiet Comfort & Cozy Hugs",
    date: "March 2026",
    image: "/photos/photo5.jpg",
    caption: "We don't even need words. Simply holding you close makes every worry melt into peace.",
    location: "In Your Warm Embrace",
    tag: "Peace"
  },
  {
    id: 6,
    title: "Happy Girlfriend's Day, My Love!",
    date: "August 1, 2026",
    image: "/photos/photo13.jpg",
    caption: "Celebrating YOU today and every day. Thank you for being my light, my pride, and my greatest blessing.",
    location: "Forever in My Heart",
    tag: "Girlfriend's Day"
  }
];

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    title: "To My Dearest Isha",
    date: "August 1st",
    tag: "Gratitude & Admiration",
    letter: `My beautiful Isha,\n\nWhen I think about my life before you, it feels like a monochrome picture that suddenly burst into vibrant color the moment you walked in. You bring so much sweetness, kindness, and grace into everything you touch.\n\nThank you for being my shelter when I'm stressed, my cheer squad when I pursue my dreams, and my comforting embrace at the end of every day. Being loved by you is the greatest privilege of my life.\n\nForever yours,\nSwayam ❤️`
  },
  {
    id: 2,
    title: "Why You Are Extraordinary",
    date: "Always & Forever",
    tag: "Admiration",
    letter: `Isha, you possess a heart so pure and gentle that everyone around you feels instantly cared for. Your warmth is contagious, your mind is brilliant, and your eyes sparkle with a light that captures my soul every single time.\n\nNever forget how precious you are to me. I love every little detail about you—from the way you fix your hair to the playful tone in your voice when you're happy.\n\nWith all my love,\nSwayam`
  },
  {
    id: 3,
    title: "Our Promises for the Future",
    date: "To Tomorrow & Beyond",
    tag: "Our Dreams",
    letter: `I promise to hold your hand through every storm and dance with you under every rain. I promise to listen when you need a friend, comfort you when you feel tired, and celebrate every win with you as if it were my own.\n\nMy future has only one requirement: YOU by my side.\n\nI love you endlessly, Isha ❤️`
  }
];

export const REASONS_LIST: Reason[] = [
  { id: 1, title: "Your Radiant Smile", description: "Your smile illuminates my world faster than any morning sunrise.", iconName: "Smile", category: "Personality" },
  { id: 2, title: "Your Gentle Kindness", description: "The delicate, compassionate way you care for everyone around you.", iconName: "HeartHandshake", category: "Heart" },
  { id: 3, title: "Your Infectious Laughter", description: "Hearing you laugh is instant medicine for my soul.", iconName: "Sparkles", category: "Joy" },
  { id: 4, title: "Your Captivating Eyes", description: "I get happily lost every time I look deep into your beautiful eyes.", iconName: "Eye", category: "Beauty" },
  { id: 5, title: "Unwavering Support", description: "You believe in me even when I doubt myself.", iconName: "ShieldCheck", category: "Trust" },
  { id: 6, title: "Your Playful Craziness", description: "Our silly inside jokes and hilarious unscripted moments together.", iconName: "Laugh", category: "Joy" },
  { id: 7, title: "Your Warmest Hugs", description: "The instant feeling of total safety whenever you hold me tight.", iconName: "Flame", category: "Warmth" },
  { id: 8, title: "Your Pure Honesty", description: "You are real, authentic, and genuinely honest in everything.", iconName: "Star", category: "Trust" },
  { id: 9, title: "Your Soft Touch", description: "The gentle warmth of your fingers intertwined with mine.", iconName: "Hand", category: "Warmth" },
  { id: 10, title: "Everything About You", description: "Simply put: You are my dream girl, my Isha, my everything.", iconName: "Crown", category: "Everything" },
];

export const STAR_MESSAGES: StarMessage[] = [
  { id: 1, starName: "Alpha Isha", x: 20, y: 30, quote: "You are the brightest star in my entire sky, guiding me wherever I go.", author: "Swayam" },
  { id: 2, starName: "Constellation Love", x: 45, y: 25, quote: "Out of 8 billion people on Earth, my heart chose you without a second thought.", author: "Swayam" },
  { id: 3, starName: "Vega Romance", x: 75, y: 35, quote: "In a sea of people, my eyes will always search for you.", author: "Swayam" },
  { id: 4, starName: "Sirius Glow", x: 30, y: 70, quote: "I fall deeper in love with you with every single sunrise.", author: "Swayam" },
  { id: 5, starName: "Polaris Heart", x: 80, y: 75, quote: "You are my anchor, my home, and my favorite place in the world.", author: "Swayam" },
  { id: 6, starName: "Orion Dream", x: 60, y: 60, quote: "Forever is a long time, but I want to spend every second of it with you.", author: "Swayam" },
];

export const COMPLIMENTS: string[] = [
  "Isha, you look like poetry in motion.",
  "You are proof that pure magic exists in this world.",
  "Your smile could literally light up an entire city.",
  "I am the luckiest guy alive because you chose me.",
  "You possess the kindest heart I've ever encountered.",
  "Every song about love reminds me of you, Isha.",
  "You make ordinary days feel like extraordinary holidays.",
  "You're not just my girlfriend, you're my best friend.",
  "Your beauty leaves me speechless every single day.",
  "I wish I could freeze time whenever I'm holding you.",
  "You bring out the best version of me, Swayam loves you!",
  "If perfection had a face, it would be yours, Isha.",
  "I love the way your eyes sparkle when you get excited.",
  "Being with you feels like coming home to pure warmth."
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Who loves who more in this relationship? 😉",
    options: ["Isha loves Swayam more", "Swayam loves Isha endlessly! ❤️", "It's an infinite tie!", "Swayam loves Isha 1,000,000x more!"],
    correctIndex: 3,
    romanticFeedback: "Correct! Swayam's love for Isha expands beyond infinity every single day! 💕"
  },
  {
    id: 2,
    question: "What is Swayam's absolute favorite thing about Isha?",
    options: ["Her breathtaking smile", "Her kind & gentle heart", "Her infectious laugh", "ALL of the above & everything else! ✨"],
    correctIndex: 3,
    romanticFeedback: "Spot on! Swayam is completely mesmerized by everything that makes you ISHA! 👑"
  },
  {
    id: 3,
    question: "Where is Swayam's favorite place in the whole wide world?",
    options: ["Paris", "Right next to Isha 💖", "The Beach", "A luxury resort"],
    correctIndex: 1,
    romanticFeedback: "Yes! Anywhere in the world is paradise as long as you're by my side, Isha! 🏡"
  }
];

export const FUTURE_DREAMS = {
  heading: "Our Magical Tomorrow",
  paragraph: `As we look toward the future, my heart fills with immense joy. I dream of morning coffees cooked together, late-night drive adventures under starry skies, holding hands in distant cities, building a home filled with endless laughter, and growing older while holding your hand through every chapter of life. No matter where life takes us, my destination will always be YOU, Isha.`
};
