import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <main className="max-w-full mx-auto p-4 ">
        <PipelineToolbar />
        <div className="mt-6 rounded-xl border overflow-hidden">
          <PipelineUI />
        </div>
      </main>
    </div>
  );
}

export default App;
