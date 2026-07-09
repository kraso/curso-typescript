import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Curso de TypeScript — Aprende desde cero";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #1e1b4b 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Code background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            fontSize: "14px",
            color: "#3B82F6",
            fontFamily: "monospace",
            lineHeight: "1.6",
          }}
        >
          <span>interface User {"{"}</span>
          <span>  name: string;</span>
          <span>  age: number;</span>
          <span>  email: string;</span>
          <span>{"}"}</span>
          <span></span>
          <span>function greet(user: User): string {"{"}</span>
          <span>  return `Hola, $&#123;user.name&#125;!`;</span>
          <span>{"}"}</span>
          <span></span>
          <span>const app = new App();</span>
          <span>let count = 0;</span>
          <span>if (config) {"{"}</span>
          <span>  return</span>
          <span>{"}"}</span>
          <span>else {"{"}</span>
          <span>  return</span>
          <span>{"}"}</span>
          <span></span>
          <span>const result = await fetchData();</span>
          <span>type Props = {"{"} id: number {"}"};</span>
          <span>import {'{'} useState {'}'} from &apos;react&apos;;</span>
          <span>export default function App() {'{'}</span>
          <span>  const [state, setState] = useState(0);</span>
          <span>  return &lt;div&gt;Hello&lt;/div&gt;;</span>
          <span>{"}"}</span>
        </div>

        {/* Glowing orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.15)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(6, 182, 212, 0.1)",
            filter: "blur(100px)",
          }}
        />

        {/* Border corners */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            width: "40px",
            height: "40px",
            borderTop: "3px solid #3B82F6",
            borderLeft: "3px solid #3B82F6",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            width: "40px",
            height: "40px",
            borderTop: "3px solid #3B82F6",
            borderRight: "3px solid #3B82F6",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "30px",
            width: "40px",
            height: "40px",
            borderBottom: "3px solid #3B82F6",
            borderLeft: "3px solid #3B82F6",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            width: "40px",
            height: "40px",
            borderBottom: "3px solid #3B82F6",
            borderRight: "3px solid #3B82F6",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            TS
          </div>
          <span
            style={{
              color: "#e2e8f0",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Curso TypeScript
          </span>
        </div>

        {/* Traffic light dots */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            zIndex: 10,
          }}
        >
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} />
        </div>

        {/* Divider line */}
        <div
          style={{
            width: "120px",
            height: "3px",
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            borderRadius: "2px",
            marginBottom: "24px",
            zIndex: 10,
          }}
        />

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "white",
              margin: 0,
              lineHeight: 1,
              textAlign: "center",
              letterSpacing: "-2px",
            }}
          >
            TypeScript
          </h1>
          <h2
            style={{
              fontSize: "64px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #3B82F6, #06B6D4, #3B82F6)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            domina el tipado
          </h2>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            marginTop: "28px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            zIndex: 10,
          }}
        >
          Aprende TypeScript de forma interactiva con ejercicios practicos y un editor en el navegador
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
