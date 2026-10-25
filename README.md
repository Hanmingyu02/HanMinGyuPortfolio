# 개발자 포트폴리오

현장실습 → 프로젝트 → 교육사항 → 자격증 → 수상내역으로 구성한 한국어 포트폴리오입니다. 기존 HTML/CSS 구조를 유지하고 Node.js 정적 빌드로 메인·프로젝트 상세 3개·404 페이지를 생성합니다. 브라우저 프레임워크, 외부 API, 백엔드, 키가 필요하지 않습니다.

## 실행·검증

Node.js 22 이상이 필요합니다. CI는 Node.js 24를 사용합니다.

```sh
npm ci
npm run build
npm run lint
npm test
npm run dev
```

`npm run dev`는 빌드 후 `dist`를 8000 포트에서 제공합니다. 루트 요청은 GitHub Pages와 동일한 `/HanMinGyuPortfolio/` 하위 경로로 이동합니다. 루트 경로 배포 시 `src/data/portfolio.mjs`의 `site.base`를 빈 문자열로, `site.url`을 실제 도메인으로 변경합니다.

## 수정 위치

- `src/data/portfolio.mjs`: 프로젝트·실습·학력/교육·자격증·수상, 선택적 인적 정보, 사이트 URL.
- `scripts/build.mjs`: 정적 HTML, 재사용 카드·갤러리·상세 레이아웃, SEO 생성.
- `src/app.js`: 모바일 메뉴, 현재 섹션, 이미지 상태·라이트박스·포커스 복원.
- `style.css`: 반응형 레이아웃, 포커스와 모션 감소 설정.
- `scripts/check.mjs`: 콘텐츠 수, 앵커, 상세 섹션, 이미지 대체 텍스트, 내부 파일 링크 검사.

`dist`는 생성물이므로 직접 수정하지 않습니다. 데이터 수정 후 빌드를 다시 실행하세요. 문서의 실제 콘텐츠를 구조화했으며 미제공 이름·연락처·소스 저장소·스토어·영상 링크는 만들지 않았습니다.

## GitHub Pages

저장소 Settings → Pages → Source를 **GitHub Actions**로 설정합니다. `main` 푸시 또는 수동 워크플로 실행 시 의존성 설치·문법 검사·빌드·콘텐츠 검증 후 `dist`를 배포합니다. 무료 GitHub Free 사용 시 공개 저장소가 필요합니다.

배포 주소: `https://hanmingyu02.github.io/HanMinGyuPortfolio/`
상세 주소: `/HanMinGyuPortfolio/projects/luno/`, `/projects/catch-me/`, `/projects/journal-mate/` (모두 사이트 하위 경로).

## 확인이 필요한 자료

- LUNO Google Play 상세 URL 및 제공할 경우 프로젝트별 소스/시연 URL.
- 선택 사항: 공개 이름·이메일·GitHub 링크.
- 자격증 취득월은 제공된 2026.06 / 2025.06을 반영했습니다. 공개 전 증명서와 대조하세요.
- 제공된 `wonderfulrosemari.github.io` 이미지 URL을 그대로 사용합니다. 현재 클라우드에서는 해당 도메인 접근이 403으로 차단되어 원본 내용·가용성은 확인하지 못했습니다. 실패 시 화면에 안내하며 확대창에서도 원본 접근 실패를 표시합니다.

성과 수치에는 내부 평가·검증 세트·로컬 부하 조건을 함께 표기합니다. 운영 성능으로 일반화하지 않습니다. 실습 관련 실제 내부 화면·주소·키·비공개 코드·인프라 구성은 포함하지 않습니다.

## 디자인과 브라우저 호환성

밝은 회색 배경·흰색 카드와 검정색 본문으로 대비를 높였습니다. 장식 그래픽 없이 본문 중심으로 정리하고, 프로젝트 3개는 같은 크기의 카드와 240px 썸네일 영역을 사용합니다. 긴 모바일 스크린샷은 비율을 유지하며 영역 안에 맞춥니다. CSS Grid·clamp()·text-wrap을 사용하고 prefers-reduced-motion을 준수합니다. 이미지 확대는 네이티브 dialog를 사용합니다.
