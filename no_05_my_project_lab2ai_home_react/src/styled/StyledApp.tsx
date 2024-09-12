import styled from "styled-components/macro";
import { global } from "./global";
import palette from "./palette";

export const StyledApp = styled.div`
  font-family: 'SpoqaHanSansNeo', sans-serif;
  min-height: calc(100vh + 10px);
  color: ${palette.primary.text};
  a {
    color: ${palette.primary.text};
  }
  
  .inner-container {
    max-width: ${global.width.max};
    margin: 0 auto;
  }

  .gradient-text {
    display: inline-block;
    background: linear-gradient(90.3deg, #FA5F33 -2.2%, #FF2424 46.06%, #E036B0 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(0,0,0,0);
  }
  .gradient-bg {
    background: linear-gradient(90.3deg, #FA5F33 -2.2%, #FF2424 46.06%, #E036B0 100%);
  }


  /* === appear 트랜지션 === */

  /* === Enter 트랜지션 === */
  .fadeIn-enter {
    opacity: 0;
  }
  .fadeIn-enter-active {
    opacity: 1;
    transition: opacity 0.9s 0.3s ease-in-out;
  }
  .fadeIn-enter-done {
    opacity: 1;
  }

  /* === Exit 트랜지션 === */
  .slideUp-exit {
    transform: none;
    opacity: 1;
  }
  .slideUp-exit-active {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
    transition: transform 2.2s 0.3s cubic-bezier(0.2, 1, 1, 1), opacity 2.2s cubic-bezier(0.7, 0, 0.84, 0);
  }
  .slideUp-exit-done {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
`;