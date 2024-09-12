import styled from "styled-components/macro";
import { global } from '../../global';
import palette from "../../palette";

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  transition: background .3s ease-in-out;
  &.active {
    background: #fff;
    .header-gnb {
      li {
        span {
          color: ${palette.primary.text};
        }
      }
    }
    .content-wrap {
      .right-content {
        .global-icon {
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
  .content-wrap {
    ${global.flex.between};
    padding: 0 22px;
    .left-content {
      .bi {
        display: block;
        width: 54px;
        padding: 20px 0;
        img {
          &.active {
            animation: slide-up .3s ease-in-out;
          }
        }
      }
    }
    .right-content {
      ${global.flex.aline};
      .menu-icon {
        width: 25px;
        cursor: pointer;
      }
      .global-icon {
        position: relative;
        margin-right: 20px;
        svg {
          display: block;
          cursor: pointer;
        }
      }
    }
  }
  
  @media screen and (max-width: ${palette.screen.mobile}) {
    .content-wrap {
      .left-content {
        .bi {
          width: 46px;
        }
      }
    }
  }
`;

export const StyledMoGnbMenu = styled.div`
  ul {
    li {
      cursor: pointer;
      &:hover {
        background: ${palette.action.hover};
      }
      span {
        display: block;
        ${global.text.mo_title_md_en};
        padding: 18px 22px;
      }
    }
  }
`;