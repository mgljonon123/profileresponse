export interface Question {
  id: number;
  category: string;
  text: string;
  reverse: boolean;
}

export const questions: Question[] = [
  // А. Невротизм (Neuroticism)
  {
    id: 1,
    category: "Neuroticism",
    text: "Ихэнхдээ надад өөрийгөө бусдаас дор гэсэн мэдрэмж төрдөг.",
    reverse: false,
  },
  {
    id: 2,
    category: "Neuroticism",
    text: "Маш их стресст орсон үед заримдаа өөрийгөө хэдэн хэсэг болсон юм шиг мэдэрдэг.",
    reverse: false,
  },
  {
    id: 3,
    category: "Neuroticism",
    text: "Надад түгшүүртэй мэдрэмж төрөх нь элбэг.",
    reverse: false,
  },
  {
    id: 4,
    category: "Neuroticism",
    text: "Заримдаа надад өөрийгөө ямар ч үнэ цэнгүй болсон мэт мэдрэмж төрдөг.",
    reverse: false,
  },
  {
    id: 5,
    category: "Neuroticism",
    text: "Ойр ойрхон асуудал гарахад би шантарч, бууж өгмөөр санагддаг.",
    reverse: false,
  },
  // Б. Экстраверс (Extraversion)
  {
    id: 6,
    category: "Extraversion",
    text: "Би хүмүүстэй ярилцахдаа үнэхээр дуртай.",
    reverse: false,
  },
  {
    id: 7,
    category: "Extraversion",
    text: "Ихэвчлэн надад эрч хүч мэдрэгддэг.",
    reverse: false,
  },
  {
    id: 8,
    category: "Extraversion",
    text: "Би хөгжилтэй, өөдрөг сэтгэлтэй хүн.",
    reverse: false,
  },
  {
    id: 9,
    category: "Extraversion",
    text: "Би их идэвхтэй хүн.",
    reverse: false,
  },
  {
    id: 10,
    category: "Extraversion",
    text: "Би хүмүүстэй хамт байхдаа тааламжтай байдаг.",
    reverse: false,
  },
  // В. Туршлагад нээлттэй байдал (Openness)
  {
    id: 11,
    category: "Openness",
    text: "Би шинэ болон гадаад хоол турших дуртай.",
    reverse: false,
  },
  {
    id: 12,
    category: "Openness",
    text: "Би орчлон ертөнц, хүний мөн чанарын талаар таамаглах сонирхолтой.",
    reverse: false,
  },
  {
    id: 13,
    category: "Openness",
    text: "Би маш их сониуч зантай.",
    reverse: false,
  },
  {
    id: 14,
    category: "Openness",
    text: "Онол эсвэл хийсвэр санаа надад зугаатай санагддаг.",
    reverse: false,
  },
  {
    id: 15,
    category: "Openness",
    text: "Би уран сэтгэмж сайтай.",
    reverse: false,
  },
  // Г. Нийцтэй байдал (Agreeableness)
  {
    id: 16,
    category: "Agreeableness",
    text: "Би гэр бүл, ажлынхантайгаа байнга муудалцдаг.",
    reverse: true,
  },
  {
    id: 17,
    category: "Agreeableness",
    text: "Зарим хүмүүс намайг хувиа хичээсэн гэж боддог.",
    reverse: true,
  },
  {
    id: 18,
    category: "Agreeableness",
    text: "Зарим хүмүүс намайг хүйтэн хөндий, тооцоотой гэж боддог.",
    reverse: true,
  },
  {
    id: 19,
    category: "Agreeableness",
    text: "Би ерөнхийдөө бодолтой, анхааралтай байхыг хичээдэг.",
    reverse: false,
  },
  {
    id: 20,
    category: "Agreeableness",
    text: "Би бусдын асуудлыг сонирхдоггүй.",
    reverse: true,
  },
  // Д. Ухамсартай байдал (Conscientiousness)
  {
    id: 21,
    category: "Conscientiousness",
    text: "Би эд зүйлсээ цэвэрхэн, цэгцтэй байлгадаг.",
    reverse: false,
  },
  {
    id: 22,
    category: "Conscientiousness",
    text: "Би ажлаа цаг тухайд нь хийх гэж өөрийгөө маш сайн зохицуулдаг.",
    reverse: false,
  },
  {
    id: 23,
    category: "Conscientiousness",
    text: "Ажлаа эхлэх гэж маш их цаг алддаг.",
    reverse: true,
  },
  {
    id: 24,
    category: "Conscientiousness",
    text: "Заримдаа би байх ёстой шигээ найдвартай байж чаддаггүй.",
    reverse: true,
  },
  {
    id: 25,
    category: "Conscientiousness",
    text: "Би хэзээ ч зохион байгуулалттай байж чаддаггүй юм шиг санагддаг.",
    reverse: true,
  },
];

export const categories = [
  "Neuroticism",
  "Extraversion",
  "Openness",
  "Agreeableness",
  "Conscientiousness",
];
