import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Table() {
  return (
    <mesh position={[0, -0.45, 0]}>
      <boxGeometry args={[5, 0.25, 3]} />
      <meshStandardMaterial color="#d8bfd8" />
    </mesh>
  );
}

function Cake({ onClick }) {
  return (
    <group position={[0, 0, 0]} onClick={onClick}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 0.55, 64]} />
        <meshStandardMaterial color="#f8c8dc" />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.62, 0.7, 0.18, 64]} />
        <meshStandardMaterial color="#fff1f5" />
      </mesh>

      <mesh position={[-0.18, 0.75, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
        <meshStandardMaterial color="#ff8a65" />
      </mesh>

      <mesh position={[0.18, 0.75, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
        <meshStandardMaterial color="#ff8a65" />
      </mesh>
    </group>
  );
}

function PhotoFrame({ position, onClick }) {
  return (
    <group position={position} rotation={[0, 0.25, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[0.9, 0.65, 0.08]} />
        <meshStandardMaterial color="#f2c6a0" />
      </mesh>

      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.68, 0.45, 0.03]} />
        <meshStandardMaterial color="#fffaf0" />
      </mesh>
    </group>
  );
}

function Letter({ position, onClick }) {
  return (
    <group position={position} rotation={[-0.25, 0, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[0.9, 0.06, 0.65]} />
        <meshStandardMaterial color="#fff7e6" />
      </mesh>
    </group>
  );
}

function SceneContent({ onSelectMemory }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={2} />

      <Table />

      <Cake
        onClick={() =>
          onSelectMemory({
            title: "Anniversary Cake",
            content: "우리의 기념일을 축하해. 앞으로도 오래오래 함께하자.",
          })
        }
      />

      <PhotoFrame
        position={[-1.55, 0.15, 0.2]}
        onClick={() =>
          onSelectMemory({
            title: "첫 번째 추억",
            content: "여기에 첫 만남이나 첫 데이트 사진 이야기를 넣으면 좋아.",
          })
        }
      />

      <PhotoFrame
        position={[1.55, 0.15, 0.2]}
        onClick={() =>
          onSelectMemory({
            title: "두 번째 추억",
            content: "함께 웃었던 날, 여행 갔던 날, 특별했던 순간을 적어보자.",
          })
        }
      />

      <Letter
        position={[0.95, -0.25, 0.85]}
        onClick={() =>
          onSelectMemory({
            title: "편지",
            content: "Dear. 너에게 하고 싶었던 말을 여기에 담을 거야.",
          })
        }
      />

      <Text
        position={[0, 1.45, -1.2]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
      >
        Our Memory Table
      </Text>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />
    </>
  );
}

function Scene3D({ onSelectMemory }) {
  const isMobile = window.innerWidth <= 768;

  return (
    <section className="scene-wrapper">
      <Canvas
        camera={{
          position: isMobile ? [0, 2.8, 5.8] : [0, 2.4, 4.5],
          fov: isMobile ? 52 : 45,
        }}
      >
        <SceneContent onSelectMemory={onSelectMemory} />
      </Canvas>
    </section>
  );
}

export default Scene3D;