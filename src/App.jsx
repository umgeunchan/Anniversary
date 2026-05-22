import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import Intro from "./components/Intro.jsx";
import Scene3D from "./components/Scene3D.jsx";
import MemoryModal from "./components/MemoryModal.jsx";
import "./index.css";

function App() {
  const [step, setStep] = useState("start");
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <main className="app">
      {step === "start" && (
        <StartScreen onStart={() => setStep("intro")} />
      )}

      {step === "intro" && (
        <Intro onComplete={() => setStep("scene")} />
      )}

      {step === "scene" && (
        <>
          <Scene3D onSelectMemory={setSelectedMemory} />
          <div className="hint">테이블 위의 추억들을 클릭해봐</div>
        </>
      )}

      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </main>
  );
}

export default App;