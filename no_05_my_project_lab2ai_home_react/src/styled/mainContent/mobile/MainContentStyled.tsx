import styled from "styled-components/macro";
import { global } from "../../global";
import palette from "../../palette";


export const StyledServiceSlides = styled.div`
  overflow-x: auto;
  padding: 10px 22px ${global.margin.mo.md} 22px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  ul {
    white-space: nowrap;
    li {
      position: relative;
      z-index: 2;
      display: inline-block;
      width: 60%;
      max-width: 220px;
      margin-right: 20px;
      &:last-child {
        margin-right: 22px;
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%,-50%);
        width: 90%;
        height: 95%;
        box-shadow: 0 12px 38px rgba(0,0,0,0.1);
      }
    }
  }
`;

export const StyledMobileHistory = styled.div`
  position: relative;
  background: ${palette.background.paper2};
  padding-bottom: ${global.margin.mo.lg};
  &::before {
    position: absolute;
    content: '';
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 220px;
    background: ${palette.background.paper2};
  }
  .section-title {
    margin-bottom: ${global.margin.pc.sm};
    padding: 0 22px;
    h1 {
      ${global.text.pc_title_lg_en};
      font-size: 38px;
    }
  }
  .history-tab {
    ul {
      ${global.flex.aline}
      li {
        position: relative;
        flex: 1;
        text-align: center;
        cursor: pointer;
        &.active {
          h2 {
            color: ${palette.text.primary};
          }
          .tab-line {
            background: ${palette.primary.text};
          }
        }
        h2 {
          ${global.text.pc_title_sm};
          font-size: 24px;
          color: ${palette.text.lightly};
          padding: 10px;
        }
        .tab-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: ${palette.text.lightly};
        }
      }
    }
  }
  .contents {
    padding: 0 22px;
    .list-wrap {
      margin-top: ${global.margin.mo.md};
      h3 {
        ${global.text.mo_title_md_kr};
        margin-bottom: 15px;
      }
      ul {
        li {
          ${global.flex.flex};
          margin-bottom: ${global.margin.mo.sm};
          &:last-child {
            margin-bottom: 0;
          }
          .date {
            ${global.text.mo_text_sm_bold};
            white-space: nowrap;
          }
          .text-content {
            .text {
              margin-left: 18px;
              &:not(:first-child) {
                margin-top: 8px;
              }
              h4 {
                ${global.text.mo_text_sm};
                font-weight: 500;
                margin-bottom: 4px;
              }
              p {
                ${global.text.mo_caption_light};
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .section-title {
      margin-bottom: ${global.margin.mo.sm};
      h1 {
        ${global.text.mo_title_md2_en};
      }
    }
    .history-tab {
      ul {
        ${global.flex.aline}
        li {
          &.active {
            h2 {
              color: ${palette.text.primary};
            }
            .tab-line {
              background: ${palette.primary.text};
            }
          }
          h2 {
            ${global.text.mo_title_md_kr};
            color: ${palette.text.lightly};
          }
        }
      }
    }
  }
`;


export const StyledMobileMedia = styled.div`
  padding: ${global.margin.pc.md} 22px;
  .section-title {
    margin-bottom: ${global.margin.pc.sm};
    padding: 0 22px;
    h1 {
      ${global.text.pc_title_lg_en};
      font-size: 38px;
    }
  }
  .media-list {
    li {
      padding: 15px 0;
      border-bottom: 1px solid #D9D9D9;
      text-align: justify;
      &:first-child {
        border-top: 1px solid #D9D9D9;
      }
      a {
        display: block;
      }
      p {
        ${global.text.caption_kr};
      }
      h2 {
        ${global.text.mo_text_sm_bold};
        word-break: break-all;
      }
    }
  }
  .more-wrap {
    ${global.flex.justify};
    margin-top: ${global.margin.mo.sm};
    .more {
      ${global.flex.aline};
      padding: 10px 20px;
      &:active {
        background: ${palette.action.hover};
      }
      span {
        ${global.text.mo_text_md};
      }
      img {
        width: 13px;
        margin-left: 5px;
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    padding: ${global.margin.mo.lg} 22px;
    .section-title {
      margin-bottom: ${global.margin.mo.sm};
      padding: 0;
      h1 {
        ${global.text.mo_title_md2_en};
      }
    }
  }
`;