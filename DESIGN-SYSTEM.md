# 원생매칭 랜딩 페이지 — 디자인 시스템

> 이 문서는 원생매칭 랜딩 페이지의 토큰·컴포넌트·패턴을 정리한 참조 문서입니다.
> 새 섹션을 추가하거나 기존 영역을 디벨롭할 때 **이미 정의된 토큰·컴포넌트만 재사용**하기 위한 가이드입니다.
> 본 페이지는 메인 서비스(`.claude/design-system/`)와 별개의 시각 정체성을 사용합니다.

## 0. 산출물 (현재 상태)

| 파일 | 역할 |
|---|---|
| `원생매칭 랜딩.html` | **원본** — 후기 영역이 빈 아코디언 플레이스홀더 상태로 보존 |
| `원생매칭 랜딩 v2.html` | **현재 작업 버전** — 후기 영역에 핸드폰 자동 롤링 스크롤 적용 |
| `DESIGN-SYSTEM.md` | (이 문서) 디자인 시스템 참조 |
| `CONTENT.md` | 섹션별 카피·메트릭 인벤토리 |
| `message img/` | 후기 카카오톡 캡처 70장 (3개 대화 시리즈) |

---

## 1. 토큰

### 1.1 컬러 (`:root` CSS 변수)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#EEF3FC` | 기본 배경 (body) |
| `--bg-deep` | `#E1EAF8` | 한 단계 진한 섹션 배경 (`#about`, `#reviews`), 칩/태그 배경 |
| `--ink` | `#15243F` | 본문·제목 기본 텍스트 |
| `--ink-2` | `#5C6A85` | 보조 텍스트, 설명문 |
| `--accent` | `#2E7DF6` | 라벨·번호·아이콘 강조 |
| `--accent-deep` | `#1C5FD6` | 강조 텍스트·인터랙션 hover 색 |
| `--accent-2` | `#21C8E4` | 그라데이션 보조 색 (시안) |
| `--paper` | `#FFFFFF` | 카드 표면 |
| `--line` | `rgba(46,125,246,0.16)` | 구분선·테두리 |
| `--dark` | `#142844` | 풋터·툴팁 배경 |
| `--grad` | `linear-gradient(135deg,#3D8BFF 0%,#2BA6F0 52%,#34D2DE 100%)` | 주요 그라데이션 (버튼·아이콘·텍스트 클립) |
| `--grad-soft` | `linear-gradient(135deg,#4D97FF,#33C2EE)` | 보조 그라데이션 (지도 영역 등) |
| `--grad-pink` | `linear-gradient(135deg,#21C8E4,#3D8BFF)` | **이름과 무관**하게 시안→블루 (히어로 `.it`, contact `.em`) |
| `--shadow` | `0 18px 44px -16px rgba(28,70,150,0.30)` | 카드 hover·강조 그림자 |
| `--shadow-sm` | `0 8px 22px -10px rgba(28,70,150,0.24)` | 카드 기본 그림자 |

**규칙**: 위에 없는 색을 새로 도입하지 말 것. 새 강조가 필요하면 `--accent-deep` + `rgba(46,125,246,.07~.22)` 톤 변형을 우선 사용.

### 1.2 타이포

| 토큰 | 패밀리 | 용도 |
|---|---|---|
| `--serif` | `'IBM Plex Sans KR'` | 제목 (`.sec-title`, `.proj-main h3`, `.pull`, `.panel-title`) — 이름은 serif지만 실제는 sans |
| `--display` | `'Space Grotesk', 'IBM Plex Sans KR'` | 숫자·연도·번호 등 수치성 텍스트 (`.sec-num`, `.proj-no`, `.stat .num`, `.reason-no`, `.live-time`) |
| `--sans` | `'IBM Plex Sans KR'` | 본문 (body 기본) |

**폰트 웨이트**: 400 / 500 / 600 / 700 만 사용. 300은 도입하지 말 것.

**스케일 (실측)**:

