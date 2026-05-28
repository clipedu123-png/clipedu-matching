# 🎓 CLIPEDU 원생매칭 랜딩 페이지

학부모와 학원을 데이터로 매칭하는 CLIPEDU 원생매칭 플랫폼의 공식 랜딩 페이지입니다.

---

## 📋 프로젝트 개요

- **서비스명**: CLIPEDU 원생매칭 플랫폼
- **목적**: 학원의 원생 유입 및 학부모 매칭
- **URL**: `원생매칭 랜딩 v3.html`
- **배포**: GitHub + Supabase

---

## ✨ 주요 기능

### 1️⃣ 반응형 디자인
- **데스크톱**: 1280px 기준 (멀티컬럼 레이아웃)
- **태블릿**: 768px ~ 1024px (단일 컬럼)
- **모바일**: 360px ~ 767px (최적화된 모바일 UI)

### 2️⃣ GNB Scroll Spy
- 데스크톱에서 스크롤할 때 현재 섹션에 해당하는 GNB 메뉴 자동 강조
- 파란색 텍스트 + 밑줄 표시
- 부드러운 전환 애니메이션 (0.2s)

### 3️⃣ 모바일 네비게이션
- 햄버거 메뉴 (우측 슬라이드 사이드바)
- 메뉴 링크 클릭 시 해당 섹션으로 부드러운 스크롤 이동
- 자동 메뉴 닫기

### 4️⃣ 신청 폼 + Supabase DB
- 학원 정보 입력 (학원명, 전화번호, 주소)
- 관심항목 다중선택 (원생 매칭 운영, 비용 안내, 기타 문의)
- 추가 메시지 입력 (선택사항)
- 제출 시 Supabase DB에 자동 저장

---

## 🛠 기술 스택

| 분야 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **반응형** | CSS Media Queries (Mobile-first) |
| **폰트** | Pretendard Variable (Inter 대체) |
| **Backend** | Supabase (PostgreSQL) |
| **API** | Supabase REST API |
| **배포** | GitHub |
| **버전 관리** | Git |

---

## 🔧 Supabase 설정 정보

### 프로젝트 정보
```
Organization: clipedu-matching
Project Name: clipedu123-png's Project
Project URL: https://hmngogjpyyuzgioepfbq.supabase.co
Region: Asia-Pacific
```

### 데이터베이스 테이블: `inquiries`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | UUID | 고유 ID (자동 생성) |
| `academy` | text | 학원명 |
| `phone` | text | 전화번호 |
| `address` | text | 학원 주소 |
| `interests` | text[] | 관심항목 배열 |
| `message` | text | 추가 메시지 (선택사항) |
| `created_at` | timestamp | 신청 시간 (자동) |
| `updated_at` | timestamp | 수정 시간 (자동) |

### 관심항목 코드
- `match` → 원생 매칭 운영
- `price` → 비용 안내
- `etc` → 기타 문의

### Row Level Security (RLS)
- Public Insert: 누구나 신청 폼 제출 가능
- Public Select: 대시보드에서 데이터 조회 가능

---

## 📂 프로젝트 구조

```
원생 매칭 랜딩 페이지/
├── 원생매칭 랜딩 v3.html    # 메인 파일 (HTML + CSS + JS)
├── assets/                  # 리소스 폴더
│   ├── clipedu-logo.png     # 로고
│   └── favicon.png          # 파비콘
├── message img/             # 참고 이미지 (구 버전)
├── README.md               # 이 파일
└── [기타 참고 파일들]
```

---

## 🚀 사용 방법

### 로컬에서 확인
1. `원생매칭 랜딩 v3.html` 파일을 브라우저에서 열기
2. 또는 로컬 웹 서버에서 실행 (CORS 이슈 방지)

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

### 신청 폼 테스트
1. 페이지 하단 "Apply" 섹션으로 스크롤
2. 신청 폼 작성:
   - 학원명 입력
   - 전화번호 입력
   - 주소 입력
   - 관심항목 선택
   - (선택) 메시지 입력
3. "원생 매칭 신청하기" 버튼 클릭
4. Supabase 대시보드에서 데이터 확인

### 데이터 확인
1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. `clipedu-matching` 프로젝트 선택
3. **Table Editor** → `inquiries` 테이블 확인

---

## 🎨 반응형 브레이크포인트

```css
@media (max-width: 1024px) {
  /* 태블릿 & 모바일 (햄버거 메뉴 활성화) */
}

@media (max-width: 640px) {
  /* 모바일 (텍스트 재정렬, 폰트 축소) */
}

@media (max-width: 420px) {
  /* 소형 모바일 (최적화) */
}

@media (max-width: 375px) {
  /* iPhone SE 이하 (단일 라인 텍스트) */
}
```

---

## 📊 Supabase 무료 버전 한계

| 항목 | 용량 |
|------|-----|
| 저장 공간 | 500 MB |
| 월 대역폭 | 2 GB |
| 동시 연결 | 10개 |
| 백업 보관 | 7일 |

**현재 상태**: 월 신청건수 10,000건 이상 예상 시 Pro 버전 업그레이드 추천

---

## 🔐 보안 설정

### Supabase RLS (Row Level Security)
- **Public Insert**: 폼 제출 누구나 가능 (Bot 방지 필요시 추가 개발 필요)
- **Public Select**: 데이터 조회 가능

### 주의사항
- Anon Key는 클라이언트 사이드에서 노출됨 (의도된 설계)
- 민감한 데이터는 별도 관리 필요
- 향후 Bot 방지(reCAPTCHA) 추가 추천

---

## 📝 주요 수정 사항

### v3 (최신)
- ✅ GNB Scroll Spy 구현
- ✅ 모바일 햄버거 메뉴 개선
- ✅ Supabase DB 연동
- ✅ 반응형 디자인 완성
- ✅ "시연 요청" 항목 제거

### 이전 버전
- v2, v1 (아카이브됨)

---

## 👥 팀 연락처

**개발 팀**: CLIPEDU 개발팀  
**Email**: clipedu123@gmail.com  
**GitHub**: https://github.com/clipedu123-png/clipedu-matching

---

## 📅 마지막 업데이트

- **날짜**: 2026-05-28
- **커밋**: `aeb7abc` - Add Supabase database configuration
- **상태**: ✅ 배포 준비 완료

---

## 🎯 다음 단계 (향후 개발)

- [ ] Bot 방지 기능 (reCAPTCHA)
- [ ] 이메일 알림 기능
- [ ] 관리자 대시보드
- [ ] 분석 페이지 (Google Analytics 연동)
- [ ] A/B 테스트 기능

---

**Made with ❤️ by CLIPEDU**
