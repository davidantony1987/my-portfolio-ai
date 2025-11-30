import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-black via-slate-900 to-blue-900 text-white">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight">
          David Antony — Portfolio
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Full Stack Developer | Next.js | FastAPI | AI & RAG Systems | Angular | Python | Spring Boot
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-3">About Me</h2>
        <p className="text-gray-200 leading-relaxed">
          I build modern, scalable applications using Next.js, FastAPI, Angular, Python, Spring Boot and AI-powered
          workflows (LLM, RAG, LangChain, MCP) and cloud platforms.  
        </p>
      </section>

      {/* Chatbot */}
      <section className="mt-16">
        <Chatbot />
      </section>
    </div>
  );
}
