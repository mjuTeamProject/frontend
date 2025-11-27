"use client";

import { useRouter } from "next/navigation";

export default function ScorePage() {
  const router = useRouter();

  const score = 35;

  const getLevel = (s) => {
    if (s >= 80) return "환상 궁합";
    if (s >= 60) return "좋은 궁합";
    if (s >= 40) return "보통 궁합";
    return "주의가 필요한 궁합";
  };

  const getKeywords = (s) => {
    if (s >= 80) return "설렘 · 케미 · 성숙";
    if (s >= 60) return "신뢰 · 편안함";
    if (s >= 40) return "노력 · 이해";
    return "대화 · 조율 필요";
  };

  const getDateIdea = (s) => {
    if (s >= 80) return "감성 카페 · 드라이브";
    if (s >= 60) return "맛집 탐방 · 영화";
    if (s >= 40) return "산책 · 브런치 카페";
    return "차 한잔하며 대화하기";
  };

  const getTheme = (s) => {
    if (s >= 80) {
      return {
        pageBg:
          "radial-gradient(1200px 800px at 10% -10%, #3b1d6e 0%, transparent 60%), radial-gradient(1200px 800px at 110% 10%, #0a5bd7 0%, transparent 55%), linear-gradient(180deg, #080015 0%, #05010f 45%, #0a0228 100%)",
        glow1: "rgba(255, 120, 196, 0.28)",
        glow2: "rgba(125, 249, 255, 0.22)",
        ring:
          "conic-gradient(#7df9ff 0deg, #a281ff 140deg, #ff78c4 260deg, rgba(255,255,255,0.08) 360deg)",
        ringShadow: "0 0 40px rgba(162,129,255,0.45)",
        badgeBg: "linear-gradient(90deg, #ff78c4, #a281ff)",
        badgeText: "#0b0616",
      };
    }
    if (s >= 60) {
      return {
        pageBg:
          "radial-gradient(1200px 800px at 10% -10%, #123a6f 0%, transparent 60%), radial-gradient(1200px 800px at 110% 10%, #0f766e 0%, transparent 55%), linear-gradient(180deg, #040913 0%, #040913 45%, #071a1f 100%)",
        glow1: "rgba(56, 189, 248, 0.22)",
        glow2: "rgba(52, 211, 153, 0.20)",
        ring:
          "conic-gradient(#38bdf8 0deg, #22c55e 170deg, #a3e635 290deg, rgba(255,255,255,0.08) 360deg)",
        ringShadow: "0 0 40px rgba(34,197,94,0.35)",
        badgeBg: "linear-gradient(90deg, #38bdf8, #22c55e)",
        badgeText: "#04130f",
      };
    }
    if (s >= 40) {
      return {
        pageBg:
          "radial-gradient(1200px 800px at 10% -10%, #5a2e0b 0%, transparent 60%), radial-gradient(1200px 800px at 110% 10%, #7c3aed 0%, transparent 55%), linear-gradient(180deg, #0a0703 0%, #0a0703 45%, #160b24 100%)",
        glow1: "rgba(245, 158, 11, 0.23)",
        glow2: "rgba(167, 139, 250, 0.20)",
        ring:
          "conic-gradient(#f59e0b 0deg, #fbbf24 150deg, #a78bfa 280deg, rgba(255,255,255,0.08) 360deg)",
        ringShadow: "0 0 40px rgba(245,158,11,0.35)",
        badgeBg: "linear-gradient(90deg, #f59e0b, #a78bfa)",
        badgeText: "#160a00",
      };
    }
    return {
      pageBg:
        "radial-gradient(1200px 800px at 10% -10%, #4a0a0a 0%, transparent 60%), radial-gradient(1200px 800px at 110% 10%, #111827 0%, transparent 55%), linear-gradient(180deg, #050505 0%, #050505 45%, #140808 100%)",
      glow1: "rgba(239, 68, 68, 0.25)",
      glow2: "rgba(148, 163, 184, 0.18)",
      ring:
        "conic-gradient(#ef4444 0deg, #f97316 160deg, #94a3b8 300deg, rgba(255,255,255,0.08) 360deg)",
      ringShadow: "0 0 40px rgba(239,68,68,0.35)",
      badgeBg: "linear-gradient(90deg, #ef4444, #f97316)",
      badgeText: "#120101",
    };
  };

  const level = getLevel(score);
  const keywords = getKeywords(score);
  const dateIdea = getDateIdea(score);
  const theme = getTheme(score);

  const styles = {
    page: {
      minHeight: "100vh",
      background: theme.pageBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    },
    glow1: {
      position: "absolute",
      width: 420,
      height: 420,
      borderRadius: "50%",
      background: theme.glow1,
      filter: "blur(120px)",
      top: -80,
      left: -80,
      zIndex: 0,
    },
    glow2: {
      position: "absolute",
      width: 520,
      height: 520,
      borderRadius: "50%",
      background: theme.glow2,
      filter: "blur(140px)",
      bottom: -120,
      right: -120,
      zIndex: 0,
    },
    card: {
      width: "100%",
      maxWidth: 440,
      background: "rgba(10, 8, 20, 0.75)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "22px 20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      backdropFilter: "blur(6px)",
      zIndex: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
    },
    title: {
      fontSize: "1.4rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    badge: {
      fontSize: "0.9rem",
      padding: "6px 10px",
      borderRadius: 999,
      background: theme.badgeBg,
      color: theme.badgeText,
      fontWeight: 900,
    },
    scoreSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14,
    },
    ring: {
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: theme.ring,
      display: "grid",
      placeItems: "center",
      boxShadow: theme.ringShadow,
      transition: "all 0.2s ease",
    },
    ringInner: {
      width: 160,
      height: 160,
      borderRadius: "50%",
      background: "radial-gradient(circle at 30% 20%, #15122b, #0a0717 70%)",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: 6,
    },
    score: {
      fontSize: "4.2rem",
      fontWeight: 900,
      lineHeight: 1,
      marginTop: 6,
    },
    scoreUnit: {
      fontSize: "1.6rem",
      fontWeight: 700,
      opacity: 0.9,
    },
    comment: {
      fontSize: "1.15rem",
      fontWeight: 600,
      textAlign: "center",
      marginTop: 4,
    },
    subInfo: {
      width: "100%",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14,
      padding: "12px 12px",
      display: "grid",
      gap: 8,
      marginTop: 6,
    },
    subItem: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.95rem",
    },
    subLabel: { opacity: 0.7 },
    subValue: { fontWeight: 700 },
    btnGroup: {
      display: "grid",
      gap: 10,
      marginTop: 18,
    },
    button: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "none",
      background:
        score >= 80
          ? "linear-gradient(90deg, #7df9ff, #a281ff)"
          : score >= 60
          ? "linear-gradient(90deg, #38bdf8, #22c55e)"
          : score >= 40
          ? "linear-gradient(90deg, #f59e0b, #a78bfa)"
          : "linear-gradient(90deg, #ef4444, #f97316)",
      color: "#05010f",
      fontWeight: 900,
      fontSize: "1.05rem",
      cursor: "pointer",
      transition: "transform 0.12s ease, opacity 0.12s ease",
    },
    buttonAlt: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background:
        score >= 80
          ? "linear-gradient(90deg, rgba(255,120,196,0.9), rgba(162,129,255,0.9))"
          : score >= 60
          ? "linear-gradient(90deg, rgba(34,197,94,0.9), rgba(56,189,248,0.9))"
          : score >= 40
          ? "linear-gradient(90deg, rgba(167,139,250,0.9), rgba(245,158,11,0.9))"
          : "linear-gradient(90deg, rgba(249,115,22,0.9), rgba(239,68,68,0.9))",
      color: "#0b0616",
      fontWeight: 900,
      fontSize: "1.05rem",
      cursor: "pointer",
      transition: "transform 0.12s ease, opacity 0.12s ease",
    },
    buttonGhost: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.5)",
      background: "transparent",
      color: "#fff",
      fontWeight: 800,
      fontSize: "1.05rem",
      cursor: "pointer",
      transition: "transform 0.12s ease, opacity 0.12s ease",
    },
    footer: {
      marginTop: 14,
      fontSize: "0.85rem",
      opacity: 0.6,
      textAlign: "center",
    },
  };

  const hoverUp = (e) => (e.currentTarget.style.transform = "translateY(-2px)");
  const hoverDown = (e) => (e.currentTarget.style.transform = "translateY(0px)");

  return (
    <div style={styles.page}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <main style={styles.card}>
        <header style={styles.header}>
          <div style={styles.title}>궁합 점수</div>
          <div style={styles.badge}>{level}</div>
        </header>

        <section style={styles.scoreSection}>
          <div style={styles.ring}>
            <div style={styles.ringInner}>
              <div style={styles.score}>{score}</div>
              <div style={styles.scoreUnit}>점</div>
            </div>
          </div>

          <div style={styles.comment}>두 사람의 궁합을 분석한 결과예요!</div>

          <div style={styles.subInfo}>
            <div style={styles.subItem}>
              <span style={styles.subLabel}>오늘의 키워드</span>
              <span style={styles.subValue}>{keywords}</span>
            </div>
            <div style={styles.subItem}>
              <span style={styles.subLabel}>추천 데이트</span>
              <span style={styles.subValue}>{dateIdea}</span>
            </div>
          </div>
        </section>

        <section style={styles.btnGroup}>
          <button
            style={styles.button}
            onMouseEnter={hoverUp}
            onMouseLeave={hoverDown}
            onClick={() => router.push("/")}
          >
            다시 계산하기
          </button>

          <button
            style={styles.buttonAlt}
            onMouseEnter={hoverUp}
            onMouseLeave={hoverDown}
            onClick={() => router.push("/ranking")}
          >
            랭킹 보드로 이동
          </button>

          <button
            style={styles.buttonGhost}
            onMouseEnter={hoverUp}
            onMouseLeave={hoverDown}
            onClick={() => alert("SNS 공유 기능은 준비 중입니다!")}
          >
            SNS 공유하기
          </button>
        </section>

        <footer style={styles.footer}>
          점수는 두 사람의 생년월일 기반 알고리즘으로 계산됩니다.
        </footer>
      </main>
    </div>
  );
}
