import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

/* -----------------------------
  기본 테이블
----------------------------- */
function Table() {
  return (
    <group position={[0, -0.55, 0]}>
      {/* 테이블 상판 */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.45, 2.6, 0.22, 96]} />
        <meshStandardMaterial
          color="#c89f7a"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* 테이블보 */}
      <mesh position={[0, 0.14, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.3, 2.45, 0.08, 96]} />
        <meshStandardMaterial
          color="#ffe3ec"
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* 중앙 케이크 매트 */}
      <mesh position={[0, 0.21, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.035, 96]} />
        <meshStandardMaterial color="#fff7ef" roughness={0.9} />
      </mesh>

      {/* 테이블 중앙 다리 */}
      <mesh position={[0, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.32, 1.55, 48]} />
        <meshStandardMaterial color="#9b6f50" roughness={0.75} />
      </mesh>

      {/* 테이블 받침 */}
      <mesh position={[0, -1.68, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.9, 1.05, 0.16, 64]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.75} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  바닥
----------------------------- */
function Floor({ isLightOn }) {
  return (
    <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[8, 96]} />
      <meshStandardMaterial
        color={isLightOn ? "#2a1b24" : "#050305"}
        roughness={0.95}
      />
    </mesh>
  );
}

/* -----------------------------
  일렁이는 촛불
----------------------------- */
function FlickeringFlame({ position = [0, 0, 0], size = 1 }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    const flicker =
      1 +
      Math.sin(time * 18) * 0.12 +
      Math.sin(time * 31) * 0.06 +
      Math.sin(time * 47) * 0.03;

    if (flameRef.current) {
      flameRef.current.scale.set(
        size * 0.75 * flicker,
        size * 1.45 * flicker,
        size * 0.75 * flicker
      );

      flameRef.current.position.x = position[0] + Math.sin(time * 9) * 0.008;
      flameRef.current.position.y = position[1] + Math.sin(time * 14) * 0.007;
      flameRef.current.position.z = position[2] + Math.cos(time * 10) * 0.008;
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        0.55 + Math.sin(time * 20) * 0.18 + Math.sin(time * 37) * 0.08;
    }
  });

  return (
    <group>
      {/* 바깥 불꽃 */}
      <mesh ref={flameRef} position={position}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff6b2c"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* 안쪽 작은 불꽃 */}
      <mesh position={[position[0], position[1] + 0.005, position[2]]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial
          color="#fff3a6"
          emissive="#ffd166"
          emissiveIntensity={2.5}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={position}
        intensity={0.65}
        distance={1.4}
        color="#ffc46b"
      />
    </group>
  );
}

/* -----------------------------
  작은 촛불
----------------------------- */
function MiniCandle({ position, onClick, isLit }) {
  return (
    <group position={position} onClick={onClick}>
      {/* 초 몸체 */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.28, 24]} />
        <meshStandardMaterial color="#fff7e6" roughness={0.7} />
      </mesh>

      {/* 심지 */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 12]} />
        <meshStandardMaterial color="#2b1a12" roughness={0.9} />
      </mesh>

      {isLit && <FlickeringFlame position={[0, 0.36, 0]} size={0.8} />}
    </group>
  );
}

/* -----------------------------
  케이크
----------------------------- */
function Cake({ onClick, isLit }) {
  return (
    <group position={[0, 0, 0]} onClick={onClick}>
      {/* 케이크 아래층 */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.85, 0.55, 64]} />
        <meshStandardMaterial color="#f8c8dc" roughness={0.75} />
      </mesh>

      {/* 케이크 윗층 */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.7, 0.18, 64]} />
        <meshStandardMaterial color="#fff1f5" roughness={0.8} />
      </mesh>

      {/* 케이크 초 */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
        <meshStandardMaterial color="#ff8a65" roughness={0.65} />
      </mesh>

      {/* 심지 */}
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 12]} />
        <meshStandardMaterial color="#2b1a12" />
      </mesh>

      {isLit && <FlickeringFlame position={[0, 1.1, 0]} size={0.9} />}
    </group>
  );
}

