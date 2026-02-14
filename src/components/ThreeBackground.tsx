import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

// 우주 공간의 별들
const StarField = ({ count = 3000, theme = 'dark' }) => {
  const mesh = useRef<THREE.Points>(null);
  
  // 구형 분포로 별 생성 (더 우주 같은 느낌)
  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    const isDark = theme === 'dark';
    
    for (let i = 0; i < count; i++) {
      // 구형 분포 공식 (Spherical distribution)
      // 반지름을 다양하게 하여 깊이감 부여 (20 ~ 50)
      const r = 20 + Math.random() * 30; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions.set([x, y, z], i * 3);
      
      // 색상 다양화 (테마 컬러 활용)
      const vx = Math.random();
      if (vx > 0.95) color.set(isDark ? '#fbbf24' : '#d97706'); // Amber
      else if (vx > 0.7) color.set(isDark ? '#10b981' : '#059669'); // Emerald
      else if (vx > 0.5) color.set(isDark ? '#0ea5e9' : '#0284c7'); // Blue
      else color.set(isDark ? '#64748b' : '#94a3b8'); // Slate
      
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return { positions, colors };
  }, [count, theme]);

  useFrame((state, delta) => {
    if (mesh.current) {
      // 기본 회전 (천천히)
      mesh.current.rotation.y -= delta / 60;
      mesh.current.rotation.x -= delta / 100;

      // 마우스 인터랙션 (부드러운 시차 효과)
      // lerp를 사용하여 부드럽게 따라오도록 설정
      const { x, y } = state.pointer;
      mesh.current.rotation.x += (-y * 0.15 - mesh.current.rotation.x) * delta * 0.5;
      mesh.current.rotation.y += (-x * 0.15 - mesh.current.rotation.y) * delta * 0.5;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particlesData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors={true}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        // Use Normal blending for better visibility in light mode, or custom logic.
        // Additive is beautiful in dark, but invisible in light.
        blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 유성 (Shooting Star)
const ShootingStar = ({ theme = 'dark' }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const isDark = theme === 'dark';
  
  // 유성 상태 관리 Refs
  const data = useRef({
    speed: 0,
    progress: 0,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3()
  });

  const reset = () => {
    // 시작점: 화면 밖 먼 곳
    const r = 30;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    data.current.startPos.set(x, y, z);
    
    // 도착점: 반대편 어딘가
    data.current.endPos.set(-x + (Math.random() - 0.5) * 10, -y + (Math.random() - 0.5) * 10, -z + (Math.random() - 0.5) * 10);
    
    data.current.speed = 0.6 + Math.random() * 0.8; // 속도 약간 상향
    data.current.progress = 0;
    
    if (mesh.current) {
      mesh.current.position.copy(data.current.startPos);
      mesh.current.lookAt(data.current.endPos);
      mesh.current.scale.set(1, 1, 1);
    }
    
    setActive(true);
  };

  useFrame((_, delta) => {
    if (!active) {
      // 0.2% 확률로 유성 생성 (프레임당) - 빈도 약간 조절
      if (Math.random() < 0.002) reset();
      return;
    }

    if (mesh.current) {
      data.current.progress += delta * data.current.speed;
      
      // 선형 보간으로 위치 이동
      mesh.current.position.lerpVectors(data.current.startPos, data.current.endPos, data.current.progress);
      
      // 꼬리 효과 (스케일 조절)
      const length = Math.sin(data.current.progress * Math.PI) * 20;
      mesh.current.scale.z = Math.max(1, length);

      // 끝에 도달하면 비활성화
      if (data.current.progress >= 1) {
        setActive(false);
      }
    }
  });

  return (
    <mesh ref={mesh} visible={active}>
      <boxGeometry args={[0.04, 0.04, 1]} /> 
      <meshBasicMaterial 
        color={isDark ? "#34d399" : "#059669"} 
        transparent 
        opacity={0.6} 
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
};

const ThreeBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <StarField count={2500} theme={theme} />
        {/* 여러 개의 유성 인스턴스 배치 */}
        <ShootingStar theme={theme} />
        <ShootingStar theme={theme} />
        <ShootingStar theme={theme} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
