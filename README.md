# 한민규 포트폴리오

현장실습 · 프로젝트 · 교육사항 · 자격증 · 수상내역으로 구성한 반응형 정적 웹사이트입니다. 별도 패키지 설치나 API 키가 필요하지 않습니다. 실제 이력이 제공되지 않은 항목은 업데이트 예정으로 표시합니다.

## 로컬 실행

저장소 폴더에서 `python3 -m http.server 8000 --bind 0.0.0.0`을 실행합니다.

## 내용 수정

`index.html`에서 각 섹션의 이력을 수정하고, `style.css`에서 디자인을 변경합니다. 날짜, 기관명, 역할, 결과 등 실제 정보를 입력하세요.

## GitHub Pages 배포

1. 저장소를 공개(Public)로 두면 GitHub Free에서 Pages를 사용할 수 있습니다.
2. GitHub 저장소 Settings → Pages → Build and deployment → Source에서 **GitHub Actions**를 선택합니다.
3. 파일을 `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 배포합니다. 설정 후에는 Actions에서 워크플로를 수동 실행할 수도 있습니다.
4. 성공한 실행의 `github-pages` 배포 주소로 접속합니다. 기본 주소는 `https://hanmingyu02.github.io/HanMinGyuPortfolio/`입니다. 배포가 성공하기 전에는 이 주소가 작동하지 않을 수 있습니다.

사이트에 올리는 이력과 정보는 누구나 열람할 수 있으므로 공개할 정보만 입력하세요.
