"use client";

import { useState } from "react";
import { Asset } from "@/types/asset";

interface Props {
  assets: Asset[];
  onSelect: (asset: Asset) => void;
}

export function AssetSearch({
  assets,
  onSelect,
}: Props) {
    console.log(assets);
  const [query, setQuery] =
    useState("");

  const filteredAssets =
    query.length < 2
      ? []
      : assets.filter(
          (asset) =>
            asset.name
              .toLowerCase()
              .includes(
                query.toLowerCase()
              ) ||
            asset.symbol
              .toLowerCase()
              .includes(
                query.toLowerCase()
              )
        );

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        placeholder="Search asset..."
        className="
        w-full
        bg-zinc-800
        rounded-xl
        p-4
        "
      />

      {filteredAssets.length >
        0 && (
        <div
          className="
          absolute
          top-full
          left-0
          right-0
          mt-2
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          overflow-hidden
          z-50
          "
        >
          {filteredAssets
            .slice(0, 8)
            .map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  onSelect(
                    asset
                  );

                  setQuery(
                    asset.symbol
                  );
                }}
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-zinc-800
                transition
                "
              >
                <div className="font-medium">
                  {
                    asset.symbol
                  }
                </div>

                <div className="text-xs text-zinc-500">
                  {asset.name}
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}