| 역할 | 크기 | 라인하이트 |
|---|---|---|
| Hero h1 | `clamp(1.9rem, 4.2vw, 3.5rem)` | 1.24 |
| Section title | `clamp(2rem, 4vw, 3rem)` | 1.22 |
| Card h3 (`.proj-main h3`) | `clamp(1.35rem, 2.3vw, 1.85rem)` | 1.32 |
| `.panel-title` | 20px | 1.5 |
| `.pull` (인용) | 23px | 1.55 |
| Hero lead | 19px | 1.55 |
| Body large | 16~16.5px | 1.75~1.9 |
| Body | 14~15px | 1.7~1.85 |
| Caption | 12~13px | 1.6 |
| Eyebrow / 라벨 (대문자 트래킹) | 10.5~12px, letter-spacing `.1em~.2em`, uppercase | 1 |

### 1.3 간격·라운딩

**Section padding**: `130px 0` (데스크탑), 880px 이하 `96px 0`.
**Wrap**: `max-width: 1180px; padding: 0 40px;` — 모든 섹션의 컨테이너는 `.wrap`.

**Border-radius 스케일**:
- `999px` — 칩·태그·버튼(.btn, .submit-btn)·번호 원형 배지
- `24px` — 대형 패널 (`.live-panel`, `.contact-form`)
- `20px` — 표준 카드 (`.proj`, `.stat`)
- `18px` — 중형 카드 (`.isum`, `.reason`, `.reg`, `.region-hint`)
- `16px` — `.step`
- `14px` — 인라인 노트 (`.panel-note`)
- `12px` — 폼 인풋
- `10px` — 툴팁 (`.map-tip`)

**Gap 스케일**: `8 / 12 / 16 / 18 / 22 / 30 / 40 / 62 / 70px` 사이에서 선택. `.sec-head` 다음 콘텐츠까지는 `margin-bottom: 62px`.

---

## 2. 컴포넌트

### 2.1 섹션 헤더 `.sec-head`
```html
<div class="sec-head reveal">
  <span class="sec-num">03</span>
  <div>
    <div class="sec-label">Reviews — 실제 후기</div>
    <h2 class="sec-title">두 줄로<br>쓰는 제목</h2>
  </div>
</div>
```
- `sec-num`: 두 자리 (`01`~`05`). 섹션 순서 — inquiry(없음)/about(`01`)/projects(`02`)/reviews(`03`)/contact(`04`).
- `sec-label`: 영문 — 한글 하이픈 패턴 ("Reviews — 실제 후기").
- `sec-title`: 1~2줄, `<br>` 명시 줄바꿈.

### 2.2 카드 표면 (공통)
```css
background: var(--paper);
border-radius: 20px;
box-shadow: var(--shadow-sm);
transition: box-shadow .4s ease, transform .4s ease;
/* hover */ transform: translateY(-3~-6px); box-shadow: var(--shadow);
```
`#reviews`는 `--bg-deep` 위에 올라가므로, 카드는 반드시 `--paper`로 띄워서 대비를 만들어야 함.

### 2.3 아코디언 드릴다운 `.proj` / `.projects-list`
현재 `#reviews`가 재활용 중인 패턴. 헤더 grid `64px / 1fr / 26px`, plus→minus 토글, `max-height` 트랜지션. 후기를 카테고리(원장/학부모)로 묶을 때 그대로 사용 가능.

### 2.4 통계 카드 `.stat` (4-col grid `.stats`)
`<div class="num">2,481</div><div class="cap">설명</div>` — 숫자는 그라데이션 텍스트 클립. 후기 섹션의 "총 후기 수 / 평점 / 재계약률" 같은 요약 지표에 재사용 가능.

### 2.5 이유 카드 `.reason` (with `.highlight` 변형)
원형 그라데이션 번호 + 태그 + 본문. `.reason.highlight`는 카드 자체가 그라데이션 배경 (강조 1개). 후기 카드 풀버전의 후보 패턴.

### 2.6 작은 정보 카드 `.isum`
`background: paper; border-radius: 18px; padding: 22px 28px; min-width: 180px;`. `display:flex; gap:18px; flex-wrap:wrap`로 배치. 가벼운 요약 메트릭에 적합.

