// "use client";

// import { useState } from "react";

// export default function Chatbot() {
//   const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
//   const [question, setQuestion] = useState("");

//   async function ask() {
//     const res = await fetch("/api/ask", {
//       method: "POST",
//       body: JSON.stringify({ question }),
//     });

//     const data = await res.json();

//     setMessages((m) => [
//       ...m,
//       { role: "user", text: question },
//       { role: "assistant", text: data.answer },
//     ]);

//     setQuestion("");
//   }

//   return (
//     <div className="border p-4 rounded-lg max-w-lg mx-auto bg-white">
//       <h2 className="font-bold text-xl mb-3">Chat with my Resume</h2>

//       <div className="h-64 overflow-y-auto border p-2 mb-3 rounded">
//         {messages.map((m, i) => (
//           <p key={i} className={m.role === "user" ? "text-blue-600" : "text-green-700"}>
//             <b>{m.role}:</b> {m.text}
//           </p>
//         ))}
//       </div>

//       <input
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         className="border p-2 w-full"
//         placeholder="Ask something about my resume..."
//       />

//       <button onClick={ask} className="mt-2 bg-black text-white p-2 rounded w-full">
//         Ask
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [question, setQuestion] = useState("");

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function ask() {
    if (!question.trim()) return;

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: data.answer },
    ]);

    setQuestion("");
  }

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col p-4 bg-gradient-to-br from-gray-900 to-black text-white">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 backdrop-blur-lg bg-white/5 p-3 rounded-2xl shadow-lg">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
          D
        </div>
        <div>
          <h2 className="font-bold text-xl">David AI Assistant</h2>
          <p className="text-sm text-gray-400">Ask anything about my resume</p>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-2xl ${
              m.role === "user"
                ? "self-end bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "self-start bg-white/10 border border-white/20 text-gray-200 backdrop-blur-lg"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex gap-2 flex-wrap sm:flex-nowrap">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask something about my resume..."
          className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        />

        <button
          onClick={ask}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:opacity-90 transition 
                     w-full sm:w-auto"
        >
          Send
        </button>

      </div>

    </div>
  );
}
