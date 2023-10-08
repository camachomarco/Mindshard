"use client";

import GlobalStyle from "@/lib/components/styles/GlobalStyle";
import StyledComponentsRegistry from "@/lib/components/styles/registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Div } from "@/lib/components/styles/ReusableStyledComponents";
import styled from "styled-components";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindShard",
  description: "Turn any piece of data into a rich and insightful summary.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />

        <StyledComponentsRegistry>
          <Header>Header</Header>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const Header = styled(Div)`
  background-color: rgba(123, 123, 123, 1);
`;
