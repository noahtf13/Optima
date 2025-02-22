export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4">
      <div className="text-center text-white space-y-6">
        <h1 className="text-6xl font-bold">Optima</h1>
        <p className="text-xl font-light">Group decisions, made simple.</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto text-sm">
          <p>A lightweight tool for groups to efficiently reach consensus using 
             margin-sensitive Elo rankings.</p>
        </div>
        <div className="flex gap-2 justify-center text-xs">
          <span className="bg-white/20 rounded-full px-3 py-1">No login</span>
          <span className="bg-white/20 rounded-full px-3 py-1">Private</span>
          <span className="bg-white/20 rounded-full px-3 py-1">Fast</span>
        </div>
      </div>
    </div>
  );
}
