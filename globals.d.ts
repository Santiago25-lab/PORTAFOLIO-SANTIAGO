import { Material, BufferGeometry } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: BufferGeometry;
      meshLineMaterial: Material;
    }
  }
}

export {};