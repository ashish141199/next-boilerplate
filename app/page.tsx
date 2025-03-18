export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Click Tracker Demo</h1>
      <p className="text-lg mb-6">Click on any element to send its class to the parent window</p>
      
      <div className="flex flex-col gap-4">
        <button className="primary-button bg-blue-500 text-white px-4 py-2 rounded">
          Primary Button
        </button>
        <button className="secondary-button bg-gray-500 text-white px-4 py-2 rounded">
          Secondary Button
        </button>
        <div className="test-container p-4 border border-gray-300 rounded">
          <p className="test-text">Test Container Content</p>
        </div>
      </div>
    </main>
  )
}
