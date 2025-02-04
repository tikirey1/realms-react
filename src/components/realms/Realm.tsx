import { ReactElement } from "react";
import React from "react";
import { Realm } from "../../types";
import { Resources } from "~/util/resources";
import { RealmProps } from "../../types";
import { shortenAddress } from "~/util/formatters";
import { OrderIcon } from "~/shared/OrderIcon";
import Image from "next/image";
const variantMaps: any = {
  small: { heading: "lg:text-4xl", regions: "lg:text-xl" },
};

export function Realm(props: RealmProps): ReactElement {
  const findResourceName = (value: any) => {
    return Resources.find((e) => e.id === parseInt(value));
  };
  return (
    <div className="h-auto p-1 rounded-xl sm:p-4 z-10 text-white w-full">
      {props.loading ? (
        <div className="">
          <div className="w-full h-64 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 rounded bg-white/40 animate-pulse" />
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <OrderIcon order={props.realm.order.toLowerCase()} />
          </div>

          <div
            className={`w-full text-center rounded-lg py-2 text-2xl uppercase tracking-widest`}
          >
            Order of {props.realm.order}
          </div>
          {props.realm?.wonder ? (
            <div className="w-full p-4 text-3xl text-center uppercase rounded bg-white/30">
              {props.realm?.wonder}
            </div>
          ) : (
            ""
          )}
          <div className="w-auto">
            <Image
              src={`https://d23fdhqc1jb9no.cloudfront.net/renders_webp/${props.realm.id}.webp`}
              alt="map"
              className="w-full mt-4 rounded-xl -scale-x-100"
              width={500}
              height={320}
              layout={"responsive"}
            />
          </div>

          <div className="p-2">
            <div className="flex justify-between">
              {props.realm.currentOwner && (
                <h3 className="my-2">
                  👑 {shortenAddress(props.realm.currentOwner.address)}
                </h3>
              )}
              {!props.realm.currentOwner && (
                <div>
                  <button
                    className={
                      "bg-white/20 rounded px-4 uppercase hover:bg-white/40"
                    }
                    onClick={() => {
                      if (props.onClick) props.onClick(props.realm.id, 1);
                    }}
                  >
                    fly to
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between my-4  rounded">
              <h4>
                Id: <span className="font-semibold">{props.realm.id}</span>
              </h4>
              <h4>
                Rank:
                <span className="font-semibold">{props.realm.rarityRank}</span>
              </h4>
              <h4>
                Score:
                <span className="font-semibold">{props.realm.rarityScore}</span>
              </h4>
            </div>

            <h1 className={`mt-2 mb-4 ${variantMaps[props.size]?.heading}`}>
              {props.realm.name}{" "}
            </h1>

            <div className="flex flex-wrap mb-2">
              {props.realm.resourceIds.map((re: any, index) => (
                <span
                  className={`uppercase px-4 py-1 rounded-lg mr-2 mb-2 tracking-widest ${
                    findResourceName(re)?.colourClass
                  }`}
                  key={index}
                >
                  {findResourceName(re)?.trait}
                </span>
              ))}
            </div>

            <div
              className={`flex flex-col  w-full uppercase font-display sm:text-2xl ${
                variantMaps[props.size]?.regions
              } `}
            >
              <span>Regions: {props.realm.regions} / 7</span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-amber-700/60 rounded-xl"
                  style={{
                    width: `${((props.realm.regions as any) / 7) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="pt-1">Cities: {props.realm.cities} / 21</span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-amber-300/60 rounded-xl"
                  style={{
                    width: `${((props.realm.cities as any) / 21) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="pt-1">Harbors: {props.realm.harbours} / 35</span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-700/60 rounded-xl"
                  style={{
                    width: `${((props.realm.harbours as any) / 35) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="pt-1">Rivers: {props.realm.rivers} / 60</span>
              <div className="w-full my-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500/60 rounded-xl"
                  style={{
                    width: `${((props.realm.rivers as any) / 60) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="py-4">
              <a
                className="text-xl"
                target={"_blank"}
                href={
                  "https://opensea.io/assets/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d/" +
                  props.realm.id
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
