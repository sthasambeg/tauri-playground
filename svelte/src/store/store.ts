import { Store } from "tauri-plugin-store-api";

const AvailableStores = ["theme"] as const;
export const AvailableThemes = ["skeleton", "modern", "vintage"] as const;

export type AvailableStores = (typeof AvailableStores)[number];
export type AvailableThemes = (typeof AvailableThemes)[number];

const themeStore = new Store(".theme.dat");

export const stores = {
  theme: themeStore,
} satisfies { [key in AvailableStores]: Store };

export async function setTheme(theme: AvailableThemes) {
  if (AvailableThemes.includes(theme)) {
    await themeStore.set("current", theme);
    themeStore.save();
  }
}

export async function getTheme() {
  const theme = await themeStore.get<string>("current");
  return theme ?? "skeleton";
}

export async function setStoreValue(storeName: AvailableStores, value: string) {
  if (AvailableStores.includes(storeName)) {
    await stores[storeName].set(storeName, value);
    stores[storeName].save();
  }
}