### 2.7 라이브 피드 `.live-panel`
반투명 화이트 + blur, 행마다 `.live-av` 원형 그라데이션 아바타. 후기 카드의 사용자 아바타·이름·시간 패턴 그대로 참고 가능.

### 2.8 칩·태그
- `.tag` — 카테고리 태그 (대문자, 트래킹). `font-size:10.5px`, `bg: --bg-deep`, `color: --accent-deep`.
- `.city-chip` — 부드러운 액션 칩. `bg: rgba(46,125,246,.09)`, `color: --accent-deep`.
- `.flow-tag`, `.reason-tag` — 같은 톤의 변형.

### 2.9 버튼
- `.btn.btn-solid` — 그라데이션 + 큰 그림자, hover 시 `translateY(-3px)`.
- `.btn.btn-ghost` — `--paper` 배경, hover 시 색이 `--accent-deep`.
- 모두 `border-radius: 999px; padding: 16px 32px; font-size: 14px;`.

### 2.10 패널 노트 `.panel-note`
인용·인사이트 박스. `background: rgba(46,125,246,.07); border: 1px solid var(--line); border-radius: 14px; padding: 16px 20px;` — **후기 인용문 박스**의 가장 강력한 후보.

### 2.11 인용 강조 `.pull`
좌측 4px 그라데이션 바 + 23px serif 본문. 큰 한 줄 인용에 적합.

---

## 3. 패턴

### 3.1 섹션 등장 애니메이션 `.reveal` → `.reveal.in`
모든 새 콘텐츠 블록에 `class="reveal"`을 붙이면 스크롤 진입 시 `opacity 0 → 1, translateY(34px) → 0`이 0.9s에 걸쳐 재생됨. 별도 JS 작성 불필요 — 페이지 하단의 IntersectionObserver가 자동 처리(확인 필요).

### 3.2 배경 톤 알터네이션
- `body` = `--bg` (라이트)
- `#about`, `#reviews` = `--bg-deep` (살짝 진하게)
- `#contact` = 다크 그라데이션
이미 후기 섹션은 `--bg-deep`이므로 위에 올리는 카드는 `--paper` 또는 `rgba(255,255,255,.62) + backdrop-filter` 둘 중 하나.

### 3.3 수치는 그라데이션 텍스트
숫자(평점·후기 수·기간)는 `.stat .num` / `.isum .v` 패턴을 그대로 차용해 그라데이션 텍스트 클립으로 표시.

### 3.4 아바타
- 이니셜형: `.live-av` (40×40, 원형, 그라데이션 배경, 흰 글씨, `--serif` 700 15px).
- 더 큰 후기 카드용으로 확대해 쓰려면 `48~56px`까지가 안전 (이상은 디자인 충돌).

---

## 4. 후기 영역 (Reviews) — v2 구현 사양

> **결정 사유**: 아코디언은 "클릭해서 더 보기" 의미인데, 핸드폰 자동 스크롤 자체가 핵심 social proof라 항상 노출되어야 함.
> 따라서 핸드폰 목업은 아코디언 **밖**으로 빼서 항상 노출(featured)하고, 데이터가 아직 없는 학부모님 후기만 아코디언 placeholder로 둠.

### 4.1 최종 구조

```
[Section header — sec-num 03 · "직접 경험한 이야기들"]

[.review-featured  ← 항상 노출 / 2-col grid (1fr · 300px) / gap 64px]
   좌측 (.review-text):
     • .review-live  ← 빨간 펄스 점 + "LIVE · 실시간 카톡"
     • .review-eyebrow  ← 작은 pill 태그 "원장님 후기"
     • h3  ← "포장하지 않은,<br><span class='em'>그날의 대화</span>"
     • .review-lead  ← 본문 2줄
     • .review-note  ← 호버 안내 박스
   우측 (.phone-mock):
     • 300×620 / 그라데이션 보더 / 스피커 인디케이터 / 글로스 하이라이트
     • .phone-screen (overflow hidden, 상하 페이드 오버레이)
     • .phone-track (이미지 2벌 stacked, translateY 0 → -50% linear infinite)

[.projects-list  ← 아코디언 1개만]
   ▸ 학부모님 후기 (플레이스홀더 — 데이터 모이면 교체)
```

