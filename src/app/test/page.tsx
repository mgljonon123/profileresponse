"use client";

import { useState, useEffect } from "react";
import { questions } from "../../lib/TS_questions";
import Chatbot from "../../components/Chatbot";
import { useRouter } from "next/navigation";
import WelcomeScreen from "../../components/WelcomeScreen";
import React from "react";
import TimelineCard from "../../components/TimelineCard";

// Holland Code test questions
const hollandQuestions = {
  R: [
    "Мужааны дамжаанд суралцан төгсөх",
    "Суудлын машин жолоодох",
    "Амины сууцандаа засвар хийх",
    "Цахилгаан эд зүйлсийг засварлах",
    "Хөгжмийн хөг тааруулах",
    "Гэр орныхоо эвдэрч элэгдсэн зүйлсийг засч янзлах",
    "Зуслангийн газартаа ажиллах",
    "Авто механикийн сургалтанд суралцан төгсөх",
    "Орон сууцны засвараа өөрөө хийх",
    "Техникийн асуудлууд шийдвэрлэх",
    "Хуучирч элэгдсэн хэрэгсэл, механик төхөөрөмжүүдийг засч сэлбэн ажиллагаатай болгох",
  ],
  I: [
    "Эрдэм шинжилгээний лабораторид ажиллах",
    "Практик амьдралын асуудлыг шийдвэрлэхэд тооны ухааныг хэрэглэх",
    "Шинжлэх ухааны онол, үзлүүдийг судлах",
    "Шинэ санал, зөвлөмж боловсруулах талаар мэдээллийг тунгаан судлах",
    "Шинжлэх ухааны ном, хэвлэл, сэтгүүлүүд унших",
    "Нарийн төвөгтэй асуудлын шийдвэрлэлийг олох",
    "Эрдэм шинжилгээний музей үзэх",
    "Янз бүрийн асуудлаар өгөгдөхүүнийг ангилах, системчлэх",
    "Статистикийн чиглэлээр дамжаа төгсөх",
    "Асуудлыг задлан шинжлэх",
    "Шинэ мэдлэг эзэмших",
  ],
  A: [
    "Хөгжим тоглох",
    "Сонин, сэтгүүлд материал бичиж өгөх",
    "Өгүүллэг, уран сайхны санаанд тулгуурлан жүжгийн зохиол туурвих",
    "Чуулга, найрал хөгжим, цөөхүүлийн бүрэлдэхүүнд тоглох",
    "Модон эдлэл эсвэл хувцас, хунарын загвар зохиох",
    "Хөрөг найруулал бичих юм уу, гэрэл зураг авах",
    "Дизайны сургалтанд оролцох",
    "Сонин, сэтгүүл эрхлэн гаргах",
    "Зураг, уран зураг зурж сурах",
    "Шүлэг унших, цээжлэх, бичих",
    "Гоёл чимэглэлийн эд зүйлс хийх",
  ],
  S: [
    "Нийгмийн хамгаалал, дэмжлэгийн хүрээлэлд ажиллах",
    "Харилцааны сэтгэл зүйн дамжаанд суралцах",
    "Насанд хүрээгүй хүмүүсийн хууль зөрчсөн баримтуудыг судлах",
    "Хүмүүсийн хоорондын харилцааны асуудлаар ярилцах, мэтгэлцэх",
    "Бусдыг ямар нэгэн ажил хийж гүйцэтгэхэд сургах",
    "Нийгэм судлалын талаар ном унших",
    "Хөгжлийн бэрхшээлтэй хүмүүст туслах",
    "Хүнд үед нь зөвлөгөө өгөх",
    "Сургуульд багшлах",
    "Хүүхдийн төлөө санаа тавьж, ахмад хүмүүст туслах",
    "Аялал жуулчлал, хөтлөгч эсвэл музейн тайлбарлагчийн дамжаанд суралцах",
  ],
  E: [
    "Төсөл эсвэл адил утгатай ямар нэг ажлын удирдагч байх",
    "Удирдлагын чиглэлээр семинар, сургалт төгсөх",
    "Бизнесийн болон засгийн газрын удирдлагын тухай унших",
    "Улс төрийн цаг үеийн ажилд оролцох",
    "Хувийн ажлуудаа санаачлан, удирдан гүйцэтгэх",
    "Чухал, хариуцлагатай үйл хэргийг шийдвэрлэх",
    "Хүмүүст нөлөөлөх",
    "Үнэ хаялцах болон дуудлага худалдаанд оролцох",
    "Бусад хүмүүсийн ажлыг удирдах",
    "Зах зээлийн ханшийг судлах",
    "Сонгуулийн ажлыг зохион байгуулах, явуулах",
  ],
  C: [
    "Ажлын өрөө ширээгээ эмх цэгцтэй байлгах",
    "Тооны машин байнга хэрэглэх",
    "Эд хөрөнгө данслах, цэслэх",
    "Өөрийн зарлагаа нягт тэмдэглэн авах",
    "Алдаа, алдангийг илрүүлэхээр баримтын шалгалт хийх",
    "Бизнес, санхүүгийн тооцоо хийх",
    "Албан бичиг баримтын хуулбар бүрдүүлэх",
    "Байгууллагын компьютер тооцолон бодох техник зэргийг удирдан ажиллуулах",
    "Стандарт маяг, дэлгэрэнгүй анкетууд хөтлөх",
    "Нягтлан бодох бүртгэлийн дамжаанд суралцах",
    "Албан бичиг төлөвлөх, хэвлэх",
  ],
} as const;

