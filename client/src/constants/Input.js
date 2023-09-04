import styled, { css } from "styled-components";
import { accent, background, primary, secondary, text, text2 } from "./Colors";

export const InputStyle = css`
  border: 1px solid ${text};
  padding: 15px 0;
  font-size: 18px;
  background-color: ${background};
  border-radius: 8px;
  color: ${primary};
  outline-color: ${accent};
  ${(props) =>
    props.letter &&
    !props.outline &&
    css`
      align-items: center;
      text-align: center;
      width: 100%;
    `}
  ${(props) =>
    props.login &&
    !props.outline &&
    css`
      padding: 10px 15px;
      width: 95%;
    `}
  ${(props) =>
    props.checkout &&
    !props.outline &&
    css`
      padding: 15px 15px;
      align-items: center;
      justify-content: center;
      width: 95%;
      color: ${accent};
    `}
`;

const StyledInput = styled.input`
  ${InputStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledInput {...rest}>{children}</StyledInput>;
}
