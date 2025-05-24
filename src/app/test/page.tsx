"use client";

import { useState, useEffect } from "react";
import { questions } from "../../lib/TS_questions";
import { useRouter } from "next/navigation";
import WelcomeScreen from "../../components/WelcomeScreen";
import TimelineCard from "../../components/TimelineCard";
import { motion, AnimatePresence } from "framer-motion";

// Holland Code test questions
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
    "Та янз бүрийн асуудлаар өгөгдөхүүнийг ангилах, системчлэхэд сонирхолтой юу?",
    "Та статистикийн чиглэлээр дамжаа төгсөхөд сонирхолтой юу?",
    "Та асуудлыг задлан шинжлэхэд сонирхолтой юу?",
    "Та шинэ мэдлэг эзэмшихэд сонирхолтой юу?",
  ],
  A: [
    "Та хөгжим тоглохыг сонирхдог уу?",
    "Та сонин, сэтгүүлд материал бичиж өгөхөд сонирхолтой юу?",
    "Та өгүүллэг, уран сайхны санаанд тулгуурлан жүжгийн зохиол туурвихаар сонирхолтой юу?",
    "Та чуулга, найрал хөгжим, цөөхүүлийн бүрэлдэхүүнд тоглохад сонирхолтой юу?",
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
      optionB: "Том зургаар, ирээдүйн хэрэглээгээр ойлгодог.",
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
  "Би анги дээр илтгэл тавихдаа хэт их сандарч байгаагаа мэдэрдэг.",
  "Би хамтрагчтайгаа маргалдсаны дараа сэтгэл хөдлөлөө эргэцүүлдэг.",
  "Шалгалтын улиралд өөрийгөө шатаахгүйн тулд амрах хэрэгтэйгээ мэддэг.",
  // Self-Regulation
  "Багш гэнэтийн шүүмжлэл өгөхөд тайван байж чаддаг.",
  "Багийн төсөл дээр уурласан ч бусдад уурлахгүй байхыг хичээдэг.",
  "Муу дүн авсан эсвэл дадлагад тэнцээгүй ч хурдан сэргэдэг.",
  "Шалгалтын болон клубын арга хэмжээ зэрэг завгүй үедээ стрессээ удирдаж чаддаг.",
  "Хэн нэгэнтэй маргалдах үедээ түргэн уурлахгүй байхыг хичээдэг.",
  "Багийн төсөл төлөвлөсөн ёсоор явахгүй бол арга барилаа өөрчилдөг.",
  "Ажлаа удаан хийж байхад тэвчээртэй байдаг.",
  "Чухал санаагаа хэлэхдээ сэтгэл хөдлөлөө хянаж чаддаг.",
  // Motivation
  "Хэцүү даалгавар байсан ч дуусгахын тулд өөрийгөө зоригжуулдаг.",
  "Хувийн зорилго тавьж, түүндээ хүрэхийн тулд хичээдэг.",
  "Шалгалтад унасан ч эсвэл ажлын боломж алдсан ч хурдан сэргэдэг.",
  "Ирээдүйн карьераа бодож шинэ ур чадвар сурахдаа урам зоригтой байдаг.",
  "Хичээлдээ сайн байсан ч өөрийгөө улам хөгжүүлэхийг хичээдэг.",
  "Богино хугацааны бэрхшээл тулгарсан ч урт хугацааны зорилгоо мартдаггүй.",
  "Клубын арга хэмжээ зохион байгуулахдаа амжилтад хүрэхэд баярладаг.",
  "Сүлжээ үүсгэх, сайн дурын ажилд идэвхтэй оролцдог.",
  // Empathy
  "Ангидаа хэн нэгэн сэтгэл дундуур байгааг анзаардаг.",
  "Багийн маргааны үеэр бусдын байр суурийг ойлгохыг хичээдэг.",
  "Багийн ажилд бусдыг тухтай байлгахын тулд харилцаагаа өөрчилдөг.",
  "Найз эсвэл хамтрагч нь хичээл, ажилд стресстэж байвал туслахыг хичээдэг.",
  "Багийн төсөл удааширч байхад багш яагаад уурлаж байгааг ойлгодог.",
  "Багийн гишүүн ганцаардаж байгааг анзаарвал хамруулахыг хичээдэг.",
  "Том илтгэлийн өмнө хэн нэгэнд урам өгөх хэрэгтэйг мэдэрдэг.",
  "Бусдад санал өгөхдөө тэдний сэтгэл санааг харгалздаг.",
  // Social Skills
  "Бүлгийн хэлэлцүүлэг, уулзалтын үеэр санаагаа тодорхой илэрхийлдэг.",
  "Өөрөөсөө өөр хүмүүстэй ч эерэг харилцаа үүсгэдэг.",
  "Судалгааны бүлэгт маргаан гарахад хурцадмал байдлыг намжаадаг.",
  "Багийн гишүүдийг нэг зорилгын төлөө урамшуулж чаддаг.",
  "Клубын үйл ажиллагаа, багийн төслийг удирдахад өөртөө итгэлтэй байдаг.",
  "Хичээл, дадлагын орчинд өөрийгөө тохируулж чаддаг.",
  "Бусдад урам өгөх, сайжруулах санал өгөхдөө эерэгээр ханддаг.",
  "Карьeрын үзэсгэлэн, оюутны арга хэмжээнд сүлжээ үүсгэж чаддаг.",
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
  "Баярлла",
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
  const [eqAnswers, setEqAnswers] = useState<number[]>([]);
  const [currentEqQuestion, setCurrentEqQuestion] = useState(0);
  const [bigFiveScores, setBigFiveScores] = useState<{
    Neuroticism: number;
    Extraversion: number;
    Openness: number;
    Agreeableness: number;
    Conscientiousness: number;
  } | null>(null);
  const [recommendedTests, setRecommendedTests] = useState<string[]>([]);

  // Total questions per test
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

  // Cumulative question counts for each stage
  const cumulativeQuestions = {
    personality: totalQuestions.personality, // 25
    mbti: totalQuestions.personality + totalQuestions.mbti, // 25 + 20 = 45
    eq: totalQuestions.personality + totalQuestions.mbti + totalQuestions.eq, // 45 + 40 = 85
    holland:
      totalQuestions.personality +
      totalQuestions.mbti +
      totalQuestions.eq +
      totalQuestions.holland, // 85 + 66 = 151
  };

  // Calculate stepIdx based on cumulative progress
  const calculateStepIdx = () => {
    let completedQuestions = 0;

    if (testType === "personality") {
      completedQuestions = currentQuestion;
      return (completedQuestions / cumulativeQuestions.personality) * 0.8; // 0 to 0.8 of step 0
    } else if (testType === "mbti") {
      completedQuestions =
        cumulativeQuestions.personality +
        currentMbtiCategory * 5 +
        currentMbtiQuestion;
      return (
        1 +
        ((completedQuestions - cumulativeQuestions.personality) /
          (cumulativeQuestions.mbti - cumulativeQuestions.personality)) *
          0.8
      ); // 1 to 1.8
    } else if (testType === "eq") {
      completedQuestions = cumulativeQuestions.mbti + currentEqQuestion;
      return (
        2 +
        ((completedQuestions - cumulativeQuestions.mbti) /
          (cumulativeQuestions.eq - cumulativeQuestions.mbti)) *
          0.8
      ); // 2 to 2.8
    } else if (testType === "holland") {
      completedQuestions =
        cumulativeQuestions.eq +
        currentHollandCategory * 11 +
        currentHollandQuestion;
      return (
        3 +
        ((completedQuestions - cumulativeQuestions.eq) /
          (cumulativeQuestions.holland - cumulativeQuestions.eq)) *
          0.8
      ); // 3 to 3.8
    } else if (testType === "result") {
      return 4; // 4
    }

    return 0; // Default
  };

  const stepIdx = Math.round(calculateStepIdx());

  // Add this function before the useEffect
  const calculateRecommendedTests = (
    bigFive: typeof bigFiveScores,
    mbti: MBTIScores,
    eq: number[],
    holland: typeof hollandAnswers
  ) => {
    const recommendations: { test: string; score: number }[] = [];

    // Analyze Big Five scores
    if (bigFive) {
      if (bigFive.Neuroticism > 70) {
        recommendations.push({
          test: "Stress Management Test",
          score: bigFive.Neuroticism,
        });
      }
      if (bigFive.Extraversion > 70) {
        recommendations.push({
          test: "Leadership Skills Assessment",
          score: bigFive.Extraversion,
        });
      }
      if (bigFive.Openness > 70) {
        recommendations.push({
          test: "Creativity Assessment",
          score: bigFive.Openness,
        });
      }
      if (bigFive.Agreeableness > 70) {
        recommendations.push({
          test: "Team Collaboration Assessment",
          score: bigFive.Agreeableness,
        });
      }
      if (bigFive.Conscientiousness > 70) {
        recommendations.push({
          test: "Time Management Skills Test",
          score: bigFive.Conscientiousness,
        });
      }
    }

    // Analyze MBTI scores
    const mbtiType = getMBTIType(mbti);
    if (mbtiType.includes("E")) {
      recommendations.push({ test: "Public Speaking Assessment", score: 75 });
    }
    if (mbtiType.includes("N")) {
      recommendations.push({ test: "Strategic Thinking Test", score: 70 });
    }
    if (mbtiType.includes("F")) {
      recommendations.push({
        test: "Emotional Intelligence Assessment",
        score: 80,
      });
    }
    if (mbtiType.includes("J")) {
      recommendations.push({
        test: "Project Management Skills Test",
        score: 75,
      });
    }

    // Analyze EQ scores
    const eqScores = calculateEQScore(eq);
    if (eqScores) {
      if (eqScores.selfAwareness < 60) {
        recommendations.push({ test: "Self-Awareness Assessment", score: 85 });
      }
      if (eqScores.socialSkills < 60) {
        recommendations.push({
          test: "Social Skills Development Test",
          score: 80,
        });
      }
    }

    // Analyze Holland Code
    const hollandCode = getHollandCode(holland);
    if (hollandCode.includes("R")) {
      recommendations.push({ test: "Technical Skills Assessment", score: 75 });
    }
    if (hollandCode.includes("I")) {
      recommendations.push({ test: "Research Skills Test", score: 70 });
    }
    if (hollandCode.includes("A")) {
      recommendations.push({
        test: "Artistic Expression Assessment",
        score: 75,
      });
    }
    if (hollandCode.includes("S")) {
      recommendations.push({ test: "Interpersonal Skills Test", score: 70 });
    }
    if (hollandCode.includes("E")) {
      recommendations.push({
        test: "Entrepreneurial Skills Assessment",
        score: 75,
      });
    }
    if (hollandCode.includes("C")) {
      recommendations.push({ test: "Organizational Skills Test", score: 70 });
    }

    // Sort by score and get top 5
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

      // Calculate recommended tests
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
      setEqAnswers((prev) => [...prev, score]);
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
      } else {
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
    return {
      selfAwareness: sum(eq.slice(0, 8)),
      selfRegulation: sum(eq.slice(8, 16)),
      motivation: sum(eq.slice(16, 24)),
      empathy: sum(eq.slice(24, 32)),
      socialSkills: sum(eq.slice(32, 40)),
      overall: sum(eq),
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
      "Leadership Skills Assessment": `${mbtiType} төрлийн хүмүүс зохион байгуулалт, шийдвэр гаргах чадвараараа алдартай бөгөөд энэ нь захиргааны менежерын үүрэгт тохирно. Тэд багийн ажил, стратегийн төлөвлөлтийг сайн удирдах чадвартай.`,
      "Technical Skills Assessment": `Энэ мэргэжил нь практик шийдвэр гаргах, техник асуудлыг шийдвэрлэх чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн хүчтэй тал болох зохион байгуулалт, ажлыг үр дүнтэй гүйцэтгэх чадварыг ашигладаг.`,
      "Research Skills Test": `Хууль сахиулах ажил нь дүрэм журам, зохион байгуулалт, шийдвэр гаргах чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн сайн талыг ашигладаг. Энэ мэргэжил нь тэдний шударга байдал, зохион байгуулалтын чадварыг илэрхийлдэг.`,
      "Financial Analysis": `Финансын аналитик нь тооцоолол, стратегийн төлөвлөлт, үр дүнтэй шийдвэр гаргах чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн сайн тал болох логик сэтгэлгээ, зохион байгуулалтын чадварыг ашигладаг.`,
      "Educational Management": `Боловсролын менежер нь зохион байгуулалт, стратегийн төлөвлөлт, харилцааны ур чадварыг шаарддаг бөгөөд ${mbtiType} хүмүүсийн хүчтэй тал болох зохион байгуулалт, шийдвэр гаргах чадварыг ашигладаг.`,
    };
    return (
      reasons[profession] ||
      "Энэ мэргэжил нь таны зан чанар, ур чадварт тохирно."
    );
  };

  const getRequiredSkills = (profession: string) => {
    const skills: { [key: string]: string } = {
      "Leadership Skills Assessment":
        "Зохион байгуулалт, харилцааны ур чадвар, стратегийн төлөвлөлт, мэдээлэл технологийн мэдлэг.",
      "Technical Skills Assessment":
        "Инженерийн мэдлэг, техник асуудлыг шийдвэрлэх чадвар, зохион байгуулалт, тооцооллын ур чадвар.",
      "Research Skills Test":
        "Хууль зүйн мэдлэг, харилцааны ур чадвар, шийдвэр гаргах чадвар, стрессийг удирдах чадвар.",
      "Financial Analysis":
        "Санхүүгийн мэдлэг, аналитик сэтгэлгээ, тооцооллын ур чадвар, стратегийн төлөвлөлт.",
      "Educational Management":
        "Харилцааны ур чадвар, зохион байгуулалт, стратегийн төлөвлөлт, боловсролын мэдлэг.",
    };
    return (
      skills[profession] ||
      "Мэргэжлийн ур чадвар, харилцааны ур чадвар, зохион байгуулалт."
    );
  };

  const getSalaryRange = (profession: string) => {
    const salaries: { [key: string]: string } = {
      "Leadership Skills Assessment": "20,000,000 - 40,000,000 MNT сард.",
      "Technical Skills Assessment": "25,000,000 - 50,000,000 MNT сард.",
      "Research Skills Test": "15,000,000 - 30,000,000 MNT сард.",
      "Financial Analysis": "30,000,000 - 60,000,000 MNT сард.",
      "Educational Management": "20,000,000 - 40,000,000 MNT сард.",
    };
    return salaries[profession] || "15,000,000 - 35,000,000 MNT сард.";
  };

  const getGrowthOpportunities = (profession: string) => {
    const opportunities: { [key: string]: string } = {
      "Leadership Skills Assessment":
        "Дээд удирдлагын албан тушаалд дэвших, илүү том байгууллагад ажиллах.",
      "Technical Skills Assessment":
        "Аж үйлдвэрийн салбарт дээд удирдлагын албан тушаалд дэвших, төсөл менежер болох.",
      "Research Skills Test":
        "Дээд албан тушаалд дэвших, илүү төв ажлыг удирдах.",
      "Financial Analysis":
        "Дээд удирдлагын албан тушаалд дэвших, санхүүгийн менежер болох.",
      "Educational Management":
        "Дээд удирдлагын албан тушаалд дэвших, томоохон боловсролын байгууллагад ажиллах.",
    };
    return (
      opportunities[profession] ||
      "Дээд удирдлагын албан тушаалд дэвших, илүү том байгууллагад ажиллах."
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
      {/* START UP logo/button top left */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-10 left-10 z-50 text-black px-12 py-6 text-4xl font-extrabold tracking-widest transition-all duration-200 hover:scale-110"
        style={{ letterSpacing: "0.2em" }}
      >
        START UP
      </button>
      {/* Main test area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 mb-6 text-center w-full max-w-2xl mx-auto px-4"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center mb-8 leading-tight">
              {currentQuestionText}
            </h2>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-4">
          <AnimatePresence mode="wait">
            {currentOptions.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleAnswer(index + 1)}
                className="flex items-center gap-4 w-full p-4 bg-white border border-gray-300 rounded-2xl shadow text-gray-900 text-base font-semibold transition-all duration-200 hover:bg-gray-100 hover:border-gray-500 hover:shadow-lg group min-h-[48px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-base group-hover:bg-white group-hover:text-gray-700 border-2 border-gray-700 transition-all"
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
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center justify-center h-screen mr-0">
        <TimelineCard
          steps={steps}
          currentStep={stepIdx}
          onStart={() => setShowWelcome(true)}
          className="hidden md:flex flex-col justify-between min-h-screen w-80 bg-white rounded-3xl p-8 ml-12"
        />
      </div>
    </div>
  );
};

export default TestPage;
