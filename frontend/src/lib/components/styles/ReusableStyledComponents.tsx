"use client";

import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: var(--first-font), sans-serif;
  width: 100%;
  /* max-width: 1200px; */
  margin: 0;
  padding: 50px;
`;

export const Div = styled.div`
  width: 100%;
  margin: 0;
  padding: 10px;
  background-color: green;
`;

export const Button = styled.button`
  background-color: var(--first-color);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Card = styled.div`
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--box-shadow);
`;

export const Text = styled.p`
  font-size: var(--first-fontsize);
  line-height: var(--line-height);
  color: var(--black);
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: var(--black);
`;
