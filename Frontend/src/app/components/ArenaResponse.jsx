import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function ArenaResponse({
  solution1,
  solution2,
  judge,
}) {
  useEffect(() => {
    hljs.highlightAll();
  }, [solution1, solution2]);

  const winner =
    judge &&
    (judge.solution_1_score > judge.solution_2_score
      ? "Solution 1"
      : judge.solution_2_score > judge.solution_1_score
      ? "Solution 2"
      : "Tie");

  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className="text-3xl font-bold mt-6 mb-4 text-white"
        {...props}
      />
    ),

    h2: ({ node, ...props }) => (
      <h2
        className="text-2xl font-bold mt-5 mb-3 text-white"
        {...props}
      />
    ),

    h3: ({ node, ...props }) => (
      <h3
        className="text-xl font-semibold mt-4 mb-2 text-white"
        {...props}
      />
    ),

    p: ({ node, ...props }) => (
      <p
        className="mb-4 leading-8 text-zinc-300"
        {...props}
      />
    ),

    ul: ({ node, ...props }) => (
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-zinc-300"
        {...props}
      />
    ),

    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal pl-6 mb-4 space-y-2 text-zinc-300"
        {...props}
      />
    ),

    a: ({ node, ...props }) => (
      <a
        className="text-cyan-400 underline hover:text-cyan-300"
        {...props}
      />
    ),

    code: ({
      node,
      inline,
      className,
      children,
      ...props
    }) => {
      return !inline ? (
        <div className="rounded-2xl overflow-hidden my-5 border border-white/10">
          <pre className="bg-zinc-950 p-5 overflow-x-auto text-sm">
            <code
              className={className}
              {...props}
            >
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code
          className="bg-zinc-800 px-2 py-1 rounded-md text-sm text-cyan-300"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div className="w-full mt-8 space-y-10">

      {/* Battle Arena Header */}

      <div className="flex items-center justify-center">
        <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span className="text-sm uppercase tracking-[0.25em] text-zinc-400">
            ⚔️ AI Battle Commencing
          </span>
        </div>
      </div>

      {/* Battle Layout */}

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">

        {/* Solution 1 */}

        <div
          className="
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-xl
            border
            border-blue-500/20
            rounded-3xl
            p-8
            hover:border-blue-500/40
            transition-all
            duration-300
            hover:shadow-[0_0_40px_rgba(59,130,246,.2)]
          "
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-blue-500" />

          <div className="flex items-center gap-4 mb-8">
            <div
              className="
                h-12 w-12
                rounded-full
                bg-blue-500/20
                border border-blue-500
                flex items-center justify-center
                text-xl
              "
            >
              🤖
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Contestant A
              </p>

              <h3 className="text-xl font-bold text-white">
                Solution 1
              </h3>
            </div>
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {solution1}
          </ReactMarkdown>
        </div>

        {/* VS Badge */}

        <div className="hidden lg:flex justify-center pt-24">
          <div
            className="
              w-24 h-24
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-violet-500
              flex
              items-center
              justify-center
              text-3xl
              font-black
              text-white
              shadow-[0_0_40px_rgba(99,102,241,.6)]
            "
          >
            VS
          </div>
        </div>

        {/* Solution 2 */}

        <div
          className="
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-xl
            border
            border-violet-500/20
            rounded-3xl
            p-8
            hover:border-violet-500/40
            transition-all
            duration-300
            hover:shadow-[0_0_40px_rgba(139,92,246,.2)]
          "
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-violet-500" />

          <div className="flex items-center gap-4 mb-8">
            <div
              className="
                h-12 w-12
                rounded-full
                bg-violet-500/20
                border border-violet-500
                flex items-center justify-center
                text-xl
              "
            >
              🧠
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Contestant B
              </p>

              <h3 className="text-xl font-bold text-white">
                Solution 2
              </h3>
            </div>
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {solution2}
          </ReactMarkdown>
        </div>
      </div>

      {/* Judge Section */}

      {judge && (
        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
          "
        >
          {/* Winner */}

          <div
            className="
              mb-8
              rounded-2xl
              p-5
              text-center
              font-black
              text-2xl
              bg-gradient-to-r
              from-yellow-400
              via-yellow-300
              to-orange-500
              text-black
            "
          >
            🏆 WINNER : {winner}
          </div>

          <h2 className="text-2xl font-bold text-white mb-8">
            ⚖️ Battle Results
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Solution 1 */}

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="font-medium text-zinc-300">
                  Solution 1
                </span>

                <span className="font-bold text-blue-400 text-xl">
                  {judge.solution_1_score}/10
                </span>
              </div>

              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="
                    h-full
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${judge.solution_1_score * 10}%`,
                  }}
                />
              </div>

              <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                <p className="text-zinc-400 leading-7">
                  {judge.solution_1_reasoning}
                </p>
              </div>
            </div>

            {/* Solution 2 */}

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="font-medium text-zinc-300">
                  Solution 2
                </span>

                <span className="font-bold text-violet-400 text-xl">
                  {judge.solution_2_score}/10
                </span>
              </div>

              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="
                    h-full
                    bg-gradient-to-r
                    from-violet-500
                    to-pink-500
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${judge.solution_2_score * 10}%`,
                  }}
                />
              </div>

              <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                <p className="text-zinc-400 leading-7">
                  {judge.solution_2_reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}