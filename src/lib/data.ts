import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";
import post5 from "@/assets/post-5.jpg";
import post6 from "@/assets/post-6.jpg";

export const media = { post1, post2, post3, post4, post5, post6 };

export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  live?: boolean;
  featured?: boolean;
  newStory?: boolean;
  bio?: string;
};

export type ShopTag = {
  id: string;
  label: string;
  x: number;
  y: number;
  price: string;
  seller: string;
  sizes: string[];
};

export type Post = {
  id: string;
  kind: "product" | "inspiration";
  creator: Creator;
  time: string;
  images: string[];
  dropTitle?: string;
  caption: string;
  hashtags: string[];
  price?: string;
  left?: number;
  likes: number;
  comments: number;
  tags?: ShopTag[];
};

const creatorList = [
  {
    id: "c1",
    name: "Zuri K.",
    handle: "@zuri",
    avatar: post2,
    verified: true,
    live: true,
    newStory: true,
    bio: "Rooftop colour studies.",
  },
  {
    id: "c2",
    name: "HypeHaus",
    handle: "@hypehaus",
    avatar: post1,
    verified: true,
    newStory: true,
    bio: "Lusaka tailoring, quietly loud.",
  },
  { id: "c3", name: "Maya", handle: "@mayafits", avatar: post4, featured: true, newStory: true },
  { id: "c4", name: "Tino Fits", handle: "@tinofits", avatar: post5, newStory: true },
  { id: "c5", name: "Luxe Plug", handle: "@luxeplug", avatar: post6, verified: true },
  { id: "c6", name: "Sole Diary", handle: "@solediary", avatar: post3, newStory: true },
] as const satisfies readonly Creator[];
export const creators: Creator[] = [...creatorList];
const C = creatorList;
];

export const posts: Post[] = [
  {
    id: "p1",
    kind: "product",
    creator: C[1],
    time: "2h",
    images: [media.post1, media.post5],
    dropTitle: "Forest Varsity Set",
    caption: "That one fit you don't need to overthink. Cut for the walk home at golden hour.",
    hashtags: ["#lusakastyle", "#varsity", "#dropday"],
    price: "K899",
    left: 3,
    likes: 1240,
    comments: 112,
    tags: [
      { id: "t1", label: "Overshirt", x: 52, y: 38, price: "K899", seller: "HypeHaus", sizes: ["S", "M", "L", "XL"] },
      { id: "t2", label: "Sneakers", x: 22, y: 84, price: "K650", seller: "Sole Diary", sizes: ["40", "41", "42"] },
    ],
  },
  {
    id: "p2",
    kind: "inspiration",
    creator: C[0],
    time: "5h",
    images: [media.post2],
    caption: "Purple hour. No shopping list, just a mood I wanted to keep.",
    hashtags: ["#moodboard", "#goldenhour", "#africanfashion"],
    likes: 3110,
    comments: 208,
  },
  {
    id: "p3",
    kind: "product",
    creator: C[5],
    time: "8h",
    images: [media.post3],
    dropTitle: "Violet Sole 02",
    caption: "Chunky, quiet, a little bit rude. 40 pairs only.",
    hashtags: ["#sneakerculture", "#drop"],
    price: "K650",
    left: 12,
    likes: 890,
    comments: 64,
    tags: [{ id: "t3", label: "Sneakers", x: 46, y: 62, price: "K650", seller: "Sole Diary", sizes: ["40", "41", "42", "43"] }],
  },
  {
    id: "p4",
    kind: "inspiration",
    creator: C[2],
    time: "11h",
    images: [media.post4, media.post6],
    caption: "Print as tailoring. The continent has always done maximal well.",
    hashtags: ["#editorial", "#print", "#tailoring"],
    likes: 2044,
    comments: 151,
  },
];

export const discoverTiles = [
  { title: "Campus Fits", image: media.post5 },
  { title: "Streetwear", image: media.post1 },
  { title: "Sneakers", image: media.post3 },
  { title: "African Fashion", image: media.post4 },
  { title: "Luxury", image: media.post6 },
  { title: "Beauty", image: media.post2 },
];

export const shorts = [
  { id: "s1", creator: C[3], image: media.post5, caption: "Fit switch up — campus edition", likes: "2.1K", comments: "184", shares: "230" },
  { id: "s2", creator: C[0], image: media.post2, caption: "Old money aesthetic, Lusaka budget", likes: "5.6K", comments: "402", shares: "610" },
  { id: "s3", creator: C[5], image: media.post3, caption: "Unboxing the Violet Sole 02", likes: "1.3K", comments: "96", shares: "121" },
];

export const alerts = [
  { id: "a1", text: "David liked your look.", time: "2m", image: media.post1, type: "Likes" },
  { id: "a2", text: "Maya saved your outfit.", time: "9m", image: media.post4, type: "Likes" },
  { id: "a3", text: "Zuri commented: “where is the overshirt from?”", time: "1h", image: media.post2, type: "Comments" },
  { id: "a4", text: "Your Drop is getting attention — 240 views today.", time: "3h", image: media.post3, type: "Mentions" },
  { id: "a5", text: "The sneakers you saved are almost gone.", time: "5h", image: media.post3, type: "Likes" },
];

export const inspirationLines = [
  "Discover your next obsession.",
  "Today's trends are waiting.",
  "Your next favourite look is here.",
  "What's inspiring you today?",
];