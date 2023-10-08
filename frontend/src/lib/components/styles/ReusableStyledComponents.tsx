"use client";

import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* font-family: var(--first-font), arial, sans-serif; */
  width: 100%;
  /* max-width: 1200px; */
  margin: 0;
  padding: 20rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* font-family: var(--first-font), arial, sans-serif; */
  width: 100%;
  /* max-width: 1200px; */
  margin: 0;
  padding: 0;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: var(--first-borderradius);
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

export const TextInput = styled.input.attrs({ type: "text" })`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--second-color);
    outline: none;
  }
`;

export const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--second-color);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--fourth-color);
  }
`;