/* -----------------------------
  선물상자
----------------------------- */
function GiftBox({ position, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      {/* 상자 */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial color="#ff9eb5" roughness={0.75} />
      </mesh>

      {/* 세로 리본 */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <boxGeometry args={[0.11, 0.035, 0.54]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>

      {/* 가로 리본 */}
      <mesh position={[0, 0.315, 0]} castShadow>
        <boxGeometry args={[0.54, 0.035, 0.11]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>

      {/* 리본 매듭 */}
      <mesh position={[0, 0.39, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  사진 액자
----------------------------- */
function PhotoFrame({ position, rotation = [0, 0, 0], onClick }) {
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* 액자 프레임 */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.65, 0.08]} />
        <meshStandardMaterial color="#f2c6a0" roughness={0.75} />
      </mesh>

      {/* 사진 영역 */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.68, 0.45, 0.03]} />
        <meshStandardMaterial color="#fffaf0" roughness={0.8} />
      </mesh>

      {/* 받침대 */}
      <mesh position={[0, -0.42, -0.12]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.12, 0.42, 0.06]} />
        <meshStandardMaterial color="#b98b62" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  편지
----------------------------- */
function Letter({ position, onClick }) {
  return (
    <group position={position} rotation={[0, 0.15, 0]} onClick={onClick}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.06, 0.65]} />
        <meshStandardMaterial color="#fff7e6" roughness={0.85} />
      </mesh>

      {/* 편지 접힘선 느낌 */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.72, 0.01, 0.02]} />
        <meshStandardMaterial color="#e8d8bd" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  파티 폭죽 파티클
----------------------------- */
function ConfettiPiece({ config }) {
  const ref = useRef();
  const startTimeRef = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    // Three.js clock 기준으로 시작 시간 저장
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;

    if (elapsed > config.life) {
      ref.current.visible = false;
      return;
    }

    ref.current.visible = true;

    const progress = elapsed / config.life;
    const gravity = -0.72 * elapsed * elapsed;

    ref.current.position.set(
      config.origin[0] + config.velocity[0] * elapsed,
      config.origin[1] + config.velocity[1] * elapsed + gravity,
      config.origin[2] + config.velocity[2] * elapsed
    );

    ref.current.rotation.x += config.rotationSpeed[0];
    ref.current.rotation.y += config.rotationSpeed[1];
    ref.current.rotation.z += config.rotationSpeed[2];

    ref.current.scale.setScalar(Math.max(0.15, 1 - progress * 0.65));

    if (ref.current.material) {
      ref.current.material.opacity = Math.max(0, 1 - progress);
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[config.size[0], config.size[1]]} />
      <meshStandardMaterial
        color={config.color}
        roughness={0.65}
        transparent
        opacity={1}
        side={2}
      />
    </mesh>
  );
}
function PartyPopper({ side = "left", triggerKey }) {
  const colors = [
    "#ff5c8a",
    "#ffd166",
    "#06d6a0",
    "#4dabf7",
    "#b197fc",
    "#ffffff",
    "#ff9f1c",
  ];

  const pieces = useMemo(() => {
    const origin = side === "left" ? [-2.85, 0.28, 0.85] : [2.85, 0.28, 0.85];
    const direction = side === "left" ? 1 : -1;

    return Array.from({ length: 120 }, (_, index) => {
      const strongBurst = index < 35;

      return {
        id: `${triggerKey}-${side}-${index}`,
        origin,
        velocity: [
          direction * (strongBurst ? 2.1 + Math.random() * 1.4 : 1.0 + Math.random() * 1.9),
          strongBurst ? 1.4 + Math.random() * 1.6 : 0.7 + Math.random() * 1.8,
          -1.15 + Math.random() * 2.3,
        ],
        rotationSpeed: [
          0.035 + Math.random() * 0.12,
          0.035 + Math.random() * 0.12,
          0.035 + Math.random() * 0.12,
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: [
          0.035 + Math.random() * 0.06,
          0.025 + Math.random() * 0.05,
        ],
        life: 1.5 + Math.random() * 1.15,
        startTime: 0,
      };
    });
  }, [side, triggerKey]);


  return (
    <group>
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} config={piece} />
      ))}

      {/* 파티 폭죽 콘 */}
      <mesh
        position={side === "left" ? [-2.95, 0.16, 0.85] : [2.95, 0.16, 0.85]}
        rotation={[3, 0, side === "left" ? 0.85 : -0.85]}
      >
        <coneGeometry args={[0.12, 0.42, 24]} />
        <meshStandardMaterial color="#4dabf7" roughness={0.5} />
      </mesh>

      {/* 폭죽 순간 조명 */}
      <pointLight
        position={side === "left" ? [-2.4, 1.0, 0.85] : [2.4, 1.0, 0.85]}
        intensity={1.8}
        distance={2.4}
        color="#ffd1dc"
      />
    </group>
  );
}

