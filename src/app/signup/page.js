"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myBirth, setMyBirth] = useState("");
  const [partnerBirth, setPartnerBirth] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !myBirth || !partnerBirth) {
      setError("모든 항목을 입력해줘!");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 해!");
      return;
    }

    setError("");
    alert("회원가입 완료! (임시)");
    router.push("/score");
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        <h1 style={styles.title}>회원가입</h1>

        <form onSubmit={handleSignup} style={styles.form}>
          <label style={styles.label}>
            이메일
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="example@email.com"
            />
          </label>

          <label style={styles.label}>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="6자 이상"
            />
          </label>

          <label style={styles.label}>
            내 생일
            <input
              type="date"
              value={myBirth}
              onChange={(e) => setMyBirth(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            상대 생일
            <input
              type="date"
              value={partnerBirth}
              onChange={(e) => setPartnerBirth(e.target.value)}
              style={styles.input}
            />
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>
            회원가입 완료
          </button>

          <button type="button" onClick={handleGoBack} style={styles.buttonGhost}>
            뒤로가기
          </button>
        </form>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 800px at 10% -10%, #2b1055 0%, transparent 60%), radial-gradient(1200px 800px at 110% 10%, #0f4c75 0%, transparent 55%), linear-gradient(180deg, #05010f 0%, #05010f 40%, #070318 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    color: "#fff",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    background: "rgba(10, 8, 20, 0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "22px 20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 16,
  },
  form: {
    display: "grid",
    gap: 12,
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none",
  },
  error: {
    fontSize: "0.9rem",
    color: "#ffb4b4",
    background: "rgba(255, 0, 0, 0.1)",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid rgba(255, 180, 180, 0.3)",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #7df9ff, #a281ff)",
    color: "#05010f",
    fontWeight: 900,
    fontSize: "1.05rem",
    cursor: "pointer",
    marginTop: 4,
  },
  buttonGhost: {
    width: "100%",
    padding: "14px 0",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.6)",
    background: "transparent",
    color: "#fff",
    fontWeight: 800,
    fontSize: "1.05rem",
    cursor: "pointer",
  },
};