### 4.2 신규 컴포넌트 (v2에서 추가)

#### 4.2.1 `.review-featured` — 2-컬럼 그리드 컨테이너
- `display: grid; grid-template-columns: 1fr 300px; gap: 64px; align-items: center;`
- `margin-bottom: 72px;` (아래 아코디언과 분리)
- `class="reveal"` 함께 사용 → 자동 페이드 인.

#### 4.2.2 `.review-text` (좌측 컬럼)
- 자식 요소를 위→아래로 자연 배치, 별도 grid 없음.
- 자식 구성: `.review-live` → `.review-eyebrow` → `h3` → `.review-lead` → `.review-note`.

#### 4.2.3 `.review-live` — LIVE 인디케이터
- 작은 빨간 점(`#FF4D7E`) + 펄스링 + "LIVE · 실시간 카톡" 텍스트.
- 펄스링 애니메이션은 기존 `.live-dot` 패턴(`@keyframes livePulse`)을 재사용.
- 색·트래킹: `--accent-deep`, `letter-spacing:.08em`, uppercase, 11.5px, 700.

#### 4.2.4 `.review-eyebrow` — 작은 pill 태그
- `padding: 7px 14px; border-radius: 999px; background: rgba(46,125,246,.1); color: var(--accent-deep);`
- `font-size: 11px; letter-spacing: .16em; text-transform: uppercase; font-weight: 700;`
- 기존 `.tag`보다 약간 크고 강조도 높음 — featured 영역 전용.

#### 4.2.5 `.review-text h3`
- `font-family: var(--serif); font-weight: 700;`
- `font-size: clamp(1.5rem, 2.4vw, 2rem); line-height: 1.32;`
- 자식 `.em`은 `var(--grad)`로 텍스트 클립 (브랜드 그라데이션).

#### 4.2.6 `.review-lead`
- 본문 톤. `font-size: 15.5px; line-height: 1.85; color: var(--ink-2); max-width: 48ch;`

#### 4.2.7 `.review-note` — 호버 안내 박스
- `.panel-note`의 컴팩트 버전. `padding: 14px 18px; border-radius: 14px; background: rgba(46,125,246,.07); border: 1px solid var(--line);`
- `font-size: 13px;` (작게), `max-width: 46ch`.

#### 4.2.8 `.review-stats` + `.review-stat` (CSS만 존재 / 현재 미사용)
- 통계 카드 변형 (.stat 보다 작음, `padding: 16px 20px; border-radius: 16px; min-width: 120px;`).
- 현재 초안에서는 사용 안 함. 추후 "협업 학원 / 누적 메시지" 같은 수치 강조가 필요해지면 활성화.

#### 4.2.9 `.phone-mock` — 핸드폰 외곽 프레임
| 항목 | 값 |
|---|---|
| 너비 × 높이 | `300px × 620px` (justify-self: end) |
| Border-radius (외곽) | `46px` |
| Padding | `9px` (이 padding이 그라데이션 보더의 시각적 두께) |
| 배경 | `var(--grad)` (3-stop 브랜드 그라데이션) |
| 그림자 | `0 30px 60px -20px rgba(28,70,150,.45), 0 12px 28px -12px rgba(28,70,150,.3)` (이중 그림자) |
| `::before` (스피커) | `54px × 5px`, `top:18px`, `background: rgba(255,255,255,.45)`, 라운드 999px |
| `::after` (글로스) | `inset:0` 풀커버, `160deg` 화이트→투명 그라데이션, `mix-blend-mode: overlay` |

#### 4.2.10 `.phone-screen` — 화면 영역
- `width:100%; height:100%; border-radius:37px; overflow:hidden; background:#EEF1F5;`
- `::before` / `::after` 의사요소로 상하 34px 페이드 오버레이 (화면 배경색 → 투명).
- 페이드 색상은 스크린 배경 `#EEF1F5`와 매칭 → 메시지가 자연스럽게 사라지고 나타남.

