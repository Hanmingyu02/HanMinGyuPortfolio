export const site={title:'한민규 포트폴리오',url:'https://hanmingyu02.github.io/HanMinGyuPortfolio',base:'/HanMinGyuPortfolio',name:'한민규',email:null,github:null};
export const menu=[['experience','현장실습'],['projects','프로젝트'],['education','교육사항'],['certifications','자격증'],['awards','수상내역']];
const root='https://wonderfulrosemari.github.io/img/projects/';
export const projects=[
{slug:'luno',title:'LUNO',category:'모바일 보안 · AI',summary:'통화 음성의 언어·비언어 신호와 문자 URL을 결합해 보이스피싱 위험을 판별하는 모바일 보안 서비스',period:'2025.10–2026.01',role:'3인 팀 · 팀원',tags:['Spring Boot','FastAPI','Kotlin','MySQL','Snapshot Cache','k6'],logo:'logo.png',cover:'home-screen.png',metrics:[['약 86% → 92%','금융감독원 사례 약 140건 내부 라벨 일치율 · 실서비스 정확도 아님'],['480,007건 / 실패 0','로컬 1,000 RPS 목표 · H2 + 대체 로컬 AI + health 포함']],
decisions:[
{title:'CLOVA STT — 통화 내용을 텍스트로 변환',body:'통화 내용을 분석하려면 먼저 음성을 글로 바꿔야 했습니다. 음성 인식 모델을 직접 만드는 대신 CLOVA STT를 연결하고, 변환된 텍스트를 보이스피싱 분석에 사용했습니다.'},
{title:'SBERT·한국어 BERT — 단어뿐 아니라 의미와 문맥도 확인',body:'특정 단어가 나왔다고 모두 보이스피싱은 아닙니다. 반대로 같은 수법이라도 표현은 달라질 수 있습니다. 그래서 키워드 검사에 더해 SBERT로 의미 유사도를, 한국어 BERT로 문맥을 분석했습니다.'},
{title:'Naive Bayes·규칙 — 다른 방식의 분석 결과도 함께 반영',body:'SBERT와 BERT 결과만 사용하지 않고, Naive Bayes의 텍스트 분류 결과와 키워드별 규칙 점수도 함께 반영했습니다. 최종 위험도는 이 분석 결과들을 결합해 계산했습니다.'},
{title:'FastAPI — Python 분석 코드를 서비스와 연결',body:'AI 분석은 Python으로, 회원 인증과 분석 이력 관리는 Spring Boot로 구현했습니다. Python 모델을 호출할 수 있도록 FastAPI 서버를 따로 두고, Spring Boot에서 분석을 요청하고 결과를 받도록 연결했습니다.'}
],
sections:[
['Overview','프로젝트 소개',['통화 녹음을 CLOVA STT로 전사하고 여러 텍스트 모델과 규칙 점수를 결합해 위험도를 안내하는 Android 서비스입니다. 대회 당시에는 텍스트 중심으로 분석했고, 이후 발화 속도와 무음 구간을 추가했습니다. 공공 스팸번호·피싱 URL을 초기 데이터로 활용하고 위험 판정 후 대응 절차를 안내합니다.']],
['Role','담당 역할',['팀 개발: 팀원으로 기획, 구조 설계, 기능 통합, 배포를 진행하고 Android·Spring Boot·Python AI 서버의 요청·결과 흐름을 연결했습니다.','개인 후속 작업: 발화 특성 추가, URL Snapshot Cache, 지표·로그 수집 및 k6 로컬 부하테스트 기반 개선을 직접 진행했습니다.']],
['Problem & Solution','문제와 해결',[
'텍스트 분석의 한계 → CLOVA STT 전사 후 SBERT 의미 유사도, 한국어 BERT 문맥, Naive Bayes 통계 분류와 규칙 점수를 결합했습니다. 개인 후속 작업에서 발화 속도·무음 구간을 추가했습니다. 약 140건 내부 사례 비교에서 정답 일치율 약 86% → 92%이며 외부 독립 평가나 운영 정확도가 아닙니다.',
'초기 신고 데이터 부족 → KISA·과학기술정보통신부 관련 공공데이터의 스팸번호를 DB에 사전 적재하고 공개 피싱·스미싱 URL 목록을 초기 조회 기준으로 활용했습니다.',
'URL 조회 → 기존 phishing_url 테이블의 findByUrlIn() 조회 대신 유효한 불변 Set Snapshot Cache에서 포함 여부를 확인합니다. 30초마다 갱신하고 최대 100,000개를 관리합니다. 캐시가 없거나 마지막 성공 갱신 후 2분을 초과하면 DB로 대체합니다. 갱신 실패 시 허용 시간까지 기존 스냅샷을 사용하므로 신규 URL 반영이 늦어질 수 있습니다. mock 테스트로 캐시·DB 경로를 검증했으며 실제 SQL 감소율이나 일관된 p95 개선은 확인하지 않았습니다.',
'타임아웃 분석 → Prometheus·Grafana·Loki·Alloy·Alertmanager로 지연·실패·CPU·Hikari 풀·조회 경로와 로그를 관찰했습니다. Docker k6 1,000 RPS/60초에서 60,002건 중 타임아웃 14건이 발생했고 IPv4 변경 뒤에도 재현됐습니다.',
'실행 환경 비교 → 동일 앱·DB 풀·캐시 ON·요청 구성·목표 부하를 유지하고 Mac native k6로 변경했습니다. 독립 60초 시험 3회와 300초 시험 1회에서 총 480,007건, 실패 0건, dropped iterations 0건을 관찰했습니다. H2 메모리 DB, URL 3개, 문자 요청 약 70%·대체 로컬 AI 약 30%, health 요청 포함 조건입니다. 실제 STT·Firebase·운영 MySQL·최대 처리량 검증이 아니며 Docker 타임아웃 근본 원인과 캐시 기여도는 확정하지 않았습니다.'
]],
['Implementation','주요 기능',['통화 위험도: 안전 0–30 / 주의 31–60 / 위험 61–100.','문자 URL 추출과 목록 기반 위험 검사, 스팸번호 사전 적재·조회·제보 관련 기능.','자금 이체·개인정보 유출 상황별 대응 안내와 경찰·금감원 전화 연결.','회원 인증, 분석 이력, 추론 API 연동 및 로컬 운영 진단.']],
['Architecture','시스템 구조',['Android(Kotlin·Compose) → Spring Boot(인증·분석 이력·API) → Firebase Storage / CLOVA STT → FastAPI(AI 분석) → 결과 반환','MySQL·Redis는 서비스 데이터와 토큰 등에 사용합니다. URL 조회용 로컬 불변 Set Snapshot Cache는 Redis와 별개입니다. 관측: Prometheus / Grafana / Loki / Alloy.']],
['Tech Stack','기술 구성',['Mobile: Kotlin, Jetpack Compose','Backend: Java 17, Spring Boot, JPA, Spring Security, JWT, REST API','Data: MySQL, Redis, Snapshot Cache','AI: Python, FastAPI, CLOVA STT, SBERT, 한국어 BERT, Naive Bayes','Infra & Test: Nginx, AWS, Prometheus, Grafana, Loki, Alloy, Alertmanager, k6']],
['Results','결과와 검증 범위',['Google Play 배포. 스토어 상세 URL은 확인 후 추가할 예정입니다.','내부 약 140건 정답 일치율 약 86% → 92%. 로컬 반복시험 480,007건 실패 0건이며 위 시험 조건에 한정됩니다.']],
['Awards','관련 수상',['DX·AX 기반 역량 강화 프로젝트 장려상 · 국립금오공과대학교 교수학습혁신센터 · 2026.02.04']],
['Next Steps','다음 개선 방향',['공공 목록과 사용자 제보를 중복 제거·관리자 검증을 거쳐 결합하는 방안을 계획하고 있습니다.','판정 근거·불확실성 시각화 및 공공 목록 업데이트 체계를 고도화할 예정입니다.']],
['Links','관련 자료',['화면·구조도·상장은 아래 원본 이미지로 확인할 수 있습니다. 별도 소스 코드·스토어·시연 영상 URL은 제공되지 않았습니다.']]],
media:[['home-screen.png','앱 홈 화면'],['voice-result.png','실제 앱 통화 분석 결과'],['sms-analysis.png','문자 URL 분석 화면'],['phone-input.png','전화번호 입력 화면'],['post-incident-guide.png','피해 의심 시 사후 대응 안내'],['voice-analysis-architecture.png','음성 분석 시스템 처리 흐름'],['monitoring/before-timeout.jpg','실행 환경 변경 전 타임아웃 관측 화면'],['monitoring/after-timeout.jpg','실행 환경 변경 후 모니터링 화면']]},
{slug:'catch-me',title:'Catch Me',category:'하이브리드 앱 · AI',summary:'AI 기반 실종·목격 제보와 보호자·입양자를 연결하는 유기동물 통합 플랫폼',period:'1개월 · 본격 구현 약 2주',role:'5인 팀 · 팀원',tags:['Spring Boot','React','MariaDB','FastAPI','CLIP','Morpheus'],logo:'logo.png',cover:'map-report.png',metrics:[['86.33% → 95.00%','동일 검증 이미지 300장 · 259 → 285장 정답 · +8.67%p'],['약 3만 장','CLIP 추가 학습에 사용한 이미지 수']],
sections:[
['Overview','프로젝트 소개',['실종·목격 신고, 보호소 정보, 입양 게시글, 실시간 채팅을 통합한 하이브리드 앱입니다. 지도에서 주변 정보를 확인하고 AI 이미지 분석과 위치 정보를 결합해 유사 목격 제보를 탐색합니다.']],
['Role','담당 역할',['팀원: 요구사항 정의서·설계 명세서·WBS로 짧은 일정의 범위와 우선순위를 구체화했습니다.','개인 담당: DB·공공 API, 지도 마커 최적화, CLIP 학습·검증 및 서비스 연동.','팀 전체 구현: 실종·목격·입양·보호소 화면 및 WebSocket 채팅 등 통합 앱 기능.']],
['Problem & Solution','문제와 해결',['마커 누적 → 프로젝트에서 정한 7일 골든타임 기준으로 오래된 실종·목격 마커를 생성 대상에서 제외했습니다. 경과 시간별 표현과 밀집 마커 클러스터링을 적용해 숫자·색상으로 밀집도를 보여줍니다. 최근 정보 접근성과 가독성을 개선했으며 렌더링 속도는 정량 측정하지 않았습니다.','유사 동물 탐색 → Google Open Images Dog 클래스 기반 약 3만 장의 품종·색상 이미지로 openai/clip-vit-large-patch14-336 계열을 추가 학습했습니다. 동일 300장 검증 세트에서 259 → 285장 정답, 86.33% → 95.00%(+8.67%p)를 기록했습니다. FastAPI로 추론을 분리하고 위치 정보를 함께 활용합니다. 동일 개체 확정이 아닌 후보 추천입니다.','분산된 공공 정보 → 농림축산검역본부 동물보호센터 공공 API의 위치·주소와 국가동물보호정보시스템 공개 정보를 연결했습니다. 카카오 Local API로 주소를 좌표로 변환하고 동기화·조회 흐름을 구성했습니다.']],
['Implementation','주요 기능',['유형별 실종·목격·보호소 지도 마커, 7일 기준 표시와 클러스터링.','CLIP 기반 유사 동물 후보 추천. 장소·시각·사진·설명을 포함한 목격 제보.','지역·나이·품종·색상 기반 입양 게시글 검색 및 보호소 동물 필터.','WebSocket 기반 실시간 채팅은 팀 전체 구현 기능입니다.']],
['Architecture','시스템 구조',['React 화면 → Morpheus WebView → Spring Boot API ↔ MariaDB','AI: FastAPI + CLIP. 외부 연계: 보호소 공공 API·국가동물보호정보시스템·카카오 Local API. Spring Security/JWT 인증 및 JPA 데이터 접근.','MariaDB는 MySQL과 비교해 라이선스·배포 조건 및 기업 담당자 의견을 검토해 선택했습니다.']],
['Tech Stack','기술 구성',['Backend & Data: Java 17, Spring Boot, JPA, SQL, MariaDB, Spring Security, JWT, REST API','Frontend & Mobile: HTML5, JavaScript, React, Morpheus','AI: Python, FastAPI, CLIP']],
['Results','결과와 검증 범위',['동일 이미지 300장 검증 정확도 86.33% → 95.00%. 추가 학습 이미지 약 3만 장.','7일 기준·클러스터링으로 최근 제보 중심 탐색을 개선하고 실종·목격·보호소·입양 정보를 연결했습니다.']],
['Awards','관련 수상',['WebKit640 6기 팀 프로젝트 경연 최우수상 · 2025.05.22','경북 네트워크형 캠퍼스 SW아카데미 장려상 · 2025.06.04','한국정보기술학회 우수논문상 동상 · 2025.11.28']],
['Next Steps','다음 개선 방향',['사용자 피드백 기반 오탐 분석·재학습, 신고 신뢰도 관리 및 공공데이터 동기화 실패 알림을 계획합니다.']],
['Links','관련 자료',['아래 공공데이터 출처와 기존 상세 자료에서 관련 정보를 확인할 수 있습니다.']]],
links:[['보호소 공공데이터','https://www.data.go.kr/data/15025454/standard.do'],['국가동물보호정보시스템','https://www.animal.go.kr/front/awtis/loss/lossList.do?menuNo=1000000057'],['기존 프로젝트 상세 자료','https://wonderfulrosemari.github.io/projects/catch-me']],
media:[['map-report.png','실종·목격 제보 지도 화면'],['cluster-thresholds.png','경과 시간과 클러스터 표시 기준'],['accuracy-result.png','CLIP 동일 검증 세트 정확도 비교'],['sighting-report-form.png','목격 제보 작성 화면'],['adoption-list.png','입양 게시글 목록'],['shelter-filter.png','보호소 동물 검색 필터'],['system-architecture.png','서비스 전체 시스템 구조']]},
{slug:'journal-mate',title:'Journal Mate',category:'Chrome 확장 · AI',summary:'웹페이지와 여러 논문 PDF를 요약·번역하고 비교하는 멀티에이전트 Chrome Side Panel 확장 프로그램',period:'1개월',role:'3인 팀 · 멀티에이전트 구조·워크플로·웹/PDF 추출',tags:['JavaScript','Manifest V3','OpenAI API','PDF.js','Streaming'],logo:'logo-clean.png',cover:'screens/url.png',metrics:[['생성 · 검증 분리','Summarizer–Verifier 원문 대조 및 피드백 흐름'],['복수 PDF 비교','문서별 요약 후 공통점·차이점 비교']],
sections:[
['Overview','프로젝트 소개',['웹페이지와 논문 PDF 본문을 추출해 요약·번역하고 여러 문서를 비교하는 Chrome 확장 프로그램입니다. 생성·검증 역할을 분리해 원문과 대조하고 필요하면 수정·재생성하는 흐름을 설계했습니다.']],
['Role','담당 역할',['3인 팀 중 멀티에이전트 구조 기획, Summarizer/Verifier 워크플로 설계·구현, 웹 본문·PDF 텍스트 추출을 담당했습니다.','Side Panel의 요약 길이 선택·결과 표시·스트리밍 응답 흐름을 구현했습니다.']],
['Problem & Solution','문제와 해결',['요약의 누락·의미 왜곡 가능성 → Summarizer가 요약·번역을 생성하고 Verifier가 원문과 비교해 의미 보존·사실성·논리적 일관성을 점검합니다. 검증 의견을 Summarizer로 반환해 재요약·재번역하는 피드백 루프를 구현했습니다. 검증 성공률·환각 감소율은 측정하지 않았습니다.','다중 PDF 비교 → PDF.js로 페이지별 텍스트를 추출하고 문서별 요약을 결합해 공통점·차이점을 비교합니다. Side Panel에서 PDF 추가·요약·비교 결과를 확인할 수 있습니다.']],
['Implementation','주요 기능',['현재 웹페이지 요약·번역, PDF 업로드·본문 추출.','복수 PDF 개별 요약·문서 비교, 짧게·보통·길게 요약 분량 선택.','스트리밍 응답 및 Summarizer/Verifier 검증·피드백·재생성.']],
['Architecture','시스템 구조',['Chrome Side Panel UI → Chrome Scripting API(웹 본문) / PDF.js(PDF 추출) → Background Service Worker → OpenAI API 스트리밍 → Summarizer / Verifier → Side Panel 결과','생성 → 원문 대조 → 검증 의견 → 수정·재생성의 피드백 흐름을 사용합니다.']],
['Tech Stack','기술 구성',['Extension: JavaScript, Manifest V3, Chrome Side Panel, Chrome Scripting API','AI & Document: OpenAI API, Multi-Agent, PDF.js, Streaming']],
['Results','결과와 검증 범위',['Chrome 환경에서 웹·PDF 추출, 요약·번역·복수 PDF 비교를 통합했습니다.','생성과 검증 역할 분리 및 원문 대조 피드백을 구현했으며 측정하지 않은 품질 수치는 제시하지 않습니다.']],
['Awards','관련 수상',['한국정보기술학회 2025 추계종합학술대회 대학생 논문경진대회 우수논문상 동상 · 2025.11.28']],
['Next Steps','다음 개선 방향',['요약 문장별 원문 근거 위치 연결, 논문 분야별 평가 데이터 구성 및 실행 비용·지연 관리를 계획합니다.']],
['Links','관련 자료',['아래 제공된 화면·구조도·상장을 확인할 수 있습니다. 별도 소스 코드·시연 URL은 제공되지 않았습니다.']]],
media:[['screens/url.png','웹페이지 요약·번역 모드'],['screens/pdf-one.png','PDF 추가 및 추출 화면'],['screens/pdf-two.png','복수 PDF 비교 화면'],['screens/extension-structure.png','Chrome 확장 프로그램 구성'],['screens/system-architecture-1.png','시스템 처리 구조도 1'],['screens/system-architecture-2.png','시스템 처리 구조도 2'],['agent-workflow.svg','생성·검증 에이전트 피드백 흐름']]}
].map(p=>({...p,image:path=>root+p.slug+'/'+path}));
export const experiences=[
{title:'SAIFE X 채팅 서비스 기능 개발',summary:'외부 상용 AI 모델을 선택하는 별도 채팅 기능',tags:['React','Chainlit','REST API'],steps:[['담당 기능','모델 선택 UI, 5단계 추론 수준 설정과 모델별 값 반영, 사용자별 API Key 등록·변경·삭제 및 미등록 안내를 구현했습니다. 모델별 요청 대상 전환, 좌측 목록·모델사 아이콘·검색/카드·전송 버튼 개선과 기존 Web-research 모듈 호출을 연결했습니다.'],['문제','모델 선택 후 “Select”만 표시되고 대화가 이어지지 않았습니다.'],['원인','구버전 {items, initial} 설정 형식과 새 Picker 기대 형식이 달랐고, 구 설정창 경로가 남아 중복 렌더링됐습니다.'],['조치','서버 선택 데이터·프런트 처리·초기값·렌더 경로를 비교해 선택 정보 정규화, 초기값 fallback, 기본 Select 노출 경로 정리를 적용했습니다.'],['검증','모델 선택과 채팅 설정이 정상적으로 이어지는 것을 확인했습니다. 회사 전체 도입이나 사용 규모·성능 개선 수치는 확인되지 않았습니다.']],flowDescription:'사용자가 모델을 선택하면 허용된 중계 경로를 통해 외부 모델에 요청하고 응답을 받습니다. 내부 주소와 실제 설정은 공개하지 않습니다.'},
{title:'오프라인 LLM 배포 및 모델 연동 검증',summary:'폐쇄망 Qwen3 배포와 내부 LLM API 연동·추론 환경 점검',tags:['Python','YAML','Docker','Kubernetes','REST API','vLLM','SGLang'],steps:[['배포 문제','폐쇄망 GPU 서버에서 vLLM 기반 Qwen3 모델을 배포하던 중 초기 설정 오류로 모델이 기동되지 않았습니다.'],['원인·조치','로그·YAML·공식 문서를 대조해 실행 파라미터 이름과 단위 불일치를 확인하고 설정을 보완했습니다.'],['배포 검증','Qwen3 모델의 정상 기동과 추론 요청 가능 여부를 확인했습니다.'],['모델 연동','내부 LLM 2~3종의 API 요청·응답 형식과 모델 선택별 API 전환 로직을 시험했습니다.'],['추론 환경 분석','vLLM/SGLang 로그·설정을 확인하고 SGLang 텐서 병렬 초기화, 인식되지 않는 실행 인자, 메모리 문제를 분석했습니다.'],['검증 범위','Qwen3 기동·추론 요청을 확인했으며, SGLang 관련 오류는 분석·검증한 범위로 기록합니다. 모든 오류의 해결 여부는 확인되지 않았습니다.']],flowDescription:'Qwen3 배포 설정을 보완하고 기동·추론을 확인한 뒤, 내부 모델 API 연동과 추론 서버의 실행 로그·설정을 점검했습니다.'}
];
export const education=[
{title:'금오공과대학교',org:'컴퓨터공학 전공 · 학사',date:'2021.03–2027.02',status:'졸업 예정',summary:'컴퓨터공학 전공 · 팀 프로젝트와 기업 연계 개발 경험',details:['소프트웨어와 데이터베이스 관련 전공 지식을 바탕으로 팀 프로젝트·기업연계 개발 경험을 쌓았습니다.']},
{title:'AX·DX 실전 설계 아카데미',org:'한국지능정보사회진흥원(NIA) · K-ICT 빅데이터센터',date:'2026.03–04',status:'10시간',summary:'AI 도입을 위한 업무 정의 · 데이터 준비 · 결과 검증 관점 학습',details:['기초 온라인 과정에서 DX와 AX의 차이, AI 서비스 구성, 생성형 AI 신뢰성·운영 고려사항을 학습했습니다.','업무와 목표: 해결할 업무·성과 판단 기준 정의.','서비스 구성: 모델·데이터·화면·검증 절차·운영 기록의 필요성.','답변 신뢰성: 생성형 AI 오답 가능성과 외부 근거 보완 개념.','안전한 활용: 개인정보·접근권한·사람의 확인·안정성·비용. 학습 내용이며 실제 RAG 구축 성과를 의미하지 않습니다.']},
{title:'WebKit 640 기업연계 SW 아카데미',org:'포항테크노파크 | 풀스택 개발자 양성',date:'2025.01–05',status:'640시간',summary:'기업연계 풀스택 개발 · Catch Me 팀 프로젝트',details:['HTML5·JavaScript·React 웹 프런트엔드.','Java·Spring Boot REST API, MyBatis, SQL·MySQL·MariaDB.','React Native 모바일 개발 및 유라클 Morpheus 하이브리드 앱 연동.','요구사항·명세·WBS 기반 팀 프로젝트 진행.'],project:'catch-me'}
];
export const certifications=[['정보처리기사','한국산업인력공단','2026.06'],['SQLD(SQL 개발자)','한국데이터산업진흥원','2025.06'],['한국사능력검정시험 1급','국사편찬위원회','2025.10.31']];
export const awards=[
['2026.02.04','DX·AX 기반 역량 강화 프로젝트 장려상','국립금오공과대학교 교수학습혁신센터','luno','awards/dx-ax-encouragement.png','보이스피싱 위험 분석 모바일 앱 팀 프로젝트'],
['2025.11.28','한국정보기술학회 우수논문상 동상','2025 추계종합학술대회 대학생 논문경진대회','catch-me','awards/kiit-2025-bronze.png','실종 반려동물 정보 연계와 이미지 분류 개선 논문'],
['2025.11.28','한국정보기술학회 우수논문상 동상','2025 추계종합학술대회 대학생 논문경진대회','journal-mate','awards/kiit-2025-bronze.png','웹페이지·논문 PDF 요약 및 비교 확장 프로그램 논문'],
['2025.06.04','경북 네트워크형 캠퍼스 SW아카데미 장려상','풀스택 개발자 양성과정','catch-me','awards/sw-academy-encouragement.png','실종·목격 제보와 입양 정보를 연결한 플랫폼 팀 프로젝트'],
['2025.05.22','WebKit640 6기 팀 프로젝트 경연 최우수상','국립금오공과대학교 SW전문인재양성사업단','catch-me','awards/webkit-best.png','유라클 Morpheus 기반 기업연계 하이브리드 앱 팀 프로젝트']
];
