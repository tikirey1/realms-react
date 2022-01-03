import React, { useMemo, Suspense } from "react";
import { Vector3 } from "@babylonjs/core";

import {
  Engine,
  Scene,
  AssetManagerContextProvider,
  useAssetManager,
  Task,
  TaskType,
} from "react-babylonjs";

import styles from "./Tower.module.css";
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
    <div className={styles.canvasContainer} style={{ width: "100%" }}>
      <Engine antialias canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
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
    </div>
  );
};

export default SceneWithTower;
