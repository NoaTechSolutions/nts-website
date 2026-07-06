import { ResizableNavbarDemo } from "./resizable-navbar-demo";
import { FooterSection } from "./sections/footer-section";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="page-shell">
      <ResizableNavbarDemo />
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "8rem",
          paddingInline: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-amber)",
          }}
        >
          Próximamente
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500,
            color: "var(--color-navy)",
            textAlign: "center",
            margin: 0,
          }}
        >
          {title}
        </h1>
      </section>
      <FooterSection />
    </main>
  );
}
