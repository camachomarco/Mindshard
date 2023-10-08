"use client";

import GlobalStyle from "@/lib/components/styles/GlobalStyle";
import StyledComponentsRegistry from "@/lib/components/styles/registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Div, Container } from "@/lib/components/styles/ReusableStyledComponents";
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
          <Container>
            <Header>
              {" "}
              <h1>Mindshard</h1>
              <RightSideNavbar>
                <p>Demo</p>
              </RightSideNavbar>
            </Header>
            {children}
          </Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const Header = styled(Div)`
  position: fixed;
  background-color: rgba(var(--first-color-rgb), 0.2);
  border: 1px solid var(--first-color-border);
  height: 6rem;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  align-self: center;
  top: 50px;
  padding: 10px 80px 10px 80px;
  box-shadow: 5px 5px 40px 0px rgb(0, 0, 0, 0.01);
`;

const RightSideNavbar = styled(Div)`
  font-family: var(--first-font);
  font-weight: 900;
  width: 7rem;
  justify-content: space-between;
`;