#### 4.2.11 `.phone-track` — 스크롤되는 이미지 컨테이너
- `display: flex; flex-direction: column;` (이미지 세로 stack)
- `animation: phoneScroll var(--scroll-duration, 120s) linear infinite;`
- `animation-play-state: paused;` (기본 정지)
- `.phone-mock.ready` 클래스가 붙으면 `running`, hover 시 다시 `paused`.

### 4.3 롤링 스크롤 메커니즘 (핵심)

기존 ping-pong(아래로 갔다 위로 되돌아옴) 방식이 부자연스러워, **무한 롤링** 방식으로 전환.

**원리**:
1. JS에서 이미지 리스트(70장)를 **2벌** 주입 → `.phone-track`에 stacked.
2. 애니메이션: `translateY(0)` → `translateY(-50%)` linear infinite.
3. `-50%` 도달 시점 = 2벌 중 첫 번째 set이 완전히 위로 빠지고 두 번째 set이 화면을 차지한 상태.
4. 100% → 0%로 리셋되는 순간, 두 번째 set이 다시 첫 번째 set의 위치로 돌아가는데 **두 set이 동일하므로 시각적 점프 없음**.

**키프레임 (CSS)**:
```css
@keyframes phoneScroll {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
```

**타이밍 규칙 (JS measure())**:
- single set 높이를 기준으로 `duration = singleSetH / 115` 초.
- 클램프: 최소 90초, 최대 360초.
- ~115 px/s 속도 = "읽으려면 호버해야 하는" skim 속도.

**Pause-on-hover**: `.phone-mock.ready:hover .phone-track { animation-play-state: paused; }`

**`.ready` 클래스 부여 시점**:
- 70 × 2 = 140장 모두 load 완료 → `start()` → `.ready` 추가.
- 8초 safety timeout → 일부 실패해도 시작.

