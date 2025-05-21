import { NextResponse } from 'next/server';

const careerAdvice: { [key: string]: string } = {
  "Программист": `Программист мэргэжлийн зөвлөгөө:

Суурь шат:

   - Python эсвэл JavaScript хэл сурах
   - Алгоритм, өгөгдлийн бүтэц судлах
   - GitHub дээр төслүүд хийх
   - Version control

Дунд шат:

   - Нэг framework-ийг гүнзгий судлах
   - Багаар ажиллах ур чадвар хөгжүүлэх
   - Code review хийх, хүлээн авах
   - Database design

Дээд шат:

   - Системийн архитектур дизайн
   - Техникийн удирдлага
   - Шинэ технологи судлах
   - Team leadership

Цалин: 2,000,000₮ - 5,000,000₮
Шаардлагатай боловсрол: Программ хөгжүүлэлт, Компьютерийн ухаан
Сургуулиуд: ШУТИС, МУИС`,

  "Веб хөгжүүлэгч": `Веб хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - HTML, CSS, JavaScript сурах
   - Responsive дизайн
   - DOM манипуляци
   - Version control (Git)

Дунд шат:

   - React эсвэл Vue.js судлах
   - REST API ашиглах
   - State management
   - Database (MongoDB, MySQL)

Дээд шат:

   - Full-stack хөгжүүлэлт
   - Performance optimization
   - Security best practices
   - Cloud platforms (AWS, Azure)

Цалин: 1,800,000₮ - 4,500,000₮
Шаардлагатай боловсрол: Веб хөгжүүлэлт, Компьютерийн ухаан
Сургуулиуд: ШУТИС, МУИС`,

  "Мобайл хөгжүүлэгч": `Мобайл хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - Swift (iOS) эсвэл Kotlin (Android) сурах
   - UI/UX дизайн зарчим
   - App Store guidelines
   - Version control

Дунд шат:

   - Native app development
   - State management
   - API integration
   - Database

Дээд шат:

   - Cross-platform development
   - Performance optimization
   - App monetization
   - Team leadership

Цалин: 2,200,000₮ - 5,500,000₮
Шаардлагатай боловсрол: Мобайл хөгжүүлэлт, Компьютерийн ухаан
Сургуулиуд: ШУТИС, МУИС`,

  "AI/ML инженер": `AI/ML инженер мэргэжлийн зөвлөгөө:

Суурь шат:

   - Python, математик, статистик
   - Машин сургалтын үндэс
   - Data preprocessing

Дунд шат:

   - Deep learning frameworks
   - Model training & evaluation
   - Big data technologies

Дээд шат:

   - Research & development
   - Model deployment
   - AI ethics

Цалин: 3,000,000₮ - 7,000,000₮
Шаардлагатай боловсрол: AI/ML, Компьютерийн ухаан, Математик`,

  "Системийн админ": `Системийн админ мэргэжлийн зөвлөгөө:

Суурь шат:

   - Linux/Windows систем
   - Сүлжээний үндэс
   - Scripting (Bash, PowerShell)

Дунд шат:

   - Cloud platforms (AWS, Azure)
   - Containerization (Docker)
   - Monitoring tools

Дээд шат:

   - System architecture
   - Security & compliance
   - Disaster recovery

Цалин: 1,800,000₮ - 4,500,000₮
Шаардлагатай боловсрол: Системийн инженерчлэл, Сүлжээний ухаан`,

  "UX/UI дизайнер": `UX/UI дизайнер мэргэжлийн зөвлөгөө:

Суурь шат:

   - Figma, Adobe XD сурах
   - UI дизайны зарчим
   - Color theory, typography
   - Wireframing, prototyping

Дунд шат:

   - User research
   - Information architecture
   - Interaction design
   - Design systems

Дээд шат:

   - UX strategy
   - Team leadership
   - Design thinking
   - Product management

Цалин: 2,000,000₮ - 5,000,000₮
Шаардлагатай боловсрол: График дизайн, UX/UI дизайн`,

  "DevOps инженер": `DevOps инженер мэргэжлийн зөвлөгөө:

Суурь шат:

   - Linux систем
   - Git, CI/CD
   - Docker basics
   - Scripting (Python, Bash)

Дунд шат:

   - Kubernetes
   - Cloud platforms (AWS, Azure)
   - Infrastructure as Code
   - Monitoring & logging

Дээд шат:

   - System architecture
   - Security & compliance
   - Performance optimization
   - Team leadership

Цалин: 2,500,000₮ - 6,000,000₮
Шаардлагатай боловсрол: Системийн инженерчлэл, DevOps`,

  "Дата шинжэгч": `Дата шинжэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - SQL, Python
   - Data visualization
   - Statistics
   - Excel advanced

Дунд шат:

   - Data warehousing
   - ETL processes
   - Business intelligence
   - A/B testing

Дээд шат:

   - Machine learning
   - Big data technologies
   - Data strategy
   - Team leadership

Цалин: 2,200,000₮ - 5,500,000₮
Шаардлагатай боловсрол: Статистик, Математик, Компьютерийн ухаан`,

  "Кибер аюулгүй байдлын мэргэжилтэн": `Кибер аюулгүй байдлын мэргэжилтэн мэргэжлийн зөвлөгөө:

Суурь шат:

   - Network security
   - Operating systems
   - Security fundamentals
   - Basic programming

Дунд шат:

   - Penetration testing
   - Security tools
   - Incident response
   - Risk assessment

Дээд шат:

   - Security architecture
   - Compliance & audit
   - Team leadership
   - Security strategy

Цалин: 2,800,000₮ - 6,500,000₮
Шаардлагатай боловсрол: Кибер аюулгүй байдал, Сүлжээний ухаан`,

  "Блокчейн хөгжүүлэгч": `Блокчейн хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - Solidity programming
   - Blockchain basics
   - Smart contracts
   - Web3.js

Дунд шат:

   - DeFi protocols
   - NFT development
   - DApp architecture
   - Security best practices

Дээд шат:

   - Protocol design
   - Layer 2 solutions
   - Cross-chain development
   - Team leadership

Цалин: 3,000,000₮ - 7,000,000₮
Шаардлагатай боловсрол: Блокчейн технологи, Программ хөгжүүлэлт`,

  "Game Developer": `Game Developer мэргэжлийн зөвлөгөө:

Суурь шат:

   - Unity эсвэл Unreal Engine
   - C# эсвэл C++
   - Game design basics
   - 3D modeling basics

Дунд шат:

   - Game physics
   - AI programming
   - Multiplayer networking
   - Performance optimization

Дээд шат:

   - Game architecture
   - Team leadership
   - Project management
   - Monetization strategy

Цалин: 2,500,000₮ - 6,000,000₮
Шаардлагатай боловсрол: Game Development, Компьютерийн ухаан`,

  "Full Stack хөгжүүлэгч": `Full Stack хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - HTML, CSS, JavaScript
   - Node.js, Express
   - Database basics
   - Git version control

Дунд шат:

   - React/Vue/Angular
   - RESTful APIs
   - Database optimization
   - Authentication & authorization

Дээд шат:

   - System architecture
   - Microservices
   - DevOps practices
   - Team leadership

Цалин: 2,800,000₮ - 6,500,000₮
Шаардлагатай боловсрол: Full Stack Development, Компьютерийн ухаан`,

  "Frontend хөгжүүлэгч": `Frontend хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - HTML, CSS, JavaScript
   - Responsive design
   - Browser APIs
   - Version control

Дунд шат:

   - React/Vue/Angular
   - State management
   - Testing frameworks
   - Build tools

Дээд шат:

   - Performance optimization
   - Architecture patterns
   - Team leadership
   - Technical mentoring

Цалин: 2,000,000₮ - 5,000,000₮
Шаардлагатай боловсрол: Frontend Development, Компьютерийн ухаан`,

  "Backend хөгжүүлэгч": `Backend хөгжүүлэгч мэргэжлийн зөвлөгөө:

Суурь шат:

   - Node.js/Python/Java
   - Database design
   - API development
   - Authentication

Дунд шат:

   - Microservices
   - Message queues
   - Caching strategies
   - Security best practices

Дээд шат:

   - System architecture
   - Performance optimization
   - Team leadership
   - Technical mentoring

Цалин: 2,200,000₮ - 5,500,000₮
Шаардлагатай боловсрол: Backend Development, Компьютерийн ухаан`,

  "QA инженер": `QA инженер мэргэжлийн зөвлөгөө:

Суурь шат:

   - Manual testing
   - Test case design
   - Bug reporting
   - Basic automation

Дунд шат:

   - Selenium/Cypress
   - API testing
   - Performance testing
   - Test automation

Дээд шат:

   - Test strategy
   - CI/CD integration
   - Team leadership
   - Quality management

Цалин: 1,800,000₮ - 4,500,000₮
Шаардлагатай боловсрол: QA Engineering, Компьютерийн ухаан`,

  "Архитектор": `Архитектор мэргэжлийн зөвлөгөө:

Суурь шат:

   - AutoCAD, Revit сурах
   - Барилгын норм, дүрэм
   - Дизайны зарчим
   - 3D загварчлал
   - Барилгын материал судлал
   - Хот төлөвлөлтийн үндэс
   - Тооцоо, хэмжээс
   - Проект бэлтгэх

Дунд шат:

   - Барилгын зураг төсөл
   - Тооцоо, хэмжээс
   - Барилгын материал
   - Проект удирдлага
   - Хот төлөвлөлт
   - Байгаль орчны дизайн
   - Инженерчлэлийн систем
   - Барилгын технологи

Дээд шат:

   - Архитектур дизайн
   - Хот төлөвлөлт
   - Баг удирдлага
   - Олон улсын стандарт
   - Инновацийн дизайн
   - Тогтвортой барилга
   - Олон улсын төсөл
   - Архитектур судалгаа

Цалин: 2,500,000₮ - 6,000,000₮
Шаардлагатай боловсрол: Архитектур, Барилга архитектур
Сургуулиуд: ШУТИС (Шинжлэх Ухаан Технологийн Их Сургууль)
Хэрэглэгдэх программууд: AutoCAD, Revit, SketchUp, 3ds Max, Photoshop
Сертификат: LEED, BREEAM, Autodesk Certified Professional
Хөгжүүлэх ур чадвар: Креатив сэтгэлгээ, Техникийн мэдлэг, Коммуникацийн ур чадвар, Проект удирдлага`,

  "Багш": `Багш мэргэжлийн зөвлөгөө:

Суурь шат:

   - Сэтгэл судлал
   - Заах арга зүй
   - Хүүхдийн хөгжил
   - Хичээл бэлтгэх
   - Сургалтын технологи
   - Оюутны үнэлгээ
   - Анги удирдлага
   - Хичээлийн хөтөлбөр

Дунд шат:

   - Сургалтын технологи
   - Оюутны үнэлгээ
   - Хичээлийн хөтөлбөр
   - Баг хамт олон
   - Сургалтын судалгаа
   - Хичээлийн инноваци
   - Оюутны хөгжил
   - Сургалтын материал
Chinhusel
Цалин: 2,000,000₮ - 6,000,000₮
Шаардлагатай боловсрол: Хууль эрх зүй, Эрх зүйн ухаан
Сургуулиуд: МУИС, Дотоод хэргийн их сургууль
Сертификат: Хуульч мэргэжлийн гэрчилгээ, Олон улсын хууль эрх зүйн гэрчилгээ
Хөгжүүлэх ур чадвар: Хууль эрх зүйн мэдлэг, Аналитик сэтгэлгээ, Коммуникацийн ур чадвар, Удирдлагын ур чадвар`,

  "Цагдаа": `Цагдаа мэргэжлийн зөвлөгөө:

Суурь шат:

   - Хууль эрх зүй
   - Аюулгүй ажиллагаа
   - Физик бие бялдар
   - Хэрэг хяналт
   - Цагдаагийн үндэс
   - Хэрэг хяналт
   - Аюулгүй байдал
   - Цагдаагийн систем

Дунд шат:

   - Хэрэг хяналт
   - Аюулгүй байдал
   - Баг ажиллагаа
   - Проект удирдлага
   - Цагдаагийн стратеги
   - Цагдаагийн систем
   - Цагдаагийн инноваци
   - Цагдаагийн судалгаа

Дээд шат:

   - Хэрэг хяналт
   - Аюулгүй байдлын стратеги
   - Баг удирдлага
   - Олон улсын стандарт
   - Цагдаагийн систем
   - Цагдаагийн инноваци
   - Олон улсын цагдаа
   - Цагдаагийн стратеги

Цалин: 1,500,000₮ - 4,000,000₮
Шаардлагатай боловсрол: Цагдаагийн академи, Хууль эрх зүй
Сургуулиуд: Дотоод хэргийн их сургууль
Сертификат: Цагдаагийн мэргэжлийн гэрчилгээ, Аюулгүй ажиллагааны гэрчилгээ
Хөгжүүлэх ур чадвар: Хууль эрх зүйн мэдлэг, Физик бие бялдар, Баг ажиллагаа, Удирдлагын ур чадвар`,

  "Эмч": `Эмч мэргэжлийн зөвлөгөө:

Суурь шат:

   - Анатоми, физиологи
   - Эмнэлгийн үндэс
   - Анхны тусламж
   - Хэрэглэгчийн үйлчилгээ
   - Эмнэлгийн процедур
   - Эмнэлгийн төхөөрөмж
   - Аюулгүй ажиллагаа
   - Эмнэлгийн стандарт

Дунд шат:

   - Эмнэлгийн мэргэжил
   - Хэрэглэгчийн хяналт
   - Эмнэлгийн төхөөрөмж
   - Баг ажиллагаа
   - Эмнэлгийн систем
   - Эмнэлгийн инноваци
   - Эмнэлгийн судалгаа
   - Эмнэлгийн технологи

Дээд шат:

   - Эмнэлгийн удирдлага
   - Сургалт, бэлтгэл
   - Чанар хяналт
   - Баг удирдлага
   - Эмнэлгийн стратеги
   - Олон улсын стандарт
   - Эмнэлгийн систем
   - Эмнэлгийн инноваци

Цалин: 2,500,000₮ - 7,000,000₮
Шаардлагатай боловсрол: Анагаах ухаан, Эмнэлгийн мэргэжил
Сургуулиуд: АШУҮИС
Сертификат: Эмч мэргэжлийн гэрчилгээ, Олон улсын эмнэлгийн гэрчилгээ
Хөгжүүлэх ур чадвар: Эмнэлгийн мэдлэг, Хэрэглэгчийн үйлчилгээ, Баг ажиллагаа, Удирдлагын ур чадвар`
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body || !body.prompt) {
      console.error('Invalid request: Missing prompt');
      return NextResponse.json(
        { 
          error: 'Invalid request: prompt is required',
          details: 'The request body must contain a prompt field'
        },
        { status: 400 }
      );
    }

    const careerName = body.prompt.replace('Мэргэжил: ', '').trim();
    
    if (!careerName) {
      console.error('Invalid request: Empty career name');
      return NextResponse.json(
        { 
          error: 'Invalid request: career name is required',
          details: 'The prompt must contain a valid career name'
        },
        { status: 400 }
      );
    }

    console.log(`Processing request for career: ${careerName}`);

    const advice = careerAdvice[careerName];
    
    if (!advice) {
      console.log(`No advice found for career: ${careerName}`);
      return NextResponse.json({
        choices: [{
          text: `Уучлаарай, ${careerName} мэргэжлийн талаарх мэдээлэл одоогоор байхгүй байна.`
        }]
      });
    }

    console.log(`Successfully retrieved advice for career: ${careerName}`);
    return NextResponse.json({
      choices: [{
        text: advice
      }]
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}