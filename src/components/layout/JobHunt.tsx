export function JobHunt() {
  return (
    <>
      <div className="hidden w-full rounded-lg bg-white/5 p-4 text-center text-white backdrop-blur-sm md:mt-8 md:block">
        <h3 className="text-lg font-bold">🚀 Looking for Opportunities!</h3>
        <p className="mt-2 text-sm text-white/90">
          I'm a Software Developer actively seeking new roles.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <a
            href="https://joshtuddenham.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-green-600/80 px-3 py-1 text-xs font-semibold transition duration-200 hover:bg-green-500"
          >
            Portfolio
          </a>
          <a
            href="https://linkedin.com/in/joshuatuddenham"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-green-600/80 px-3 py-1 text-xs font-semibold transition duration-200 hover:bg-green-500"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
