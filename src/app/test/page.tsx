"use client";

import { useState, useEffect } from "react";
import { questions } from "../../lib/TS_questions";
import { useRouter } from "next/navigation";
import WelcomeScreen from "../../components/WelcomeScreen";
import TimelineCard from "../../components/TimelineCard";
import { motion, AnimatePresence } from "framer-motion";
import RiveRobot from "../components/Robot";

const hollandQuestions = {
  R: [
    "Та мужааны дамжаанд суралцан төгсөхөд сонирхолтой юу?",
    "Та суудлын машин жолоодохыг сонирхдог уу?",
    "Та амины сууцандаа засвар хийхэд сонирхолтой юу?",
    "Та цахилгаан эд зүйлсийг засварлахыг сонирхдог уу?",
    "Та хөгжмийн хөг тааруулахад сонирхолтой юу?",
    "Та гэр орныхоо эвдэрч элэгдсэн зүйлсийг засч янзлахыг сонирхдог уу?",
    "Та зуслангийн газартаа ажиллахад сонирхолтой юу?",
    "Та авто механикийн сургалтанд суралцан төгсөхөд сонирхолтой юу?",
    "Та орон сууцны засвараа өөрөө хийхэд сонирхолтой юу?",
    "Та техникийн асуудлууд шийдвэрлэхэд сонирхолтой юу?",
    "Та хуучирч элэгдсэн хэрэгсэл, механик төхөөрөмжүүдийг засч сэлбэн ажиллагаатай болгоход сонирхолтой юу?",
  ],
  I: [
    "Та эрдэм шинжилгээний лабораторид ажиллахад сонирхолтой юу?",
    "Та практик амьдралын асуудлыг шийдвэрлэхэд тооны ухааныг хэрэглэхэд сонирхолтой юу?",
    "Та шинжлэх ухааны онол, үзлүүдийг судлахад сонирхолтой юу?",
    "Та шинэ санал, зөвлөмж боловсруулах талаар мэдээллийг тунгаан судлахад сонирхолтой юу?",
    "Та шинжлэх ухааны ном, хэвлэл, сэтгүүлүүд уншихад сонирхолтой юу?",
    "Та нарийн төвөгтэй асуудлын шийдвэрлэлийг олоход сонирхолтой юу?",
    "Та эрдэм шинжилгээний музей үзэхэд сонирхолтой юу?",
    "Та янз бүрийн асуудлаар өгөгдлийг ангилах, системчлэхэд сонирхолтой юу?",
    "Та статистикийн чиглэлээр дамжаа төгсөхөд сонирхолтой юу?",
    "Та асуудлыг задлан шинжлэхэд сонирхолтой юу?",
    "Та шинэ мэдлэг эзэмшихэд сонирхолтой юу?",
  ],
  A: [
    "Та хөгжим тоглохыг сонирхдог уу?",
    "Та сонин, сэтгүүлд материал бичиж өгөхөд сонирхолтой юу?",
    "Та өгүүллэг, уран сайхны санаанд тулгуурлан жүжгийн зохиол туурвихаар сонирхолтой юу?",
    "Та чуулга, найрал хөгжим, цөөхүүлийн бүрэлдэхүүнд тоглоход сонирхолтой юу?",
    "Та модон эдлэл эсвэл хувцас, хунарын загвар зохиохад сонирхолтой юу?",
    "Та хөрөг найруулал бичих юм уу, гэрэл зураг авахад сонирхолтой юу?",
    "Та дизайны сургалтанд оролцохдоо сонирхолтой юу?",
    "Та сонин, сэтгүүл эрхлэн гаргахад сонирхолтой юу?",
    "Та зураг, уран зураг зурж сурахад сонирхолтой юу?",
    "Та шүлэг унших, цээжлэх, бичихэд сонирхолтой юу?",
    "Та гоёл чимэглэлийн эд зүйлс хийхэд сонирхолтой юу?",
  ],
  S: [
    "Та нийгмийн хамгаалал, дэмжлэгийн хүрээлэлд ажиллахад сонирхолтой юу?",
    "Та харилцааны сэтгэл зүйн дамжаанд суралцахад сонирхолтой юу?",
    "Та насанд хүрээгүй хүмүүсийн хууль зөрчсөн баримтуудыг судлахад сонирхолтой юу?",
    "Та хүмүүсийн хоорондын харилцааны асуудлаар ярилцах, мэтгэлцэхэд сонирхолтой юу?",
    "Та бусдыг ямар нэгэн ажил хийж гүйцэтгэхэд сургахад сонирхолтой юу?",
    "Та нийгэм судлалын талаар ном уншихад сонирхолтой юу?",
    "Та хөгжлийн бэрхшээлтэй хүмүүст туслахад сонирхолтой юу?",
    "Та хүнд үед нь зөвлөгөө өгөхөд сонирхолтой юу?",
    "Та сургуульд багшлахад сонирхолтой юу?",
    "Та хүүхдийн төлөө санаа тавьж, ахмад хүмүүст туслахад сонирхолтой юу?",
    "Та аялал жуулчлал, хөтлөгч эсвэл музейн тайлбарлагчийн дамжаанд суралцахад сонирхолтой юу?",
  ],
  E: [
    "Та төсөл эсвэл адил утгатай ямар нэг ажлын удирдагч байхыг сонирхдог уу?",
    "Та удирдлагын чиглэлээр семинар, сургалт төгсөхөд сонирхолтой юу?",
    "Та бизнесийн болон засгийн газрын удирдлагын тухай уншихад сонирхолтой юу?",
    "Та улс төрийн цаг үеийн ажилд оролцохдоо сонирхолтой юу?",
    "Та хувийн ажлуудаа санаачлан, удирдан гүйцэтгэхэд сонирхолтой юу?",
    "Та чухал, хариуцлагатай үйл хэргийг шийдвэрлэхэд сонирхолтой юу?",
    "Та хүмүүст нөлөөлөхөд сонирхолтой юу?",
    "Та үнэ хаялцах болон дуудлага худалдаанд оролцохдоо сонирхолтой юу?",
    "Та бусад хүмүүсийн ажлыг удирдахад сонирхолтой юу?",
    "Та зах зээлийн ханшийг судлахад сонирхолтой юу?",
    "Та сонгуулийн ажлыг зохион байгуулах, явуулахад сонирхолтой юу?",
  ],
  C: [
    "Та ажлын өрөө ширээгээ эмх цэгцтэй байлгахад сонирхолтой юу?",
    "Та тооны машин байнга хэрэглэхэд сонирхолтой юу?",
    "Та эд хөрөнгө данслах, цэслэхэд сонирхолтой юу?",
    "Та өөрийн зарлагаа нягт тэмдэглэн авахад сонирхолтой юу?",
    "Та алдаа, алдангийг илрүүлэхээр баримтын шалгалт хийхэд сонирхолтой юу?",
    "Та бизнес, санхүүгийн тооцоо хийхэд сонирхолтой юу?",
    "Та албан бичиг баримтын хуулбар бүрдүүлэхэд сонирхолтой юу?",
    "Та байгууллагын компьютер тооцолон бодох техник зэргийг удирдан ажиллуулахад сонирхолтой юу?",
    "Та стандарт маяг, дэлгэрэнгүй анкетууд хөтлөхөд сонирхолтой юу?",
    "Та нягтлан бодох бүртгэлийн дамжаанд суралцахад сонирхолтой юу?",
    "Та албан бичиг төлөвлөх, хэвлэхэд сонирхолтой юу?",
  ],
} as const;

