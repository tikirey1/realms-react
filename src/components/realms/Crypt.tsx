import { ReactElement } from "react";
import React from "react";
import { isLegendary, Environments } from "~/util/cryptsEnvironments";
import { CryptProps } from "../../types";
import { shortenAddress } from "~/util/formatters";
import Image from "next/image";
const variantMaps: any = {
  small: { heading: "lg:text-4xl", regions: "lg:text-xl" },
};

export function Crypt(props: CryptProps): ReactElement {
  const findEnvironment = (value: any) => {
    return Environments.find((e) => e.id === parseInt(value));
  };

  const image = props.crypt.svg;

  const colours = findEnvironment(props.crypt.environment)?.colours;

  return (
    <div className="z-10 w-full h-auto p-1 text-white rounded-xl sm:p-4">
      {props.loading ? (
        <div className="">
          <div className="w-full h-64 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 rounded bg-white/40 animate-pulse" />
        </div>
      ) : (
        <div className="pt-4">
          <div className="w-full">
            <Image
              src={`data:image/svg+xml;base64,${btoa(image as string)}`}
              alt=""
              width="900"
              height="900"
              layout={"responsive"}
            />
          </div>

          <div className=" sm:text-2xl">
            {props.crypt.currentOwner && (
              <h3 className="my-3">
                👑 {shortenAddress(props.crypt.currentOwner.address)}
              </h3>
            )}
            <div className="flex flex-col sm:flex-row flex-wrap justify-between my-4 rounded">
              <h4>
                Id: <span className="font-semibold ">{props.crypt.id}</span>
              </h4>
              <h4>
                Enviroment:{" "}
                <span
                  className="px-4 py-1 rounded font-semibold "
                  style={{
                    backgroundColor: `${colours?.main}`,
                  }}
                >
                  {findEnvironment(props.crypt.environment)?.name}
                </span>
              </h4>
              <h4>
                Size:{" "}
                <span className="font-semibold ">
                  {props.crypt.size}x{props.crypt.size}
                </span>
              </h4>
            </div>
            <div className="flex justify-between">
              <h1
                className={`mt-2 mb-4 ${variantMaps[props.size]?.heading}
            ${
              isLegendary(props.crypt.name) &&
              `text-transparent background-animate bg-clip-text bg-radial-at-tl from-yellow-100 via-yellow-400 to-yellow-100 shimmer fast`
            }
            `}
              >
                {props.crypt.name}
              </h1>
              <div>
                <button
                  className={
                    "bg-white/20 rounded px-4 uppercase hover:bg-white/40"
                  }
                  onClick={() => {
                    if (props.onClick) props.onClick(props.crypt.id, 2);
                  }}
                >
                  fly to
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col w-full uppercase font-display ${
                variantMaps[props.size]?.regions
              } `}
            >
              <span>Doors: {props.crypt.numPoints} / 13</span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-yellow-700/60 rounded-xl"
                  style={{
                    width: `${((props.crypt.numPoints as any) / 13) * 100}%`,
                    background: `${colours?.door}`,
                  }}
                ></div>
              </div>
              <span className="pt-1">
                Points of Interest: {props.crypt.numDoors} / 12
              </span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-500/60 rounded-xl"
                  style={{
                    width: `${((props.crypt.numDoors as any) / 12) * 100}%`,
                    background: `${colours?.point}`,
                  }}
                ></div>
              </div>
            </div>
            <div className="py-4">
              <a
                className="text-xl"
                target={"_blank"}
                href={
                  "https://opensea.io/assets/0x86f7692569914b5060ef39aab99e62ec96a6ed45/" +
                  props.crypt.id
                }
                rel="noreferrer"
              >
                View on Opensea
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
