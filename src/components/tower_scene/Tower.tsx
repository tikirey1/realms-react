import React, { useMemo, Suspense } from "react";
import { Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import {
  Engine,
  Scene,
  AssetManagerContextProvider,
  useAssetManager,
  Task,
  TaskType,
} from "react-babylonjs";

import ShieldModel from "./Shield";

const modelTasks: Task[] = [
  {
    name: "tower",
    taskType: TaskType.Mesh,
    rootUrl:
      "https://raw.githubusercontent.com/BibliothecaForAdventurers/realms-tower-defence/feature/babylon-js/public/models/",
    sceneFilename: "Tower.glb",
  },
];

const TowerModel = () => {
  const assetManagerResult = useAssetManager(modelTasks);
  useMemo(() => {
    console.log("Loaded Tasks", assetManagerResult);
    // TODO: Perform any processing on loaded mesh
    // const towerTask = assetManagerResult.taskNameMap["tower"];
  }, []);

  return null;
};

const SceneWithTower = () => {
  return (
    <Engine
      canvasStyle={{ width: "100%", height: "100vh" }}
      antialias
      canvasId="babylonJS"
    >
      <Scene>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Up()}
          alpha={Math.PI / 4}
          beta={Math.PI / 2}
          upperBetaLimit={Math.PI / 2} // So Camera doesn't go below ground
          lowerRadiusLimit={13}
          upperRadiusLimit={15}
          radius={14}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <AssetManagerContextProvider>
          <Suspense fallback={null}>
            <TowerModel />
          </Suspense>
        </AssetManagerContextProvider>
        <ShieldModel />
      </Scene>
    </Engine>
  );
};

export default SceneWithTower;
