import { IconHome, IconHomeFilled } from "@tabler/icons-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import logo from "@/assets/logo-white.png";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Image
          src={logo}
          alt="Hype"
          className="h-5 w-min invert dark:invert-0"
        />
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        type: "icon",
        icon: <IconHomeFilled className="size-4" />,
        text: "Home",
        url: "https://www.buildhype.dev",
        secondary: true,
      },
    ],
  };
}
