import { useEffect, type EffectCallback } from "react";

export const useMount = (callback: EffectCallback) => {
  useEffect(callback, []);
};
