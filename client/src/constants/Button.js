import styled, { css } from "styled-components";
import { accent, primary, secondary, text, text2 } from "./Colors";

export const ButtonStyle = css`
  border: 0;
  font-size: 18px;
  padding: 5px 25px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  ${(props) =>
    props.More &&
    !props.outline &&
    css`
      background-color: ${accent};
      color: ${text2};
      padding: 5px 10px;
    `}
  ${(props) =>
    props.More &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${text};
      border: 1px solid ${primary};
    `}
  ${(props) =>
    props.Add &&
    !props.outline &&
    css`
      background-color: ${accent};
      color: ${text2};
    `}
  ${(props) =>
    props.Add &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${text};
      border: 1px solid ${primary};
    `}
  ${(props) =>
    props.Sign &&
    !props.outline &&
    css`
      background-color: ${primary};
      padding: 10px 60px;
      color: ${text2};
    `}
  ${(props) =>
    props.Sign &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${text};
      border: 1px solid ${primary};
    `}
  ${(props) =>
    props.News &&
    css`
      margin-top: 10px;
      padding: 15px 20px;
      background-color: ${accent};
      color: ${text2};
      border: 1px solid ${secondary};
      width: 100%;
    `}

    ${(props) =>
    props.continue &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: ${text2};
      padding: 10px 15px;
      transition: ease-in 0.2s;
      &:hover {
        transform: scale(1.02);
      }
    `}
  ${(props) =>
    props.continue &&
    props.outline &&
    css`
      padding: 10px 30px;
      font-weight: 600;
      background-color: transparent;
      color: ${text};
      width: 100%;
      border: 1px solid ${accent};
      transition: ease-in 0.2s;
      margin-top: 30px;
      &:hover {
        transform: scale(1.02);
      }
    `}
    ${(props) =>
    props.remove &&
    !props.outline &&
    css`
      background-color: ${accent};
      color: ${text2};
      padding: 10px 10px;

      align-items: center;
    `}
    ${(props) =>
    props.remove &&
    props.outline &&
    css`
      border: 1px solid ${accent};
      background-color: #fff;
      color: ${text};
      padding: 10px 10px;
      width: 80%;
      align-items: center;
    `}
    ${(props) =>
    props.logout &&
    props.outline &&
    css`
      border: 1px solid ${accent};
      background-color: #fff;
      color: ${text};
      padding: 5px 10px;
      align-items: center;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
