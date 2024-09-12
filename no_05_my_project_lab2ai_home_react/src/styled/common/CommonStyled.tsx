import styled from "styled-components/macro";
import { global } from "../global";
import palette from "../palette";

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255, 0.35);
  transition: border .3s ease-in-out, background .3s ease-in-out;
  &.active {
    background: #fff;
    border-color: ${palette.text.lightly};
    .header-gnb {
      li {
        &.active {
          h1 {
            color: ${palette.primary.text};
          }
        }
        h1 {
          color: ${palette.text.lightly};
        }
        &.locale-icon {
          svg {
            circle {
              stroke: ${palette.primary.text};
            }
            path {
              stroke: ${palette.primary.text};
            }
          }
        }
      }
    }
  }
  .header-gnb {
    li {
      &.active {
        h1 {
          color: #fff;
        }
      }
      h1 {
        color: ${palette.text.lightly};
      }
      &.locale-icon {
        width: auto;
        svg {
          display: block;
          cursor: pointer;
        }
      }
    }
  }
  .inner-container {
    ${global.flex.between};
    .left-content {
      .bi {
        display: block;
        width: 64px;
        img {
          &.active {
            animation: slide-up .3s ease-in-out;
          }
        }
      }
    }
    .right-content {
      //
    }
  }
  @media screen and (max-width: ${palette.screen.desktop}) {
    width: calc(100% - 44px);
    padding: 0 22px;
  }
`;

export const StyledGnb = styled.ul`
  ${global.flex.aline};
  li {
    position: relative;
    width: 105px;
    margin-right: 30px;
    padding: 22px 0;
    text-align: center;
    &.active {
      h2 {
        color: #fff;
      }
      .navi-bar {
        display: block;
      }
    }
    &:last-child {
      margin-right: 0;
    }
    &.locale-icon {
      position: relative;
      .box {
        top: calc(100% - 10px);
      }
    }
    h1 {
      font-family: 'Pretendard', sans-serif;
      font-size: 18px;
      font-weight: 500;
      line-height: 30px;
      color: ${palette.text.lightly};
      cursor: pointer;
    }
    .navi-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6px;
      display: none;
    }
  }
`;

export const StyledFooter = styled.div`
  padding: 80px 0;
  background: ${palette.primary.text};
  .inner-container {
    ${global.flex.between};
    .left-content {
      p {
        ${global.text.caption2};
      }
    }
    .right-content {
      ul {
        ${global.flex.aline};
        li {
          margin-right: 10px;
          background: #636875;
          border-radius: 9999px;
          &:last-child {
            margin-right: 0;
          }
          &.en {
            a {
              span {
                ${global.text.caption_en};
              }
            }
          }
          a {
            ${global.flex.aline};
            padding: 0 22px;
            height: 40px;
            &.padding {
              .icon-image {
                width: 50px;
                height: auto;
              }
            }
            .icon-image {
              width: 15px;
              height: 15px;
            }
            span {
              ${global.text.caption2};
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.desktop}) {
    padding: 80px 22px;
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    padding: 60px 22px;
    .inner-container {
      display: block;
      .right-content {
        margin-top: ${global.margin.mo.sm};
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    padding: 40px 22px;
    .inner-container {
      .left-content {
        p {
          ${global.text.mo_caption_light};
          color: ${palette.text.lightly};
        }
      }
      .right-content {
        margin-top: ${global.margin.mo.sm};
        ul {
          li {
            a {
              ${global.flex.justify};
              min-width: 30px;
              height: 30px;
              padding: 0;
              &.padding {
                padding: 0 12px;
              }
              span {
                display: none;
              }
            }
          }
        }
      }
    }
  }
  
`;


export const StyledVisualFallback = styled.div`
  height: 100vh;
  img {
    object-fit: cover;
    height: 100%;
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    height: 65vh;
  }
`;

export const StyledLoadingCurtainBlock = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  width: 100%;
  height: 100vh;
  /* z-index: 101; */
`