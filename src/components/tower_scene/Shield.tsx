import React, { useCallback } from "react";
import { Vector3 } from "@babylonjs/core";
import { FireProceduralTexture } from "@babylonjs/procedural-textures";
import { useScene } from "react-babylonjs";

const shieldPosition = new Vector3(0, 2.2, 0);

const ShieldModel = () => {
  const scene = useScene();
  const ref = useCallback((node) => {
    if (node !== null && scene) {
      const fireTexture = new FireProceduralTexture("fire", 256, scene);
      const fireMaterial = node;
      fireMaterial.diffuseTexture = fireTexture;
      fireMaterial.opacityTexture = fireTexture;
    }
  }, []);

  return (
    <sphere name="shield" diameter={5} segments={16} position={shieldPosition}>
      <standardMaterial ref={ref} name="shieldVisualization" />
    </sphere>
  );
};

export default ShieldModel;
