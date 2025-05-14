"use client";

import { useState, useEffect } from "react";
import { questions } from "../../lib/TS_questions";
import Chatbot from "../../components/Chatbot";
import { useRouter } from "next/navigation";
import WelcomeScreen from "../../components/WelcomeScreen";
import React from "react";

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
      text: "During a campus club event, I:",
      optionA: "Enjoy meeting new people and joining group activities.",
      optionB:
        "Prefer having a few meaningful chats and leaving early to recharge.",
    },
    {
      text: "When working on a group project, I:",
      optionA: "Love brainstorming ideas with my teammates.",
      optionB: "Like thinking through my ideas alone before sharing.",
    },
    {
      text: "In a class discussion, I usually:",
      optionA: "Speak up with ideas as they come to me.",
      optionB: "Listen carefully and share when I've thought it through.",
    },
    {
      text: "At a career fair, I feel most comfortable:",
      optionA: "Talking to many recruiters and exploring all booths.",
      optionB: "Preparing questions and focusing on a few companies.",
    },
    {
      text: "After a long day of classes, I recharge by:",
      optionA: "Hanging out with friends or attending a campus event.",
      optionB: "Relaxing alone with a book, music, or Netflix.",
    },
  ],
  S_N: [
    {
      text: "When choosing a major, I focus on:",
      optionA: "Specific skills and job roles it prepares me for.",
      optionB: "How it aligns with my long-term dreams and interests.",
    },
    {
      text: "When solving a problem for a class project, I:",
      optionA: "Use proven methods and focus on the facts.",
      optionB: "Explore creative solutions and new ideas.",
    },
    {
      text: "In a lecture, I learn best from:",
      optionA: "Clear examples and step-by-step explanations.",
      optionB: "Big-picture concepts and future applications.",
    },
    {
      text: "When planning an internship application, I:",
      optionA: "Create a detailed checklist of tasks and deadlines.",
      optionB: "Focus on the role's potential to inspire my career.",
    },
    {
      text: "When reading a syllabus, I notice:",
      optionA: "Specific assignments and due dates.",
      optionB: "The course's overall goals and themes.",
    },
  ],
  T_F: [
    {
      text: "When resolving a disagreement in a group project, I:",
      optionA: "Focus on the most logical solution based on facts.",
      optionB: "Consider everyone's feelings and team harmony.",
    },
    {
      text: "When picking an internship, I prioritize:",
      optionA: "Pay, skills gained, and career advancement.",
      optionB: "A supportive team and meaningful work.",
    },
    {
      text: "When giving feedback to a classmate, I:",
      optionA: "Point out specific strengths and weaknesses.",
      optionB: "Encourage them while being mindful of their feelings.",
    },
    {
      text: "In a team decision, I:",
      optionA: "Analyze data to choose the best option.",
      optionB: "Ensure everyone's values are considered.",
    },
    {
      text: "When prioritizing school tasks, I base decisions on:",
      optionA: "Deadlines and objective importance.",
      optionB: "How tasks affect my goals and relationships.",
    },
  ],
  J_P: [
    {
      text: "When managing my school schedule, I prefer:",
      optionA: "A detailed plan with set study times.",
      optionB: "A flexible approach based on my mood or priorities.",
    },
    {
      text: "When starting a semester-long project, I:",
      optionA: "Set milestones and aim to finish early.",
      optionB: "Work in bursts and wrap up near the deadline.",
    },
    {
      text: "In my study space, I feel best when:",
      optionA: "Everything is organized and clutter-free.",
      optionB: "There's room for creative mess and spontaneity.",
    },
    {
      text: "When a professor changes an assignment, I:",
      optionA: "Adjust my plan quickly to stay on track.",
      optionB: "See it as a chance to try something new.",
    },
    {
      text: "My approach to career planning is:",
      optionA: "Setting clear goals with a timeline.",
      optionB: "Keeping options open and exploring as I go.",
    },
  ],
};