// MBTI test questions
const mbtiQuestions = {
  E_I: [
    {
      text: "Сургуулийн клубын арга хэмжээнд оролцохдоо:",
      optionA:
        "Шинэ хүмүүстэй танилцаж, бүлгийн үйл ажиллагаанд идэвхтэй оролцдог.",
      optionB:
        "Цөөн хэдэн хүнтэй утга учиртай яриа өрнүүлээд эртхэн гарч амардаг.",
    },
    {
      text: "Бүлгийн төсөл дээр ажиллахдаа:",
      optionA: "Багийнхантайгаа санаа бодлоо чөлөөтэй хуваалцдаг.",
      optionB: "Санаагаа эхлээд өөрөө бодож байж дараа нь хуваалцдаг.",
    },
    {
      text: "Анги дотор хэлэлцүүлэгт:",
      optionA: "Санаа орж ирэнгүүтээ шууд хэлдэг.",
      optionB: "Анхааралтай сонсож, бодож байж санаагаа хэлдэг.",
    },
    {
      text: "Ажлын үзэсгэлэнд:",
      optionA: "Олон ажил олгогчтой уулзаж, бүх л павильон ордог.",
      optionB: "Бэлтгэлтэй очиж, цөөн компани дээр төвлөрдөг.",
    },
    {
      text: "Удаан хичээллэсний дараа:",
      optionA: "Найзуудтайгаа уулзах, арга хэмжээнд оролцох.",
      optionB: "Ганцаараа ном унших, хөгжим сонсох, кино үзэх.",
    },
  ],
  S_N: [
    {
      text: "Мэргэжлээ сонгохдоо:",
      optionA: "Ямар ур чадвар, ажлын байр бэлдэж өгдөгт анхаардаг.",
      optionB: "Урт хугацааны мөрөөдөл, сонирхолд хэр нийцэж байгааг хардаг.",
    },
    {
      text: "Бүлгийн төсөл дээр асуудал шийдэхдээ:",
      optionA: "Батлагдсан арга барил, бодит баримтад тулгуурладаг.",
      optionB: "Шинэлэг, бүтээлч шийдэл хайдаг.",
    },
    {
      text: "Лекц дээр:",
      optionA:
        "Тодорхой жишээ, алхам алхмаар тайлбарлахаас хамгийн сайн сурдаг.",
      optionB: "Том зураар, ирээдүйн хэрэглээгээр ойлгодог.",
    },
    {
      text: "Дадлага хийхээр төлөвлөхдөө:",
      optionA: "Нарийн төлөвлөгөө, хугацаа гаргадаг.",
      optionB: "Ажлын байрны урам зориг, ирээдүйн боломжийг хардаг.",
    },
    {
      text: "Хичээлийн хөтөлбөр уншихдаа:",
      optionA: "Тодорхой даалгавар, хугацааг анзаардаг.",
      optionB: "Хичээлийн ерөнхий зорилго, сэдвийг хардаг.",
    },
  ],
  T_F: [
    {
      text: "Бүлгийн төсөл дээр маргаан гарахад:",
      optionA: "Хамгийн логик, баримтад тулгуурласан шийдлийг сонгодог.",
      optionB: "Бүгдийн сэтгэл санаа, багийн уур амьсгалыг харгалздаг.",
    },
    {
      text: "Дадлага сонгохдоо:",
      optionA: "Цалин, ур чадвар, карьерын өсөлтийг чухалчилдаг.",
      optionB: "Дэмжлэгтэй баг, утга учиртай ажлыг илүүд үздэг.",
    },
    {
      text: "Хамтрагчдаа санал өгөхдөө:",
      optionA: "Давуу болон сул талыг нь шууд хэлдэг.",
      optionB: "Сэтгэлд нь хүрэхээр, урам өгч хэлдэг.",
    },
    {
      text: "Багийн шийдвэр гаргахдаа:",
      optionA: "Өгөгдөлд тулгуурлан хамгийн зөв шийдлийг гаргадаг.",
      optionB: "Бүгдийн үнэт зүйлийг харгалзан үздэг.",
    },
    {
      text: "Хичээлийн ажлаа эрэмбэлэхдээ:",
      optionA: "Хугацаа, ач холбогдлоор нь шийддэг.",
      optionB: "Зорилго, харилцаанд хэрхэн нөлөөлөхийг хардаг.",
    },
  ],
  J_P: [
    {
      text: "Хичээлийн хуваариа зохицуулахдаа:",
      optionA: "Нарийн төлөвлөгөө, тогтсон цагийн хуваарьтай байх дуртай.",
      optionB: "Сэтгэл санаа, тэр үеийн чухал зүйлээсээ хамааруулдаг.",
    },
    {
      text: "Урт хугацааны төсөл эхлэхдээ:",
      optionA: "Алхам алхмаар зорилт тавьж, эрт дуусгахыг хичээдэг.",
      optionB: "Санаа орж ирэх бүртээ хэсэгчилж хийдэг, эцэст нь дуусгадаг.",
    },
    {
      text: "Сурах орчин:",
      optionA: "Бүх зүйл цэгцтэй, цэвэрхэн байх дуртай.",
      optionB: "Бага зэрэг эмх замбараагүй, бүтээлч орчинд дуртай.",
    },
    {
      text: "Багш даалгавар өөрчлөхөд:",
      optionA: "Төлөвлөгөөгөө хурдан өөрчилж, хуваарьтаа нийцүүлдэг.",
      optionB: "Шинэ боломж гэж харж, өөрөөр туршиж үздэг.",
    },
    {
      text: "Карьер төлөвлөлт:",
      optionA: "Тодорхой зорилго, хугацаатай төлөвлөгөө гаргадаг.",
      optionB: "Боломж гарвал туршиж үзэх, нээлттэй байхыг илүүд үздэг.",
    },
  ],
};

