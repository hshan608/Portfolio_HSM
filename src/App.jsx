import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Github, Linkedin, Instagram, Mail, 
  ExternalLink, FileText, ArrowRight, 
  Code2, Server, Database, Globe, Cpu, Terminal, Layout, Box, Smartphone, Layers
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
  const SkillBadge = ({ icon: Icon, name, colorClass, level }) => {
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
            <span className="font-semibold text-slate-700 text-xs sm:text-sm truncate">{name}</span> {/* truncate로 긴 텍스트 말줄임 */}
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
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="text-xl font-bold font-mono text-slate-900 hover:text-indigo-600 transition-colors">
                &lt;DevPort /&gt;
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
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="flex w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            Available for work
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            문제를 해결하는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">웹 개발자</span> 홍길동입니다.
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
            사용자 경험을 최우선으로 생각하며, 유지보수가 가능한 깔끔한 코드를 작성합니다.<br className="hidden md:block"/>
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
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Profile & Bio */}
            <div>
               <div className="relative group w-fit mx-auto lg:mx-0 mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white border border-slate-200 rounded-2xl w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-sm flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <FileText className="w-16 h-16 mx-auto mb-4" />
                      <span>Profile Image</span>
                    </div>
                  </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="text-indigo-600 mr-2">01.</span> About Me
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                안녕하세요! 웹 기술로 세상에 가치를 더하고 싶은 <strong>3년차 프론트엔드 개발자</strong>입니다. 
                단순히 기능이 동작하는 것을 넘어, 사용자가 "편하다"고 느끼는 UI/UX를 고민합니다.
              </p>
              <p className="text-slate-500 mb-8 leading-relaxed">
                JavaScript 생태계에 깊은 관심을 가지고 있으며, 최근에는 React와 TypeScript를 주력으로 사용하고 있습니다. 
                팀원과의 원활한 소통을 중요시하며, 코드 리뷰 문화를 사랑합니다.
              </p>
              
              <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors border-b-2 border-transparent hover:border-indigo-600 pb-1">
                <FileText className="w-5 h-5 mr-2" /> 이력서 다운로드
              </a>
            </div>

            {/* Right: Tech Stack Grid */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 shadow-inner">
               <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </span>
                  Tech Stack
               </h3>

               <div className="space-y-8">
                  {/* Category: Frontend */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Frontend</h4>
                    {/* 모바일에서는 1열(grid-cols-1), 작은 태블릿부터 2열(sm:grid-cols-2)로 변경 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <SkillBadge icon={Code2} name="React.js" colorClass="bg-blue-500" level="Top" />
                      <SkillBadge icon={Layout} name="Next.js" colorClass="bg-slate-800" level="Middle" />
                      <SkillBadge icon={Box} name="TypeScript" colorClass="bg-blue-600" level="Middle" />
                      <SkillBadge icon={Globe} name="Tailwind" colorClass="bg-teal-500" level="Top" />
                      <SkillBadge icon={Smartphone} name="React Native" colorClass="bg-cyan-500" level="Low" />
                    </div>
                  </div>

                  {/* Category: Backend & Tools */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Backend & Tools</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <SkillBadge icon={Server} name="Node.js" colorClass="bg-green-600" level="Middle" />
                      <SkillBadge icon={Database} name="Firebase" colorClass="bg-yellow-500" level="Middle" />
                      <SkillBadge icon={Terminal} name="Git" colorClass="bg-orange-600" level="Top" />
                      <SkillBadge icon={Cpu} name="AWS" colorClass="bg-orange-500" level="Low" />
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
                period: "2023.01 - 현재",
                role: "프론트엔드 개발자",
                company: "ABC 스타트업",
                desc: [
                  "사내 어드민 대시보드 UI/UX 전면 개편 (React, MUI 도입)",
                  "Lighthouse 성능 최적화를 통해 초기 로딩 속도 2.5초 -> 1.2초 단축",
                  "공통 컴포넌트 라이브러리 구축 및 문서화"
                ],
                stack: ["React", "TypeScript", "Redux"]
              },
              {
                period: "2021.06 - 2022.12",
                role: "웹 퍼블리셔",
                company: "XYZ 에이전시",
                desc: [
                  "다양한 기업의 반응형 웹사이트 10여 개 제작 및 유지보수",
                  "웹 접근성(Web Accessibility) 지침 준수 마크업 진행",
                  "JQuery를 활용한 동적 UI 인터랙션 구현"
                ],
                stack: ["HTML/CSS", "jQuery", "Gulp"]
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${idx === 0 ? 'bg-indigo-600 group-hover:bg-indigo-700' : 'bg-slate-400 group-hover:bg-indigo-400'}`}></div>
                
                <div className="md:flex md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.role}</h3>
                  <span className="text-sm font-mono text-slate-500 mt-1 md:mt-0 block">{item.period}</span>
                </div>
                <div className="text-indigo-600 font-medium mb-4">{item.company}</div>
                
                <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm mb-4">
                  {item.desc.map((d, i) => <li key={i}>{d}</li>)}
                </ul>

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
                title: "나만의 영화 기록장",
                desc: "TMDB API를 활용하여 영화를 검색하고 평점을 기록할 수 있는 웹 애플리케이션입니다. 무한 스크롤 기능과 반응형 디자인을 지원합니다.",
                tags: ["React", "Redux", "Styled-Comp"],
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