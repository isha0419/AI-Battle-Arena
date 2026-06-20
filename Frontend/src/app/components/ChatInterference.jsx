import React, { useState, useRef, useEffect } from "react";
import UserMessage from "./UserMessage";
import ArenaResponse from "./ArenaResponse";
import axios from "axios";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/invoke",
        {
          input: inputValue,
        }
      );

      const data = response.data;

      const newMessage = {
        id: Date.now(),
        problem: inputValue,
        ...data.result,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[180px]" />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-widest">
            <span className="text-blue-400">AI</span>
            <span className="text-white"> BATTLE </span>
            <span className="text-violet-400">ARENA</span>
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 overflow-y-auto max-w-7xl mx-auto px-4 md:px-8 py-10 pb-40">
        {messages.length === 0 ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-zinc-300 text-sm">
                  Multi Model AI Evaluation Platform
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none">
                ⚔️ AI
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  SHOWDOWN
                </span>
              </h1>

              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Ask any coding question and watch multiple AI models compete.
                An independent AI judge evaluates the responses and declares a
                winner.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl w-full mt-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-semibold mb-2">Multiple Models</h3>
                <p className="text-sm text-zinc-400">
                  Compare answers from different AI systems side-by-side.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="text-3xl mb-3">⚔️</div>
                <h3 className="font-semibold mb-2">Battle Arena</h3>
                <p className="text-sm text-zinc-400">
                  Responses compete in a head-to-head showdown.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold mb-2">AI Judge</h3>
                <p className="text-sm text-zinc-400">
                  Automatic scoring and reasoning for every battle.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <UserMessage message={msg.problem} />

                <ArenaResponse
                  solution1={msg.solution_1}
                  solution2={msg.solution_2}
                  judge={msg.judge}
                />
              </div>
            ))}
          </>
        )}

        {loading && (
          <div className="my-10">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center">
              <div className="flex gap-3 mb-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-4 h-4 bg-violet-500 rounded-full animate-bounce delay-100" />
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-200" />
              </div>

              <h3 className="font-semibold text-lg">
                AI Models Are Battling...
              </h3>

              <p className="text-zinc-400 mt-2 text-sm">
                Generating responses and preparing judge evaluation.
              </p>
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </main>

      {/* Floating Input */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-t from-black via-black/95 to-transparent pt-10 pb-8 px-4">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question and watch AI models battle..."
                className="
                  w-full
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-full
                  py-5
                  pl-8
                  pr-20
                  text-lg
                  text-white
                  placeholder-zinc-500
                  focus:outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/20
                  shadow-[0_0_40px_rgba(59,130,246,0.15)]
                  transition-all
                "
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-14
                  h-14
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-violet-600
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  shadow-[0_0_25px_rgba(99,102,241,.5)]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-3">
              Compare multiple AI models • Evaluate answers • Discover the best
              solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}