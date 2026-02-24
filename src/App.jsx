import { useState, useEffect } from 'react';
import {
  Menu, X, Github, Linkedin, Instagram, Mail,
  ExternalLink, FileText, ArrowRight,
  Code2, Server, Database, Globe, Terminal, Layout, Box, Smartphone, Layers, Bot
} from 'lucide-react';
import profileImage from './assets/my_photo.jpg';
import welcomePhoto from './assets/welcom_photo.png';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAtBottom, setIsAtBottom] = useState(false);

  // 스크롤 감지 및 섹션 활성화
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });

      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      setIsAtBottom(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ to, label, mobile }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`
        ${mobile ? 'block w-full text-left px-3 py-2' : 'inline-block px-3 py-2'}
        text-sm font-medium transition-colors duration-200
        ${activeSection === to 
          ? 'text-indigo-600 bg-indigo-50 rounded-md' 
          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md'}
      `}
    >
      {label}
    </button>
  );

  // 스킬 뱃지 컴포넌트 (반응형 개선)
  const SkillBadge = ({ icon: Icon, name, colorClass, level, subtitle }) => {
    // 레벨에 따른 게이지 너비와 스타일 설정
    const getLevelInfo = (lvl) => {
      switch (lvl) {
        case 'Top': return { width: '100%', textClass: 'text-indigo-600 bg-indigo-50 border-indigo-100' };
        case 'Middle': return { width: '60%', textClass: 'text-slate-600 bg-slate-50 border-slate-200' };
        case 'Low': return { width: '30%', textClass: 'text-slate-400 bg-slate-50 border-slate-100' };
        default: return { width: '0%', textClass: 'text-slate-300' };
      }
    };

    const { width, textClass } = getLevelInfo(level);
    const progressColor = colorClass.replace('bg-', 'bg-');

    return (
      <div className="flex flex-col p-3 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 group w-full">
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="flex items-center min-w-0 flex-1 mr-2"> {/* min-w-0와 flex-1로 텍스트 공간 확보 */}
            <div className={`p-1.5 sm:p-2 rounded-lg ${colorClass} bg-opacity-10 mr-2 sm:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon size={18} className={`${colorClass.replace('bg-', 'text-')} sm:w-5 sm:h-5`} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-slate-700 text-xs sm:text-sm">{name}</span>
              {subtitle && <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">{subtitle}</span>}
            </div>
          </div>
          <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${textClass}`}>
            {level}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${progressColor} opacity-80 transition-all duration-1000 ease-out`}
            style={{ width: width }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Scroll Down Arrow */}
      {!isAtBottom && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center animate-bounce">
          <span className="text-xs text-slate-400 mb-1 tracking-widest uppercase">Scroll</span>
          <div className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white/70 backdrop-blur-sm shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="text-xl font-bold font-mono text-slate-900 hover:text-indigo-600 transition-colors">
                &lt;Han's PortFolio /&gt;
              </span>
            </div>
            
            <div className="hidden md:flex space-x-4">
              <NavLink to="home" label="Home" />
              <NavLink to="about" label="About" />
              <NavLink to="experience" label="Experience" />
              <NavLink to="projects" label="Projects" />
              <NavLink to="contact" label="Contact" />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            <NavLink to="home" label="Home" mobile />
            <NavLink to="about" label="About" mobile />
            <NavLink to="experience" label="Experience" mobile />
            <NavLink to="projects" label="Projects" mobile />
            <NavLink to="contact" label="Contact" mobile />
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative pt-20 pb-20 lg:pt-32 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div>
              <img
                src={welcomePhoto}
                alt="한성민 아바타"
                className="max-w-xs w-full h-auto"
              />
            </div>
          </div>

          {/* <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="flex w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            Available for work
          </div> */}
          
          <h3 className="text-2xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            실패를 두려워 하지 않고 시도하는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">웹 개발자</span> 한성민입니다.
          </h3>
          
          <p className="mt-4 max-w-4xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
            사용자 경험을 최우선으로 생각하며, 유지보수가 가능하고 클린코드를 지향합니다.<br className="hidden md:block"/>
            새로운 기술을 배우고 적용하는 것을 즐깁니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-1"
            >
              프로젝트 보기 <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
            >
              연락하기
            </button>
          </div>
        </div>
      </section>

      {/* 2. About Section (Updated Tech Stack with Levels & Mobile Fix) */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">

            {/* Top: Profile & Bio */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
               <div className="relative group w-fit mx-auto lg:mx-0 mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white border border-slate-200 rounded-2xl w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-sm">
                    <img
                      src={profileImage}
                      alt="한성민 프로필"
                      className="w-full h-full object-contain"
                    />
                  </div>
              </div>
              </div>

              <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="text-indigo-600 mr-2">01.</span> About Me
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                비즈니스 로직 최적화와 AI 도입으로 운영 효율을 극대화하는 <strong>5년 차 풀스택 개발자</strong>입니다.
                단순히 동작하는 코드를 넘어, <strong>측정 가능한 성과</strong>를 만드는 개발을 지향합니다.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500"></span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    <strong className="text-slate-700">PHP Framework Mastery</strong> — CodeIgniter · Laravel을 활용해 입시·채용 전형 핵심 솔루션 7종을 설계·운영했습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500"></span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    <strong className="text-slate-700">Performance Engineering</strong> — MySQL 인덱스 최적화로 집중 트래픽 환경에서 응답 시간 2초 이내 안정화, 인프라 비용 15% 절감을 이끌었습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500"></span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    <strong className="text-slate-700">AI-Augmented Engineering</strong> — Ollama 기반 로컬 LLM 구축, AI Agent(Claude Code · Cursor) 워크플로우 통합으로 개발 생산성 1.5배 향상을 달성했습니다.
                  </p>
                </div>
              </div>

              <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors border-b-2 border-transparent hover:border-indigo-600 pb-1">
                {/* <FileText className="w-5 h-5 mr-2" /> 이력서 다운로드 */}
              </a>
              </div>
            </div>

            {/* Bottom: Tech Stack Grid */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 shadow-inner">
               <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </span>
                  Tech Stack
               </h3>

               <div className="space-y-8">
                  {/* Category: Backend & AI (핵심 강조 구역) */}
                  <div className="border-2 border-indigo-200 rounded-xl p-4 bg-indigo-50/30">
                    <h4 className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-4 pl-1 flex items-center">
                      <span className="mr-2">⭐</span> Backend & AI (Core)
                    </h4>

                    {/* BACKEND */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">BACKEND</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Code2} name="PHP" subtitle="Laravel, CodeIgniter" colorClass="bg-purple-600" level="Top" />
                        <SkillBadge icon={Server} name="Django" subtitle="Python Framework" colorClass="bg-green-700" level="Middle" />
                      </div>
                    </div>

                    {/* AI & DATA */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">AI & DATA</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Bot} name="Ollama (Local LLM)" colorClass="bg-purple-500" level="Top" />
                        <SkillBadge icon={Database} name="RAG" colorClass="bg-teal-600" level="Middle" />
                        <SkillBadge icon={Layout} name="PaddleOCR" colorClass="bg-green-600" level="Middle" />
                        <SkillBadge icon={Terminal} name="AI Agents" colorClass="bg-violet-600" level="Top" />
                        <SkillBadge icon={Database} name="MySQL" colorClass="bg-blue-600" level="Top" />
                      </div>
                    </div>

                    {/* INFRA */}
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">INFRA</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Server} name="AWS (EC2)" colorClass="bg-orange-500" level="Middle" />
                        <SkillBadge icon={Globe} name="Nginx" colorClass="bg-green-700" level="Middle" />
                      </div>
                    </div>
                  </div>

                  {/* Category: Frontend & Mobile (확장성 구역) */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Frontend & Mobile</h4>

                    {/* WEB */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">WEB</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Code2} name="JavaScript" colorClass="bg-yellow-500" level="Top" />
                        <SkillBadge icon={Layout} name="jQuery / Ajax" colorClass="bg-blue-500" level="Top" />
                        <SkillBadge icon={Box} name="HTML5/CSS3" colorClass="bg-orange-600" level="Top" />
                      </div>
                    </div>

                    {/* MOBILE */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">MOBILE</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Smartphone} name="Flutter" colorClass="bg-cyan-500" level="Middle" />
                      </div>
                    </div>

                    {/* TOOLS */}
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-2 pl-1">TOOLS</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SkillBadge icon={Terminal} name="Git" colorClass="bg-orange-600" level="Top" />
                        <SkillBadge icon={Box} name="Docker" colorClass="bg-blue-700" level="Middle" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Experience Section */}
      <section id="experience" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            <span className="text-indigo-600 mr-2">02.</span> Work Experience
          </h2>

          <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12">
            {[
              {
                period: "2024.06 - 현재",
                role: "PHP & AI 개발자 (서브 리더)",
                company: "(주)유이즈소프트",
                subRole: "주요 역할: 개발팀 서브 리더 및 AI 기술 도입 총괄 (시스템 고도화, AI 파이프라인 설계, DB 최적화)",
                sections: [
                  {
                    title: "AI Engineering & Modernization",
                    items: [
                      "Ollama 기반 로컬 LLM 환경 구축, 입시 비정형 데이터 가공 로직 개발",
                      "Claude Code, Cursor 등 AI Agent 워크플로우 통합으로 복잡한 로직 구현 및 리팩토링 생산성 1.5배 향상",
                      "AI를 활용한 단위 테스트 자동 생성으로 배포 후 결함 발생률 10% 감소",
                      "멀티 모델(Claude, Gemini, GPT) 최적화 활용 및 프롬프트 엔지니어링으로 데이터 추출 정밀도 확보",
                    ]
                  },
                  {
                    title: "System Architecture & Optimization",
                    items: [
                      "MySQL 실행 계획 분석 및 인덱스 최적화로 입시 시즌 집중 트래픽 환경에서 평균 응답 시간 2초 이내 안정화",
                      "Laravel 기반 엔터프라이즈 아키텍처 고도화",
                    ]
                  }
                ],
                stack: ["PHP", "Laravel", "CodeIgniter", "MySQL", "Ollama", "AI Agents"]
              },
              {
                period: "2021.07 - 2024.06",
                role: "PHP 풀스택 개발자",
                company: "(주)이즈소프트 - 대학플랫폼사업부",
                subRole: "주요 역할: 전형 시스템 풀스택 개발 및 운영 (7종 핵심 모듈 설계·개발, 인프라 비용 최적화)",
                sections: [
                  {
                    title: "입시/채용 전형 통합 관리 솔루션 개발",
                    items: [
                      "서류·면접 평가 & 실기 채점 시스템 (CI / Django): 실시간 데이터 검증 로직으로 채점 오류 0% 달성, 반응형 웹으로 Tablet/PC 환경 지원",
                      "실기 예약 시스템 리뉴얼 (Laravel / MySQL): 동시 접속자 1,000명 이상 처리를 위한 MySQL Lock 및 트랜잭션 제어 최적화로 무중단 예약 완료 환경 구축",
                      "합격 예측 & 출결 관리 시스템 (CI / Flutter): 3개년 입시 데이터 분석으로 분석 공수 50% 단축, QR 기반 출결 앱으로 수험생 데이터 확인 시간 30초 미만 단축",
                    ]
                  },
                  {
                    title: "인프라 및 업무 환경 개선",
                    items: [
                      "EC2 인스턴스 최적화 및 Reverse Proxy 도입으로 월 인프라 비용 약 15% 절감",
                      "사내 보안 프로세스 수립을 통해 민감한 입시 데이터 보안 가이드라인 구축",
                    ]
                  }
                ],
                stack: ["PHP", "CodeIgniter", "Laravel", "Django", "MySQL", "Flutter", "AWS", "Nginx"]
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${idx === 0 ? 'bg-indigo-600 group-hover:bg-indigo-700' : 'bg-slate-400 group-hover:bg-indigo-400'}`}></div>

                <div className="md:flex md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.role}</h3>
                  <span className="text-sm font-mono text-slate-500 mt-1 md:mt-0 block">{item.period}</span>
                </div>
                <div className="text-indigo-600 font-medium mb-2">{item.company}</div>

                {item.subRole && (
                  <p className="text-xs text-slate-500 mb-4 italic">{item.subRole}</p>
                )}

                {item.sections ? (
                  <div className="space-y-3 mb-4">
                    {item.sections.map((section, si) => (
                      <div key={si}>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{section.title}</p>
                        <ul className="list-disc list-outside ml-4 space-y-1.5 text-slate-600 text-sm">
                          {section.items.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm mb-4">
                    {item.desc.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.stack.map((s, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium rounded bg-white text-slate-600 border border-slate-200 shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-indigo-600 mr-2">03.</span> Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "HealingHi",
                desc: "Flutter를 이용한 명언 앱입니다. 매일 새로운 명언과 함께 힐링을 선사합니다. 기획서를 기반으로 바이브 코딩으로 진행한 프로젝트입니다.",
                tags: ["Flutter", "SupaBase", "AI"],
                icon: <Layout className="w-10 h-10 text-slate-400" />
              },
              {
                title: "이커머스 대시보드",
                desc: "판매자용 관리자 페이지입니다. Chart.js를 이용한 데이터 시각화와 드래그 앤 드롭을 이용한 상품 관리 기능을 구현했습니다.",
                tags: ["Next.js", "Tailwind", "Chart.js"],
                icon: <Box className="w-10 h-10 text-slate-400" />
              },
              {
                title: "실시간 채팅 앱",
                desc: "Socket.io를 이용한 실시간 채팅 서비스입니다. 방 만들기, 유저 초대, 이미지 전송 기능을 지원합니다.",
                tags: ["Node.js", "Socket.io", "MongoDB"],
                icon: <Globe className="w-10 h-10 text-slate-400" />
              }
            ].map((project, idx) => (
              <div key={idx} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-indigo-600 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl cursor-pointer">
                <div className="h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                  {project.icon}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                    <div className="flex space-x-3 text-slate-400">
                      <Github className="w-5 h-5 hover:text-indigo-600 transition-colors" />
                      <ExternalLink className="w-5 h-5 hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              깃허브에서 더 많은 프로젝트 보기 <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-indigo-600 font-mono mb-4 font-semibold">04. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get In Touch</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            현재 새로운 기회를 찾고 있습니다. 프로젝트 제안이나 채용 관련 문의,<br className="hidden md:block"/>
            혹은 단순한 커피챗도 언제나 환영합니다.
          </p>

          <a href="mailto:email@example.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 transform hover:scale-105">
            <Mail className="mr-2 w-5 h-5" /> 메일 보내기
          </a>

          <div className="mt-20 flex flex-col items-center">
            <div className="flex space-x-8 mb-8">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 Developer Portfolio. Built with React & Tailwind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;