// EQ test questions
const eqQuestions = [
  // Self-Awareness
  "I notice when I'm feeling stressed about a school deadline before it overwhelms me.",
  "I can identify why I feel upset after a tough group project meeting.",
  "I understand how my mood affects my performance in class or at work.",
  "I recognize when my emotions (e.g., excitement, frustration) influence my decisions.",
  "I'm aware of my strengths and weaknesses when applying for internships.",
  "I can tell when I'm too nervous to perform well in a class presentation.",
  "I reflect on my emotions after a disagreement with a classmate or colleague.",
  "I know when I need a break to avoid burnout during exam season.",
  // Self-Regulation
  "I stay calm when a professor gives me unexpected critical feedback.",
  "I avoid snapping at a teammate even when I'm frustrated during a project.",
  "I can refocus after a disappointing grade or internship rejection.",
  "I manage my stress effectively during busy weeks (e.g., exams and club events).",
  "I resist impulsive reactions when someone disagrees with me in a debate.",
  "I adapt my approach when a group project isn't going as planned.",
  "I stay patient when a task (e.g., job application) takes longer than expected.",
  "I control my emotions when presenting ideas in a high-stakes setting.",
  // Motivation
  "I stay motivated to complete assignments even when they're challenging.",
  "I set personal goals (e.g., improving grades, landing an internship) and work toward them.",
  "I bounce back quickly after failing a test or missing a job opportunity.",
  "I feel excited about learning new skills for my future career.",
  "I push myself to improve, even when I'm already doing well in a class.",
  "I stay focused on long-term career goals despite short-term obstacles.",
  "I find satisfaction in completing tasks, like organizing a club event.",
  "I take initiative to seek out opportunities (e.g., networking, volunteering).",
  // Empathy
  "I can tell when a classmate is upset, even if they don't say it.",
  "I listen carefully to understand a teammate's perspective during a disagreement.",
  "I adjust my communication style to make others feel comfortable in group work.",
  "I offer support when a friend or colleague is stressed about school or work.",
  "I understand why a professor or boss might be frustrated with a project's progress.",
  "I notice when a group member feels left out and try to include them.",
  "I can sense when someone needs encouragement before a big presentation.",
  "I consider others' feelings when giving feedback on their work.",
  // Social Skills
  "I communicate my ideas clearly during group discussions or meetings.",
  "I build positive relationships with classmates, even if we're very different.",
  "I resolve conflicts in a study group without letting tensions escalate.",
  "I inspire my teammates to work together toward a shared goal.",
  "I feel confident leading a club activity or team project.",
  "I adapt my behavior to fit different social settings (e.g., class vs. internship).",
  "I give constructive feedback that motivates others to improve.",
  "I network effectively at career fairs or student events to make connections.",
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
    <div className="hidden md:flex flex-col items-center h-full min-h-[500px] bg-black w-80 rounded-3xl p-8 ml-12">
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
      ? ((mbtiCategoryOrder.indexOf(currentMbtiCategory) * 5 +
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-0 md:p-12">
      {/* Main test area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="mt-20 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 leading-tight">{currentQuestionText}</h2>
        </div>
        <div className="flex flex-col gap-8 w-full max-w-xl mx-auto">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index + 1)}
              className="flex items-center gap-6 w-full p-7 bg-white border border-gray-200 rounded-3xl shadow-md text-gray-900 text-xl font-semibold transition-all duration-200 hover:bg-[#E8D7B9] hover:border-[#B04B2F] hover:shadow-xl group min-h-[72px]"
            >
              <span className="w-14 h-14 flex items-center justify-center rounded-full bg-[#B04B2F] text-white font-bold text-2xl group-hover:bg-white group-hover:text-[#B04B2F] border-2 border-[#B04B2F] transition-all">{index + 1}</span>
              {option}
            </button>
          ))}
        </div>
        <button className="block mx-auto mt-10 text-gray-500 text-base font-semibold hover:underline">skip question</button>
      </div>
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center h-full ml-8 mt-12">
        <div className="bg-white rounded-3xl p-10 flex flex-col items-center w-96 min-h-[520px] relative shadow-lg border border-gray-100">
          <div className="absolute left-10 top-10 w-1 h-[calc(100%-80px)] bg-gray-200 rounded-full z-0"></div>
          <div className="flex flex-col gap-16 z-10 mt-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-base transition-all duration-200 ${idx === stepIdx ? 'bg-[#B04B2F] border-[#B04B2F]' : 'bg-white border-gray-300'}`}></div>
                <span className={`text-gray-900 text-lg ${idx === stepIdx ? 'font-bold' : 'font-normal'}`}>{step}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowWelcome(true)}
            className="absolute top-6 right-6 bg-[#B04B2F] text-white px-6 py-2 rounded-full text-base font-semibold shadow hover:bg-[#c96a4e] transition-colors"
          >
            Тест эхлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
