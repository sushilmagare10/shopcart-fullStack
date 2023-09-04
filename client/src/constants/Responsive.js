import { css } from "styled-components";

export const md = (props) => {
  return css`
    @media only screen and (max-width: 960px) {
      ${props}
    }
  `;
};
