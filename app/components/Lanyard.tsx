/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

/*
 * ─────────────────────────────────────────────────────────────
 *  ASSETS  —  Coloca estos archivos en /public/lanyard/
 *
 *  Descárgalos del repo de ReactBits:
 *  https://github.com/DavidHDev/react-bits
 *  (src/assets/lanyard/card.glb  y  lanyard.png)
 * ─────────────────────────────────────────────────────────────
 */
/*
 * ─────────────────────────────────────────────────────────────
 *  PERSONALIZACIÓN DE LA TARJETA Y CORDÓN
 * ─────────────────────────────────────────────────────────────
 */
const CARD_PHOTO_FRONT: string | null = '/lanyard/card-photo.jpg'; // Foto del frente
const CARD_PHOTO_BACK:  string | null = '/lanyard/card-photo.jpg'; // Foto de atrás (puedes usar otra)
const LANYARD_COLOR:    string        = '#000000';                 // Color del cordón (ej: #3b82f6 es azul)

const CARD_GLB    = '/lanyard/card.glb';
const LANYARD_PNG = '/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// ─── Textura personalizada del card (solo cuando CARD_PHOTO ≠ null) ───────────
// El card.glb usa un UV atlas horizontal:
//   Frente → UV range [0.5 → 1.0]  (mitad derecha de la textura)
//   Dorso  → UV range [0.0 → 0.5]  (mitad izquierda de la textura)
// Clonamos la textura con repeat/offset distintos para que la foto
// completa aparezca en AMBAS caras de la tarjeta.
// ─── Textura personalizada del card (frente y dorso independientes) ───────────
function PhotoCardMesh({
  geometry,
  isMobile,
}: {
  geometry: THREE.BufferGeometry;
  isMobile: boolean;
}) {
  const texFront = useTexture(CARD_PHOTO_FRONT as string);
  const texBack  = useTexture(CARD_PHOTO_BACK  as string);

  // Configuramos el FRENTE para que ocupe la mitad derecha del atlas UV [0.5 -> 1.0]
  useMemo(() => {
    texFront.colorSpace = THREE.SRGBColorSpace;
    texFront.flipY      = false;
    texFront.wrapS      = texFront.wrapT = THREE.RepeatWrapping;
    texFront.anisotropy = 16;
    texFront.repeat.set(2, 1);   // Duplicamos ancho
    texFront.offset.set(-1, 0);  // Movemos a la derecha
    texFront.needsUpdate = true;
  }, [texFront]);

  // Configuramos la ESPALDA para que ocupe la mitad izquierda del atlas UV [0.0 -> 0.5]
  useMemo(() => {
    texBack.colorSpace = THREE.SRGBColorSpace;
    texBack.flipY      = false;
    texBack.wrapS      = texBack.wrapT = THREE.RepeatWrapping;
    texBack.anisotropy = 16;
    texBack.repeat.set(2, 1);    // Duplicamos ancho
    texBack.offset.set(0, 0);    // Se queda a la izquierda
    texBack.needsUpdate = true;
  }, [texBack]);

  const matProps = {
    clearcoat:          isMobile ? 0 : 1,
    clearcoatRoughness: 0.12,
    roughness:          0.3,
    metalness:          0.8,
  };

  return (
    <>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial {...matProps} map={texFront} side={THREE.FrontSide} />
      </mesh>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial {...matProps} map={texBack} side={THREE.BackSide} />
      </mesh>
    </>
  );
}





// ─── Types ────────────────────────────────────────────────────
interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

// ─── Physics band + card ──────────────────────────────────────
function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const texture = useTexture(LANYARD_PNG);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(r => r.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              (e.target as any).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              (e.target as any).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Card face: foto personalizada o textura del GLB */}
            {CARD_PHOTO_FRONT ? (
              <PhotoCardMesh geometry={nodes.card.geometry} isMobile={isMobile} />
            ) : (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={materials.base.map}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error - meshline types not fully declared */}
        <meshLineGeometry />
        {/* @ts-expect-error - meshline types not fully declared */}
        <meshLineMaterial
          color={LANYARD_COLOR}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// Pre-carga el modelo 3D
useGLTF.preload(CARD_GLB);