// MBTI test questions
const mbtiQuestions = {
  E_I: [
    {
      text: "Сургуулийн клубын арга хэмжээнд оролцохдоо:",
      optionA: "Шинэ хүмүүстэй танилцаж, бүлгийн үйл ажиллагаанд идэвхтэй оролцдог.",
      optionB: "Цөөн хэдэн хүнтэй утга учиртай яриа өрнүүлээд эртхэн гарч амардаг.",
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
      optionA: "Тодорхой жишээ, алхам алхмаар тайлбарлахаас хамгийн сайн сурдаг.",
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
type TestType = "personality" | "mbti" | "eq" | "holland";

const steps = [
  "Эхлэх",
  "Таны зан чанарын хэв маягийг тодорхойлох",
  "Танд тохирох ажил мэргэжлийн санал",
  "Хобби",
];

function TestTimeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="hidden md:flex flex-col justify-between min-h-screen w-80 bg-white rounded-3xl p-8 ml-12">
      <button className="bg-white text-black px-4 py-1 rounded-full text-xs font-semibold shadow mb-8 mt-2">Тест эхлэх</button>
      <div className="flex flex-col gap-16 relative w-full">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 relative z-10">
            <div className={`w-6 h-6 rounded-full border-4 border-black flex items-center justify-center ${idx === currentStep ? 'bg-white' : 'bg-white'} `}></div>
            <span className={`text-white ${idx === currentStep ? 'font-bold' : 'font-normal'}`}>{step}</span>
          </div>
        ))}
        <div className="absolute left-2 top-3 w-1 h-[calc(100%-24px)] bg-white/20 rounded-full z-0"></div>
      </div>
    </div>
  );
}

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

  // Step index for timeline
  let stepIdx = 0;
  if (testType === "personality") stepIdx = 1;
  else if (testType === "mbti" || testType === "eq" || testType === "holland") stepIdx = 2;
  // You can further refine stepIdx logic if needed

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
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((rec) => rec.test);
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

      // Log final test results summary
      console.log("=== Final Test Results ===");
      console.log("Big Five Scores:", bigFiveScores);
      console.log("MBTI Type:", getMBTIType(mbtiAnswers));
      console.log("MBTI Scores:", mbtiAnswers);
      console.log("EQ Scores:", calculateEQScore(eqAnswers));
      console.log("Holland Code:", getHollandCode(hollandAnswers));
      console.log("Holland Scores:", hollandAnswers);
      console.log("Recommended Tests:", recommendations);
      console.log("========================");

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
        // Calculate Big Five scores when personality test is completed
        const calculateBigFiveScores = (answers: Record<number, number>) => {
          // Initialize scores
          let scores = {
            Neuroticism: 0,
            Extraversion: 0,
            Openness: 0,
            Agreeableness: 0,
            Conscientiousness: 0,
          };

          // Calculate scores based on answers
          Object.entries(answers).forEach(([questionId, answer]) => {
            const question = questions.find((q) => q.id === Number(questionId));
            if (!question) return;

            // Convert answer (1-5) to percentage (0-100)
            // For reverse questions, invert the score
            const rawScore = question.reverse ? 6 - answer : answer;
            const percentage = ((rawScore - 1) / 4) * 100;

            // Add to appropriate category
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

          // Calculate averages
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

          // Calculate final scores as percentages
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

        // Set Big Five scores
        const bigFiveResults = calculateBigFiveScores(newAnswers);
        setBigFiveScores(bigFiveResults);
        console.log("Big Five Scores Calculated:", bigFiveResults);

        setTestType("mbti");
        setCurrentMbtiCategory(0);
        setCurrentMbtiQuestion(0);
      }
    } else if (testType === "mbti") {
      const categoryIndex = currentMbtiCategory;
      const category = mbtiCategoryOrder[categoryIndex] as MBTICategory;
      const q = mbtiQuestions[category][currentMbtiQuestion];
      currentQuestionText = q.text;
      currentOptions = [
        `A. ${q.optionA ? q.optionA : "Сонголт A"}`,
        `B. ${q.optionB ? q.optionB : "Сонголт B"}`,
      ];
      setMbtiAnswers((prev) => {
        const updated = { ...prev };
        // Debug log for MBTI scoring
        console.log("MBTI Answer Debug:", {
          category,
          score,
          currentQuestion: currentMbtiQuestion + 1,
          beforeUpdate: { ...prev },
        });

        if (score <= 3) {
          // Option A (1-3) adds to first letter
          if (category === "E_I") {
            updated.E_I.E += score === 1 ? 2 : score === 2 ? 1 : 0;
          }
          if (category === "S_N") {
            updated.S_N.S += score === 1 ? 2 : score === 2 ? 1 : 0;
          }
          if (category === "T_F") {
            updated.T_F.T += score === 1 ? 2 : score === 2 ? 1 : 0;
          }
          if (category === "J_P") {
            updated.J_P.J += score === 1 ? 2 : score === 2 ? 1 : 0;
          }
        } else {
          // Option B (4-5) adds to second letter
          if (category === "E_I") {
            updated.E_I.I += score === 5 ? 2 : 1;
          }
          if (category === "S_N") {
            updated.S_N.N += score === 5 ? 2 : 1;
          }
          if (category === "T_F") {
            updated.T_F.F += score === 5 ? 2 : 1;
          }
          if (category === "J_P") {
            updated.J_P.P += score === 5 ? 2 : 1;
          }
        }

        // Debug log after update
        console.log("MBTI Score Update:", {
          category,
          score,
          afterUpdate: { ...updated },
        });

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
          // Log final MBTI scores before moving to next test
          console.log("Final MBTI Scores:", mbtiAnswers);
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
    } else {
      // Holland Code
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
      }
    }
  };

  // Helper functions for final results
  const getMBTIType = (mbti: MBTIScores) => {
    const type = [
      mbti.E_I.E > mbti.E_I.I ? "E" : "I",
      mbti.S_N.S > mbti.S_N.N ? "S" : "N",
      mbti.T_F.T > mbti.T_F.F ? "T" : "F",
      mbti.J_P.J > mbti.J_P.P ? "J" : "P",
    ].join("");

    // Log detailed MBTI scoring
    console.log("MBTI Type Calculation:", {
      E_I: { E: mbti.E_I.E, I: mbti.E_I.I, diff: mbti.E_I.E - mbti.E_I.I },
      S_N: { S: mbti.S_N.S, N: mbti.S_N.N, diff: mbti.S_N.S - mbti.S_N.N },
      T_F: { T: mbti.T_F.T, F: mbti.T_F.F, diff: mbti.T_F.T - mbti.T_F.F },
      J_P: { J: mbti.J_P.J, P: mbti.J_P.P, diff: mbti.J_P.J - mbti.J_P.P },
      finalType: type,
    });

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

  const progress =
    testType === "personality"
      ? ((currentQuestion + 1) / questions.length) * 100
      : testType === "mbti"
      ? ((currentMbtiCategory * 5 +
          currentMbtiQuestion +
          1) /
          (mbtiCategoryOrder.length * 5)) *
        100
      : testType === "eq"
      ? ((currentEqQuestion + 1) / eqQuestions.length) * 100
      : ((currentHollandCategory * 11 + currentHollandQuestion + 1) /
          (Object.keys(hollandQuestions).length * 11)) *
        100;

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
    currentQuestionText = hollandQuestions[currentCategory][currentHollandQuestion];
    currentOptions = ["Тийм", "Үгүй"];
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-white flex flex-col md:flex-row items-center justify-end p-0">
      {/* START UP logo/button top left */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-50 bg-white text-black px-6 py-3 rounded-full text-[28px] text-lg font-bold tracking-widest   "
        style={{letterSpacing: '0.1em'}}
      >
        START UP
      </button>
      {/* Main test area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="mt-8 mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center mb-8 leading-tight">{currentQuestionText}</h2>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index + 1)}
              className="flex items-center gap-4 w-full p-4 bg-white border border-gray-300 rounded-2xl shadow text-gray-900 text-base font-semibold transition-all duration-200 hover:bg-gray-100 hover:border-gray-500 hover:shadow-lg group min-h-[48px]"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white font-bold text-base group-hover:bg-white group-hover:text-gray-500 border-2 border-gray-500 transition-all">{index + 1}</span>
              {option}
            </button>
          ))}
        </div>
        <button className="block mx-auto mt-4 text-gray-500 text-sm font-semibold hover:underline">skip question</button>
      </div>
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center justify-center h-screen mr-0">
        <TimelineCard
          steps={steps}
          currentStep={stepIdx}
          onStart={() => setShowWelcome(true)}
          className="w-full h-full max-w-none min-h-screen rounded-none"
        />
      </div>
    </div>
  );
};

export default TestPage;