// EQ test questions
const eqQuestions = [
  // Self-Awareness
  "Би шалгалтын хугацаа ойртоход өөрийгөө стресстэж байгаагаа анзаардаг.",
  "Би бүлгийн уулзалтын дараа яагаад сэтгэл дундуур байгаагаа ойлгодог.",
  "Миний сэтгэл санаа хичээл эсвэл ажилд минь хэрхэн нөлөөлж байгааг мэддэг.",
  "Миний сэтгэл хөдлөл (жишээ нь: баярлах, уурлах) шийдвэр гаргалтад минь хэрхэн нөлөөлж байгааг анзаардаг.",
  "Би дадлага хийхдээ өөрийн давуу болон сул талаа мэддэг.",
  "Би анги дээр илтгэл тавихдаа хэт их сандарч байгаагаа мэдрэдэг.",
  "Би хамтрагчтайгаа маргалдсаны дараа сэтгэл хөдлөлөө эргэцүүлдэг.",
  "Шалгалтын улиралд өөрийгөө шатаахгүйн тулд амрах хэрэгтэйгээ мэддэг.",
  // Self-Regulation
  "Багш гэнэтийн шүүмжлэл өгөхөд тайван байж чаддаг.",
  "Багийн төсөл дээр уурласан ч бусдад уурлахгүй байхыг хичээдэг.",
  "Муу дүн авсан эсвэл дадлагад тэнцээгүй ч хурдан сэргэдэг.",
  "Шалгалтын болон клубын арга хэмжээ зэрэг завгүй үедээ стрессээ удирдаж чаддаг.",
  "Хэн нэгэнтэй маргалдах үедээ түргэн уурлахгүй байхыг хичээдэг.",
  "Багийн төсөл төлөвлөсөн ёсоор явжгүй бол аргыг өөрчилдөг.",
  "Ажлаа удаан хийж байхад тэвчээртэй байдаг.",
  "Чухал санаагаа хэлэхдээ сэтгэл хөдлөлөө хянаж чаддаг.",
  // Motivation
  "Хэцүү даалгавар байсан ч дуусгахын тулд өөрийгөө зоригжуулдаг.",
  "Хувийн зорилго тавьж, түүндээ хүрэхийн тулд хичээдэг.",
  "Шалгалтад унасан ч эсвэл ажлын боломж алдсан ч хурдан сэргэдэг.",
  "Ирээдүйн карьераа бодож шинэ ур чадвар суръя гэж урам зоригтой байдаг.",
  "Хичээлдээ сайн байсан ч өөрийгөө улам хөгжүүлэхийг хичээдэг.",
  "Богино хугацааны бэрхшээл тулгарсан ч урт хугацааны зорилгоо мартдаггүй.",
  "Клубын арга хэмжээ зохион байгуулж амжилтад хүрэхэд баярладаг.",
  "Сүлжээ үүсгэх, сайн дурын ажилд идэвхтэй оролцдог.",
  // Empathy
  "Ангидаа хэн нэгэн сэтгэл дундуур байгааг анзаардаг.",
  "Багийн маргааны үеэр бусдын байр суурийг ойлгохыг хичээдэг.",
  "Багийн ажилд бусдыг тухтай байлгахын тулд харилцаагаа өөрчилдөг.",
  "Найз эсвэл хамтрагч нь хичээл, ажилд стресстэж байвал туслахыг хичээдэг.",
  "Багийн төсөл удаашраад байхад багш яагаад уурлаж байгааг ойлгодог.",
  "Багийн гишүүн ганцаардахыг анзаарвал хамруулхаар хичээдэг.",
  "Том илтгэлийн өмнө хэн нэгэнд урам өгөх хэрэгтэй гэж мэдрэдэг.",
  "Бусдад санал өгөхдөө тэдний сэтгэл санааг харгалздаг.",
  // Social Skills
  "Бүлгийн хэлэлцүүлэг, уулзалтын үеэр санаагаа тодорхой илэрхийлдэг.",
  "Өөр өөр хүмүүстэй ч эерэг харилцаа үүсгэдэг.",
  "Суралгааны булт маргаан гарахад хурцадмал байдлыг намжаадаг.",
  "Багийн гишүүдийг нэр зоригоороо урамшуулж чаддаг.",
  "Клубын үйл ажиллагаа, багийн төслүүдийг удирдахдаа өөртөө итгэлтэй байдаг.",
  "Хичээл, дадлага орчныд өөртөө тохирч чаддаг.",
  "Бусдад урам өгөх, сайжруулах санал өгөхийг эрэгтэйгээр ханддаг.",
  "Карьерийн үзэсгэлэн, оюутны арга хэмжээнд сүлжээ үүсгэж чаддаг.",
];