**금지**:
- iPhone 노치·다이나믹 아일랜드 표현 → 미니멀 톤 충돌.
- 가로 스크롤 → 세로만.
- 페이드 색이 화면 배경(#EEF1F5)과 다르게 설정 → 페이드 경계가 보임.

### 4.4 이미지 자산

| 항목 | 값 |
|---|---|
| 폴더 | `message img/` (HTML 같은 위치) |
| 파일 패턴 | `KakaoTalk_20260526_XXXXXXXXX.png` (첫 장) / `..._NN.png` (NN = 01~) |
| 시리즈 1 | `KakaoTalk_20260526_104809704` — 29장 (허쉬잉글리쉬/광주) |
| 시리즈 2 | `KakaoTalk_20260526_104856837` — 30장 (인클래스학원) |
| 시리즈 3 | `KakaoTalk_20260526_104858910` — 11장 (쌤스라이프) |
| 비율 | ~9:16 세로형 |
| 총 장수 | 70장 (각 시리즈 첫 장은 카톡방 헤더 포함 → 시리즈 전환이 자연스럽게 표현됨) |

**경로 인코딩**: JS에서 `encodeURIComponent('message img')`로 처리 → `message%20img/` 사용. 폴더명 변경 시 JS의 `conversations` 배열과 `base` 변수 동기화 필요.

**개인정보**: 모자이크/가명 처리 완료. 신규 캡처 추가 시 반드시 동일 처리.

### 4.5 학부모님 후기 (현재 placeholder)
- `.projects-list` 안에 `.proj` 1개만 두어 기존 아코디언 컴포넌트 그대로 재사용.
- 본문: "CLIPEDU를 통해 매칭한 학부모님들의 실제 소통 자료가 이곳에 담길 예정입니다…"
- 실 데이터 확보 시 교체 경로:
  - **옵션 A**: 학부모님 후기도 별도 핸드폰 1대로 만들고 위 featured에 핸드폰 2대 나란히 배치.
  - **옵션 B**: 짧은 후기 카드(별점 + 인용 + 작성자) 그리드를 아코디언 안에 채움.
  - **옵션 C**: featured 아래에 새로운 형식(인스타·블로그 카드 등)으로 노출.

### 4.6 카피 톤
- LIVE 인디케이터·짧은 라벨 → 해요체.
- 헤드라인·인용·결정 → 합니다체 또는 명사형 종결 ("그날의 대화").
- 메시지 캡처 안의 원문은 절대 편집 금지 — 원장님 화법 그대로가 신뢰의 핵심.

### 4.7 디벨롭 시 주의
- **핸드폰 추가 (다중)**: `.review-featured`의 grid를 `1fr 300px 300px`로 확장 가능. 단 1180 wrap 안에 3대 들어가면 좌측 텍스트가 좁아짐 (~280px) → 텍스트를 위로 빼고 핸드폰을 가로로 3대 배치하는 새 레이아웃 권장.
- **수치 강조**: `.review-stats` / `.review-stat`가 이미 CSS에 있으므로 `.review-text` 안에 활용 가능. 실 데이터 없으면 추가하지 말 것 (가짜 수치 금지).
- **스피드 조절**: JS `singleSetH / 115`의 분모 조정. 90 = 빠름, 150 = 느림.
- **속도 갑작스런 변화 회피**: `linear` 타이밍 함수 유지. cubic-bezier 쓰면 -50%↔0 jump 직전/직후 속도 차이로 끊김 보임.
- **이미지 수 변경**: `conversations` 배열의 `count`만 수정. SETS=2는 그대로 유지 (롤링 원리상 필수).

---

## 5. 파일 & 라인 참조 (v2 기준)

### 5.1 v2 HTML 섹션 위치
| 섹션 | HTML 시작 (라인) |
|---|---|
| `<header id="hdr">` | 961 |
| HERO (`<section class="hero">`) | 970 |
| INQUIRY (`<section id="inquiry">`) | 985 |
| ABOUT (`<section id="about">`) | 1405 |
| PROJECTS (`<section id="projects">`) | 1460 |
| **REVIEWS** (`<section id="reviews">`) | 1667 |
|   └ `.review-featured` | 1678 |
|   └ `.phone-mock#phoneMock` | 1692 |
|   └ 학부모 아코디언 `.projects-list` | 1702 |
| CONTACT (`<section id="contact">`) | 1726 |
| `<footer>` | 1785 |
| `<script>` (메인) | 1799 |

### 5.2 v2 CSS 블록 위치 (모두 `<style>` 안)
| 블록 | 시작 (라인) |
|---|---|
| `:root` (토큰) | 11 |
| NAV | 55 |
| HERO | 103 |
| SECTION SHELL | 171 |
| ABOUT | 189 |
| PROJECTS (drill-down) | 226 |
| INQUIRY MAP | 456 |
| CONTACT | 590 |
| LIVE APPLICANTS | 661 |
| **REVIEWS** (`.review-featured`, `.phone-mock` 외) | 705 |
| FOOTER | 814 |
| REVEAL | 829 |
| RESPONSIVE | 849 |
| INTRO (히어로 진입 인트로) | 879 |

### 5.3 핵심 v2 JS 위치
| 기능 | 위치 |
|---|---|
| nav scroll state | ~1801 |
| `.reveal` IntersectionObserver | ~1806 |
| `.projects-list` 아코디언 | ~1812 |
| **review phone 이미지 주입 + 측정** | ~1843 |
| inquiry map + region detail | ~1900 |

---

## 6. 디벨롭 메모 (다음 단계 후보)

후기 영역의 다음 디벨롭 시 고려할 수 있는 방향:

1. **헤드라인 강조 강화** — h3 위에 사이즈 더 큰 인용문 한 줄("감사합니다 원장님") 추가.
2. **다중 핸드폰** — 3대 나란히 배치 + 각각 다른 속도 (parallax 느낌).
3. **학원 라벨 플로팅** — 핸드폰 위에 현재 보여지는 대화방의 학원명 작은 라벨로 노출 (JS로 스크롤 위치 추적).
4. **인용 카드 띠** — featured 아래에 짧은 인용(2~3줄) 카드 3~4개 가로 마키 — 키워드만 빠르게 보여줌.
5. **학부모님 후기 활성화** — 4.5의 옵션 중 하나로 데이터 확보 후 교체.

위 후보를 적용할 때마다 본 문서의 **§4.1 구조 다이어그램**과 **§5 라인 참조**를 갱신할 것.
