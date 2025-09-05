import { HypeWaitlistComponent } from "@/components/hype-waitlist"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex items-center justify-between p-6 flex-col">
        <div className="text-xl font-semibold">Hype</div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">The future is now</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>

          <HypeWaitlistComponent />
        </div>
      </div>
    </main>
  )
}