type HollandCategory = keyof typeof hollandQuestions;
type MBTICategory = "E_I" | "S_N" | "T_F" | "J_P";
type MBTIScores = {
  E_I: { E: number; I: number };
  S_N: { S: number; N: number };
  T_F: { T: number; F: number };
  J_P: { J: number; P: number };
};
type TestType = "personality" | "mbti" | "eq" | "holland" | "result";

const steps = [
  "Таны зан чанарын хэв маягийг тодорхойлох",
  "MBTI Тест",
  "EQ Тест",
  "Holland Code Тест",
  "Баярлалаа",
];

const TestPage = () => {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testType, setTestType] = useState<TestType>("personality");
  const [mbtiAnswers, setMbtiAnswers] = useState<MBTIScores>({
    E_I: { E: 0, I: 0 },
    S_N: { S: 0, N: 0 },
    T_F: { T: 0, F: 0 },
    J_P: { J: 0, P: 0 },
  });
  const [currentMbtiCategory, setCurrentMbtiCategory] = useState<number>(0);
  const [currentMbtiQuestion, setCurrentMbtiQuestion] = useState(0);
  const mbtiCategoryOrder: MBTICategory[] = ["E_I", "S_N", "T_F", "J_P"];
  const [hollandAnswers, setHollandAnswers] = useState<{
    [key in HollandCategory]: number;
  }>({
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  });
  const [currentHollandCategory, setCurrentHollandCategory] = useState(0);
  const [currentHollandQuestion, setCurrentHollandQuestion] = useState(0);
  const [eqAnswers, setEqAnswers] = useState<number[]>(
    Array(eqQuestions.length).fill(0)
  );
  const [currentEqQuestion, setCurrentEqQuestion] = useState(0);
  const [bigFiveScores, setBigFiveScores] = useState<{
    Neuroticism: number;
    Extraversion: number;
    Openness: number;
    Agreeableness: number;
    Conscientiousness: number;
  } | null>(null);
  const [recommendedTests, setRecommendedTests] = useState<string[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0); // Нийт хариулсан тоо

  // Бүрэн асуултын тоо
  const totalQuestions = {
    personality: questions.length, // 25
    mbti: Object.values(mbtiQuestions).reduce(
      (sum, arr) => sum + arr.length,
      0
    ), // 20
    eq: eqQuestions.length, // 40
    holland: Object.values(hollandQuestions).reduce(
      (sum, arr) => sum + arr.length,
      0
    ), // 66
  };
  const totalQuestionsSum = Object.values(totalQuestions).reduce(
    (a, b) => a + b,
    0
  ); // 151

  // Алхмуудын үе шатуудын тогтоол
  const milestones = [
    { questions: 0, stepIdx: 0 }, // Персоналитийн эхлэл
    { questions: 25, stepIdx: 1 }, // Персоналитийн төгсгөл
    { questions: 45, stepIdx: 2 }, // MBTI-ийн төгсгөл
    { questions: 85, stepIdx: 3 }, // EQ-ийн төгсгөл
    { questions: 151, stepIdx: 4 }, // Төгсгөл
  ];

  // stepIdx-ийг тооцоолох
  const calculateStepIdx = () => {
    const answered = totalAnswered;
    for (let i = 0; i < milestones.length - 1; i++) {
      const start = milestones[i];
      const end = milestones[i + 1];
      // Онцгой тогтоол хүртэл одоогийн алхамд үлдэнэ
      if (answered >= start.questions && answered < end.questions) {
        const fraction =
          (answered - start.questions) / (end.questions - start.questions);
        return start.stepIdx + fraction * (end.stepIdx - start.stepIdx);
      } else if (answered === end.questions) {
        return end.stepIdx; // Онцгой тогтоолд таарсан тохиолдол
      }
    }
    return 4; // Төгсгөлд хүрэх боломж
  };

  const stepIdx = calculateStepIdx();

  // Энэ функцыг useEffect-ээс өмнө нэмэх
  const calculateRecommendedTests = (
    bigFive: typeof bigFiveScores,
    mbti: MBTIScores,
    eq: number[],
    holland: typeof hollandAnswers
  ) => {
    const recommendations: { test: string; score: number }[] = [];

    // Big Five оноог шинжлэх
    if (bigFive) {
      if (bigFive.Neuroticism > 70) {
        recommendations.push({
          test: "Стресс Менежментийн Тест",
          score: bigFive.Neuroticism,
        });
      }
      if (bigFive.Extraversion > 70) {
        recommendations.push({
          test: "Удирдах Ур Чадварын Үнэлгээ",
          score: bigFive.Extraversion,
        });
      }
      if (bigFive.Openness > 70) {
        recommendations.push({
          test: "Бүтээлч Байдлын Үнэлгээ",
          score: bigFive.Openness,
        });
      }
      if (bigFive.Agreeableness > 70) {
        recommendations.push({
          test: "Багийн Хамтын Ажиллагааны Үнэлгээ",
          score: bigFive.Agreeableness,
        });
      }
      if (bigFive.Conscientiousness > 70) {
        recommendations.push({
          test: "Цагийн Менежментийн Ур Чадварын Тест",
          score: bigFive.Conscientiousness,
        });
      }
    }

    // MBTI оноог шинжлэх
    const mbtiType = getMBTIType(mbti);
    if (mbtiType.includes("E")) {
      recommendations.push({ test: "Олон Нийтийн Ярианы Үнэлгээ", score: 75 });
    }
    if (mbtiType.includes("N")) {
      recommendations.push({ test: "Стратеги Төлөвлөлтийн Тест", score: 70 });
    }
    if (mbtiType.includes("F")) {
      recommendations.push({
        test: "Сэтгэл Хөдлөлийн Оюун Ухааны Үнэлгээ",
        score: 80,
      });
    }
    if (mbtiType.includes("J")) {
      recommendations.push({
        test: "Төсөл Менежментийн Ур Чадварын Тест",
        score: 75,
      });
    }

    // EQ оноог шинжлэх
    const eqScores = calculateEQScore(eq);
    if (eqScores) {
      if (eqScores.selfAwareness < 60) {
        recommendations.push({ test: "Өөрийг Таниулгах Үнэлгээ", score: 85 });
      }
      if (eqScores.socialSkills < 60) {
        recommendations.push({
          test: "Нийгмийн Ур Чадварын Хөгжлийн Тест",
          score: 80,
        });
      }
    }

    // Holland Code-ийг шинжлэх
    const hollandCode = getHollandCode(holland);
    if (hollandCode.includes("R")) {
      recommendations.push({
        test: "Техникийн Ур Чадварын Үнэлгээ",
        score: 75,
      });
    }
    if (hollandCode.includes("I")) {
      recommendations.push({ test: "Судалгааны Ур Чадварын Тест", score: 70 });
    }
    if (hollandCode.includes("A")) {
      recommendations.push({ test: "Уран Бичгийн Үнэлгээ", score: 75 });
    }
    if (hollandCode.includes("S")) {
      recommendations.push({ test: "Харилцааны Ур Чадварын Тест", score: 70 });
    }
    if (hollandCode.includes("E")) {
      recommendations.push({
        test: "Бизнес Эрхлэгчийн Ур Чадварын Үнэлгээ",
        score: 75,
      });
    }
    if (hollandCode.includes("C")) {
      recommendations.push({
        test: "Зохион Байгуулалтын Ур Чадварын Тест",
        score: 70,
      });
    }

    // Оноогоор эрэмбэлж, тэргүүлэх 5-ыг авна
    const top5Tests = recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((rec) => rec.test);

    return top5Tests;
  };

  useEffect(() => {
    if (showResults) {
      const queryParams = new URLSearchParams();
      if (bigFiveScores)
        queryParams.set("bigFive", JSON.stringify(bigFiveScores));
      queryParams.set("mbti", JSON.stringify(mbtiAnswers));
      queryParams.set("eq", JSON.stringify(eqAnswers));
      queryParams.set("holland", JSON.stringify(hollandAnswers));

      // Зөвлөмжийг тооцоолох
      const recommendations = calculateRecommendedTests(
        bigFiveScores,
        mbtiAnswers,
        eqAnswers,
        hollandAnswers
      );
      setRecommendedTests(recommendations);
      queryParams.set("recommendations", JSON.stringify(recommendations));

      router.push(`/test/result?${queryParams.toString()}`);
    }
  }, [
    showResults,
    bigFiveScores,
    mbtiAnswers,
    eqAnswers,
    hollandAnswers,
    router,
  ]);

  const handleAnswer = (score: number) => {
    setTotalAnswered((prev) => prev + 1); // Нийт хариулсан тоог нэмэгдүүлэх

    if (testType === "personality") {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: score };
      setAnswers(newAnswers);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const calculateBigFiveScores = (answers: Record<number, number>) => {
          let scores = {
            Neuroticism: 0,
            Extraversion: 0,
            Openness: 0,
            Agreeableness: 0,
            Conscientiousness: 0,
          };

          Object.entries(answers).forEach(([questionId, answer]) => {
            const question = questions.find((q) => q.id === Number(questionId));
            if (!question) return;

            const rawScore = question.reverse ? 6 - answer : answer;
            const percentage = ((rawScore - 1) / 4) * 100;

            switch (question.category) {
              case "Neuroticism":
                scores.Neuroticism += percentage;
                break;
              case "Extraversion":
                scores.Extraversion += percentage;
                break;
              case "Openness":
                scores.Openness += percentage;
                break;
              case "Agreeableness":
                scores.Agreeableness += percentage;
                break;
              case "Conscientiousness":
                scores.Conscientiousness += percentage;
                break;
            }
          });

          const questionCounts = {
            Neuroticism: questions.filter((q) => q.category === "Neuroticism")
              .length,
            Extraversion: questions.filter((q) => q.category === "Extraversion")
              .length,
            Openness: questions.filter((q) => q.category === "Openness").length,
            Agreeableness: questions.filter(
              (q) => q.category === "Agreeableness"
            ).length,
            Conscientiousness: questions.filter(
              (q) => q.category === "Conscientiousness"
            ).length,
          };

          Object.keys(scores).forEach((trait) => {
            if (questionCounts[trait as keyof typeof questionCounts] > 0) {
              scores[trait as keyof typeof scores] = Math.round(
                scores[trait as keyof typeof scores] /
                  questionCounts[trait as keyof typeof questionCounts]
              );
            }
          });

          return scores;
        };

        const bigFiveResults = calculateBigFiveScores(newAnswers);
        setBigFiveScores(bigFiveResults);
        setTestType("mbti");
        setCurrentMbtiCategory(0);
        setCurrentMbtiQuestion(0);
      }
    } else if (testType === "mbti") {
      const categoryIndex = currentMbtiCategory;
      const category = mbtiCategoryOrder[categoryIndex] as MBTICategory;

      setMbtiAnswers((prev) => {
        const updated = { ...prev };
        if (category === "E_I") {
          if (score === 1) updated.E_I.E += 1;
          else if (score === 2) updated.E_I.I += 1;
        }
        if (category === "S_N") {
          if (score === 1) updated.S_N.S += 1;
          else if (score === 2) updated.S_N.N += 1;
        }
        if (category === "T_F") {
          if (score === 1) updated.T_F.T += 1;
          else if (score === 2) updated.T_F.F += 1;
        }
        if (category === "J_P") {
          if (score === 1) updated.J_P.J += 1;
          else if (score === 2) updated.J_P.P += 1;
        }
        return updated;
      });

      const questionsInCategory = mbtiQuestions[category].length;
      if (currentMbtiQuestion < questionsInCategory - 1) {
        setCurrentMbtiQuestion(currentMbtiQuestion + 1);
      } else {
        const nextCategoryIdx = mbtiCategoryOrder.indexOf(category) + 1;
        if (nextCategoryIdx < mbtiCategoryOrder.length) {
          setCurrentMbtiCategory(nextCategoryIdx);
          setCurrentMbtiQuestion(0);
        } else {
          setTestType("eq");
          setCurrentEqQuestion(0);
        }
      }
    } else if (testType === "eq") {
      setEqAnswers((prev) => {
        const newEqAnswers = [...prev];
        newEqAnswers[currentEqQuestion] = score;
        return newEqAnswers;
      });
      if (currentEqQuestion < eqQuestions.length - 1) {
        setCurrentEqQuestion(currentEqQuestion + 1);
      } else {
        setTestType("holland");
        setCurrentHollandCategory(0);
        setCurrentHollandQuestion(0);
      }
    } else if (testType === "holland") {
      const categories = Object.keys(hollandQuestions) as HollandCategory[];
      const currentCategory = categories[currentHollandCategory];
      setHollandAnswers((prev) => ({
        ...prev,
        [currentCategory]: prev[currentCategory] + (score === 1 ? 1 : 0),
      }));
      if (
        currentHollandQuestion <
        hollandQuestions[currentCategory].length - 1
      ) {
        setCurrentHollandQuestion(currentHollandQuestion + 1);
      } else if (currentHollandCategory < categories.length - 1) {
        setCurrentHollandCategory(currentHollandCategory + 1);
        setCurrentHollandQuestion(0);
      } else if (
        currentHollandCategory === categories.length - 1 &&
        currentHollandQuestion === hollandQuestions[currentCategory].length - 1
      ) {
        setShowResults(true);
        setTestType("result");
      }
    }
  };

  const getMBTIType = (mbti: MBTIScores) => {
    let type = "";
    type += mbti.E_I.E >= mbti.E_I.I ? "E" : "I";
    type += mbti.S_N.S >= mbti.S_N.N ? "S" : "N";
    type += mbti.T_F.T >= mbti.T_F.F ? "T" : "F";
    type += mbti.J_P.J >= mbti.J_P.P ? "J" : "P";
    return type;
  };

  const getHollandCode = (holland: typeof hollandAnswers) => {
    const scores = Object.entries(holland)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([code]) => code);
    return scores.join("");
  };

  const calculateEQScore = (eq: number[]) => {
    if (!eq || eq.length !== 40) return null;
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const overallScore = sum(eq);
    return {
      selfAwareness: sum(eq.slice(0, 8)),
      selfRegulation: sum(eq.slice(8, 16)),
      motivation: sum(eq.slice(16, 24)),
      empathy: sum(eq.slice(24, 32)),
      socialSkills: sum(eq.slice(32, 40)),
      overall: Math.min(overallScore, 200),
    };
  };

  const progress = Math.round(
    testType === "personality"
      ? (currentQuestion / questions.length) * 100
      : testType === "mbti"
      ? ((currentMbtiCategory * 5 + currentMbtiQuestion) /
          (mbtiCategoryOrder.length * 5)) *
        100
      : testType === "eq"
      ? (currentEqQuestion / eqQuestions.length) * 100
      : testType === "holland"
      ? ((currentHollandCategory * 11 + currentHollandQuestion) /
          (Object.keys(hollandQuestions).length * 11)) *
        100
      : 100
  );

  const getProfessionReason = (profession: string, mbtiType: string) => {
    const reasons: { [key: string]: string } = {
      "Стресс Менежментийн Тест": `${mbtiType} төрлийн хүмүүс зохион байгуулалт, шийдвэр гаргах чадваараа алдартай бөгөөд энэ нь захиргааны менежерын үүрэгт тохирно. Тэд багийн ажил, стратеги төлөвлөлтийг сайн удирдах чадвартай.`,
      "Техникийн Ур Чадварын Үнэлгээ": `Энэ мэргэжил нь практик шийдвэр гаргах, техникийн асуудлыг шийдвэрлэх чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн хүчтэй тал болох зохион байгуулалт, ажлыг үр дүнтэй гүйцэтгэх чадварыг ашигладаг.`,
      "Судалгааны Ур Чадварын Тест": `Хууль сахиулах ажил нь дүрэм журам, зохион байгуулалт, шийдвэр гаргах чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн сайн талыг ашигладаг. Энэ мэргэжил нь тэдний шудрага байдал, зохион байгуулалтын чадварыг илэрхийлдэг.`,
      "Санхүүгийн шинжилгээ": `Финансын аналитик нь тооцоолол, стратеги төлөвлөлт, үр дүнтэй шийдвэр гаргах чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн сайн тал болох логик сэтгэлгээ, зохион байгуулалтын чадварыг ашигладаг.`,
      "Боловсролын Менежмент": `Боловсролын менежер нь зохион байгуулалт, стратеги төлөвлөлт, харилцааны ур чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн хүчтэй тал болох зохион байгуулалт, шийдвэр гаргах чадварыг ашигладаг.`,
    };
    return (
      reasons[profession] ||
      "Энэ мэргэжил нь таны зан чанар, ур чадварт тохирно."
    );
  };

  const getRequiredSkills = (profession: string) => {
    const skills: { [key: string]: string } = {
      "Стресс Менежментийн Тест":
        "Зохион байгуулалт, харилцааны ур чадвар, стратеги төлөвлөлт, мэдээлэл технологийн мэдлэг.",
      "Техникийн Ур Чадварын Үнэлгээ":
        "Инженерийн мэдлэг, техникийн асуудлыг шийдвэрлэх чадвар, зохион байгуулалт, тооцооллын ур чадвар.",
      "Судалгааны Ур Чадварын Тест":
        "Хууль зүйн мэдлэг, харилцааны ур чадвар, шийдвэр гаргах чадвар, стрессийг удирдах чадвар.",
      "Санхүүгийн шинжилгээ":
        "Санхүүгийн мэдлэг, аналитик сэтгэлгээ, тооцооллын ур чадвар, стратеги төлөвлөлт.",
      "Боловсролын Менежмент":
        "Харилцааны ур чадвар, зохион байгуулалт, стратеги төлөвлөлт, боловсролын мэдлэг.",
    };
    return (
      skills[profession] ||
      "Мэргэжлийн ур чадвар, харилцааны ур чадвар, зохион байгуулалт."
    );
  };

  const getSalaryRange = (profession: string) => {
    const salaries: { [key: string]: string } = {
      "Стресс Менежментийн Тест": "20,000,000 - 40,000,000 MNT сард.",
      "Техникийн Ур Чадварын Үнэлгээ": "25,000,000 - 50,000,000 MNT сард.",
      "Судалгааны Ур Чадварын Тест": "15,000,000 - 30,000,000 MNT сард.",
      "Санхүүгийн шинжилгээ": "30,000,000 - 60,000,000 MNT сард.",
      "Боловсролын Менежмент": "20,000,000 - 40,000,000 MNT сард.",
    };
    return salaries[profession] || "15,000,000 - 35,000,000 MNT сард.";
  };

  const getGrowthOpportunities = (profession: string) => {
    const opportunities: { [key: string]: string } = {
      "Стресс Менежментийн Тест":
        "Дээд удирдах албан тушаалд дэвших, илүү том байгууллагад ажиллах.",
      "Техникийн Ур Чадварын Үнэлгээ":
        "Аж үйлдвэрийн салбарт дээд удирдах албан тушаалд дэвших, төсөл менежер болох.",
      "Судалгааны Ур Чадварын Тест":
        "Дээд албан тушаалд дэвших, илүү том ажлыг удирдах.",
      "Санхүүгийн шинжилгээ":
        "Дээд удирдах албан тушаалд дэвших, санхүүгийн менежер болох.",
      "Боловсролын Менежмент":
        "Дээд удирдах албан тушаалд дэвших, томоохон боловсролын байгууллагад ажиллах.",
    };
    return (
      opportunities[profession] ||
      "Дээд удирдах албан тушаалд дэвших, илүү том байгууллагад ажиллах."
    );
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (showResults) {
    return null;
  }

  let currentQuestionText = "";
  let currentOptions: string[] = [];
  if (testType === "personality") {
    currentQuestionText = questions[currentQuestion].text;
    currentOptions = [
      "Огт таалагдахгүй",
      "Таалагдахгүй",
      "Дундаж",
      "Таалагдана",
      "Маш таалагдаж байна",
    ];
  } else if (testType === "mbti") {
    const categoryIndex = currentMbtiCategory;
    const category = mbtiCategoryOrder[categoryIndex] as MBTICategory;
    const q = mbtiQuestions[category][currentMbtiQuestion];
    currentQuestionText = q.text;
    currentOptions = [
      `A. ${q.optionA ? q.optionA : "Сонголт A"}`,
      `B. ${q.optionB ? q.optionB : "Сонголт B"}`,
    ];
  } else if (testType === "eq") {
    currentQuestionText = eqQuestions[currentEqQuestion];
    currentOptions = [
      "Ховор",
      "Заримдаа",
      "Олонтоо",
      "Ихэвчлэн",
      "Бараг үргэлж",
    ];
  } else {
    const categories = Object.keys(hollandQuestions) as HollandCategory[];
    const currentCategory = categories[currentHollandCategory];
    currentQuestionText =
      hollandQuestions[currentCategory][currentHollandQuestion];
    currentOptions = ["Тийм", "Үгүй"];
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-white flex flex-col md:flex-row items-center justify-end p-0">
      {/* START UP лого/товч эхний зүүн талд */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-50 text-black px-4 py-2 text-lg sm:text-xl md:text-4xl font-extrabold tracking-widest transition-all duration-200 hover:scale-110"
        style={{ letterSpacing: "0.2em" }}
      >
        START UP
      </button>
      {/* Гол тестийн талбар */}
      <div className="flex-1 flex flex-row items-center justify-center w-full relative">
        {/* Зүүн доод талд жижиг робот - зөвхөн md-ээс дээш */}
        <div className="hidden md:block absolute left-0 bottom-0 mb-6 ml-6">
          <div style={{ width: 100, height: 100 }}>
            <RiveRobot />
          </div>
        </div>
        {/* Голд асуулт, сонголтууд */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Profile товчийг голд байрлуулах */}
          <div className="w-full flex justify-center mb-2"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-center w-full max-w-xs sm:max-w-md mx-auto px-2"
            >
              <h2 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 text-center mb-2 leading-tight">
                {currentQuestionText}
              </h2>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col gap-2 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto px-2">
            <AnimatePresence mode="wait">
              {currentOptions.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleAnswer(index + 1)}
                  className="flex items-center gap-2 w-full p-2 md:p-4 bg-white border border-gray-300 rounded-xl shadow text-gray-900 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 hover:bg-gray-100 hover:border-gray-500 hover:shadow-lg group min-h-[28px] sm:min-h-[36px] md:min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-xs sm:text-sm md:text-base group-hover:bg-white group-hover:text-gray-700 border-2 border-gray-700 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.span>
                  {option}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Утас/tablet-д timeline зөвхөн баруун талд, бүх дугаарууд харагдахуйц, overflow-scroll */}
        <div className="fixed right-1 top-1/4 z-30 md:hidden flex flex-col items-end h-[38vh]">
          <div className="w-10 sm:w-14 h-full flex items-center">
            <TimelineCard
              steps={steps}
              currentStep={stepIdx}
              onStart={() => setShowWelcome(true)}
              className="w-full p-0 bg-white rounded-xl shadow overflow-visible"
            />
          </div>
        </div>
      </div>
      {/* Түүхэн мөр - desktop-д баруун талд хэвээрээ */}
      <div className="hidden md:flex flex-col items-center justify-center h-screen mr-0">
        <TimelineCard
          steps={steps}
          currentStep={stepIdx}
          onStart={() => setShowWelcome(true)}
          className="hidden md:flex flex-col justify-between min-h-screen w-60 bg-white rounded-2xl p-4 ml-4"
        />
      </div>
    </div>
  );
};

export default TestPage;
