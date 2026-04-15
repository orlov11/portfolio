export default function NotFound() {
  return (
    <html>
      <body style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold", margin: 0 }}>404</h1>
          <p style={{ color: "#666", marginTop: "1rem" }}>Page not found</p>
          <a href="/" style={{ marginTop: "1.5rem", display: "inline-block", color: "#0070f3" }}>
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
