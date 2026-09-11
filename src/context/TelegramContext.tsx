"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  initDataUnsafe: {
    user?: TelegramUser;
    query_id?: string;
  };
  themeParams: Record<string, string>;
  colorScheme: "light" | "dark";
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  platform: string;
  version: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

interface TelegramContextValue {
  isTelegram: boolean;
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  ready: boolean;
}

const TelegramContext = createContext<TelegramContextValue>({
  isTelegram: false,
  webApp: null,
  user: null,
  ready: false,
});

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        setWebApp(tg);
        setReady(true);
      } else {
        setReady(true);
      }
    };

    if (typeof window !== "undefined") {
      if (window.Telegram?.WebApp) {
        check();
      } else {
        const t = setTimeout(check, 300);
        return () => clearTimeout(t);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      isTelegram: !!webApp,
      webApp,
      user: webApp?.initDataUnsafe?.user ?? null,
      ready,
    }),
    [webApp, ready]
  );

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  return useContext(TelegramContext);
}