/* -----------------------------
  실제 3D 장면
----------------------------- */
function SceneContent({ onSelectMemory, isLightOn, fireworkKey }) {
  return (
    <>
      <color attach="background" args={[isLightOn ? "#1f141c" : "#030203"]} />

      {/* 방 전체 조명 */}
      <ambientLight intensity={isLightOn ? 0.85 : 0.025} />

      <directionalLight
        position={[3, 5, 4]}
        intensity={isLightOn ? 2.4 : 0.04}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        position={[-2.5, 2.2, 2.5]}
        intensity={isLightOn ? 1.2 : 0}
        color="#ffd1dc"
      />

      {/* 촛불이 켜졌을 때 테이블 중심에 은은한 빛 */}
      {isLightOn && (
        <pointLight
          position={[0, 1.1, 0.4]}
          intensity={0.75}
          distance={3}
          color="#ffc46b"
        />
      )}

      <Floor isLightOn={isLightOn} />
      <Table />

      {/* 스위치를 ON으로 누를 때마다 새 폭죽 생성 */}
      {fireworkKey > 0 && (
        <>
          <PartyPopper
            key={`left-${fireworkKey}`}
            side="left"
            triggerKey={fireworkKey}
          />
          <PartyPopper
            key={`right-${fireworkKey}`}
            side="right"
            triggerKey={fireworkKey}
          />
        </>
      )}

      <MiniCandle
        position={[-1.15, -0.35, -0.35]}
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "작은 촛불",
            content: "마치 이 작은 불빛처럼, 우리 추억도 따뜻하게 남았으면 좋겠어.",
          })
        }
      />

      <MiniCandle
        position={[1.45, -0.35, 0.45]}
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "작은 촛불",
            content: "오늘의 이 순간을 항상 기억하고 싶어.",
          })
        }
      />

      <GiftBox
        position={[1, -0.36, 1.2]}
        onClick={() =>
          onSelectMemory({
            title: "작은 선물",
            content: "아직 열어보지 않은 앞으로의 추억들을 너와 함께 만들고 싶어.",
          })
        }
      />

      <Cake
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "Anniversary Cake",
            content: "1주년 축하해!! 앞으로도 우리 오랫동안 함께하자!",
          })
        }
      />

      <PhotoFrame
        position={[-1.45, -0.05, 1.05]}
        rotation={[0, 0.8, 0]}
        onClick={() =>
          onSelectMemory({
            title: "첫 번째 추억",
            content: "여기에 첫 만남이나 첫 데이트 사진 이야기를 넣으면 좋아.",
          })
        }
      />

      <PhotoFrame
        position={[1.45, -0.05, -0.55]}
        rotation={[0, -0.3, 0]}
        onClick={() =>
          onSelectMemory({
            title: "두 번째 추억",
            content: "함께 웃었던 날, 여행 갔던 날, 특별했던 순간을 적어보자.",
          })
        }
      />

      <Letter
        position={[0.95, -0.38, 1.25]}
        onClick={() =>
          onSelectMemory({
            title: "편지",
            content: "Dear. 너에게 하고 싶었던 말을 여기에 담을 거야.",
          })
        }
      />

      {isLightOn && (
        <Text
          position={[0, 1.55, -1.25]}
          fontSize={0.36}
          color="#fff3a6"
          anchorX="center"
        >
          Happy 1st Anniversary!
        </Text>
      )}

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

/* -----------------------------
  최상위 Scene3D
----------------------------- */
function Scene3D({ onSelectMemory }) {
  const isMobile = window.innerWidth <= 768;

  const [isLightOn, setIsLightOn] = useState(false);
  const [fireworkKey, setFireworkKey] = useState(0);

  const handleToggleLight = () => {
    setIsLightOn((prev) => {
      const next = !prev;

      if (next) {
        setFireworkKey((key) => key + 1);
      }

      return next;
    });
  };

  return (
    <section className={`scene-wrapper ${isLightOn ? "light-on" : "light-off"}`}>
      <Canvas
        shadows
        camera={{
          position: isMobile ? [0, 3.1, 6.5] : [0, 2.6, 5.2],
          fov: isMobile ? 54 : 45,
        }}
      >
        <SceneContent
          onSelectMemory={onSelectMemory}
          isLightOn={isLightOn}
          fireworkKey={fireworkKey}
        />
      </Canvas>

      <button
        className={`room-switch ${isLightOn ? "on" : "off"}`}
        onClick={handleToggleLight}
        aria-label={isLightOn ? "Turn off the room light" : "Turn on the room light"}
      >
        <span className="switch-label">
          {isLightOn ? "LIGHT ON" : "LIGHT OFF"}
        </span>

        <span className="switch-track">
          <span className="switch-thumb" />
        </span>
      </button>
    </section>
  );
}

export default Scene3D;