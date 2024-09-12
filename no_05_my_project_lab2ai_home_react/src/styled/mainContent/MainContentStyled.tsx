import styled from "styled-components/macro";
import { global } from "../global";
import palette from "../palette";

// 메인컨텐츠 공통 스타일
export const StyledMainContent = styled.div`
  padding: ${global.margin.pc.lg} 0;
  .section-title {
    margin-bottom: ${global.margin.pc.md};
    ${global.text.pc_title_lg_en};
  }
  // 메인컨텐츠 공통 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    &:not(.company-section-page) {
      padding: ${global.margin.pc.lg} 22px;
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    &:not(.company-section-page) {
      padding: ${global.margin.pc.md} 22px;
    }
    .section-title {
      margin-bottom: ${global.margin.pc.sm};
      font-size: 38px;
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    &:not(.service-section-page, .company-section-page) {
      padding: ${global.margin.mo.lg} 22px;
    }
    .section-title {
      margin-bottom: ${global.margin.mo.sm};
      ${global.text.mo_title_md2_en};
    }
  }

  &.about-section-page {
    position: relative;
    overflow: hidden;
    .about-page-bg {
      position: absolute;
      width: 660px;
      bottom: -28%;
      right: -6%;
      z-index: -1;
    }
    @media screen and (max-width: ${palette.screen.desktop}) {
      .about-page-bg {
        width: 450px;
        bottom: -16%;
        right: -10%;
      }
    }
    @media screen and (max-width: ${palette.screen.mobile}) {
      .about-page-bg {
        width: 300px;
        bottom: -33%;
        right: -30%;
      }
    }
  }
  &.service-section-page {
    padding-bottom: 0;
    overflow: hidden;
    background: ${palette.primary.background};
    @media screen and (max-width: ${palette.screen.tablet}) {
      padding: ${global.margin.pc.md} 0;
    }
    @media screen and (max-width: ${palette.screen.mobile}) {
      .section-title {
        padding: 0 22px;
      }
      padding: ${global.margin.mo.lg} 0;
      padding-bottom: ${global.margin.mo.lg};
    }
  }
  &.portfolio-section-page {
    overflow: hidden;
  }
  &.history-section-page {
    background: ${palette.background.paper2};
  }
  &.video-section-page {
    padding-top: 0;
  }
  &.company-section-page {
    background: ${palette.primary.background};
    padding-bottom: 0;
    @media screen and (max-width: ${palette.screen.tablet}) {
      padding-top: ${global.margin.pc.md};
    }
    @media screen and (max-width: ${palette.screen.mobile}) {
      padding-top: ${global.margin.mo.lg};
    }
  }
`;

// 비주얼 비디오(VisualVideo) 스타일
export const StyledVisualVideo = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  border-bottom-right-radius: 200px;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  video {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: normal;
    opacity: 0.3;
  }
  .visual-text {
    height: 100%;
    .inner-container {
      position: relative;
      height: 100%;
      .text-content {
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        h1 {
          font-family: 'Pretendard', sans-serif;
          font-weight: 700;
          font-size: 85px;
          color: #fff;
        }
        .describe {
          margin-top: 60px;
        }
        p {
          font-weight: 400;
          font-size: 25px;
          color: #fff;
          line-height: 42px;
        }
      }
    }
  }
  // 비주얼 비디오(VisualVideo) 반응형 스타일
  @media screen and (max-width: ${palette.screen.tablet}) {
    border-bottom-right-radius: 120px;
    .visual-text {
      padding: 0 22px;
      .inner-container {
        .text-content {
          top: auto;
          bottom: 15%;
          transform: none;
          h1 {
            font-size: 65px;
          }
          .describe {
            margin-top: 40px;
          }
          p {
            font-size: 21px;
            line-height: 33px;
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    border-bottom-right-radius: 0;
    height: 65vh;
    .visual-text {
      .inner-container {
        .text-content {
          h1 {
            font-size: 28px;
            line-height: 33px;
          }
          .describe {
            margin-top: 20px;
          }
          p {
            font-size: 14px;
            line-height: 23px;
          }
        }
      }
    }
  }
`;

// 어바웃(About) 스타일
export const StyledAbout = styled.div`
  .what {
    h2 {
      ${global.text.pc_title_md};
    }
  }
  .about-items {
    margin-top: ${global.margin.pc.md};
    ${global.flex.aline};
    li {
      margin-right: 220px;
      &:last-child {
        margin-right: 0;
      }
      h3 {
        display: inline-block;
        ${global.text.pc_text_lg};
        .line {
          display: block;
          height: 2px;
          margin: 20px 0;
        }
      }
      p {
        ${global.text.pc_text_sm};
      }
    }
  }
  // 어바웃(About) 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    .about-items {
      li {
        margin-right: 100px;
      }
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    .what {
      h2 {
        font-size: 34px;
        line-height: 50px;
      }
    }
    .about-items {
      margin-top: ${global.margin.pc.md};
      display: block;
      li {
        margin-right: 0;
        margin-bottom: ${global.margin.pc.md};
        &:last-child {
          margin-bottom: 0;
        }
        h3 {
          font-size: 24px;
          .line {
            margin: 15px 0;
          }
        }
        p {
          font-size: 16px;
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .what {
      h2 {
        ${global.text.mo_title_md2_kr};
      }
    }
    .about-items {
      margin-top: ${global.margin.mo.md};
      li {
        margin-bottom: ${global.margin.mo.md};
        h3 {
          ${global.text.mo_text_md};
          .line {
            margin: 10px 0;
          }
        }
        p {
          ${global.text.mo_text_sm};
        }
      }
    }
  }
`;

// 서비스(Service) 스타일
export const StyledService = styled.div`
  .service-content {
    ${global.flex.aline};
    .left-content {
      h2 {
        ${global.text.pc_title_sm};
      }
      .content-title {
        ${global.flex.aline};
        margin-top: 10px;
        .icon-image {
          width: 53px;
          flex-shrink: 0;
        }
        h1 {
          ${global.text.pc_title_md};
          margin-left: 12px;
          white-space: nowrap;
        }
      }
    }
    .right-content {
      margin-left: 100px;
      p {
        ${global.text.pc_text_sm};
      }
    }
  }
  .link-list {
    ${global.flex.flex};
    margin-top: ${global.margin.pc.sm};
    a {
      width: 164px;
      border-radius: 7px;
      margin-right: 16px;
      overflow: hidden;
      &:last-child {
        margin-right: 0;
      }
      img {
        height: 100%;
        object-fit: cover;
      }
      &.text-link {
        ${global.flex.justify};
        span {
          ${global.text.pc_text_sm};
          color: #fff;
        }
        .icon-image {
          width: 18px;
          margin-left: 5px;
        }
      }
    }
  }
  .service-image-bg {
    margin-left: -20%;
    img {
      /* min-width: ${global.width.max}; */
    }
  }
  // 서비스(Service) 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    .service-content {
      .right-content {
        margin-left: 70px;
      }
    }
    .service-image-bg {
      margin-left: 0;
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    .section-title {
      padding: 0 22px;
    }
    .service-content {
      display: block;
      .left-content {
        padding: 0 22px;
        h2 {
          font-size: 27px;
        }
        .content-title {
          .icon-image {
            width: 45px;
          }
          h1 {
            font-size: 34px;
          }
        }
      }
      .right-content {
        margin-top: ${global.margin.mo.md};
        margin-left: 0;
        p {
          padding: 0 22px;
          font-size: 16px;
        }
      }
    }
    .link-list {
      padding: 0 22px;
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .service-content {
      .left-content {
        padding: 0 22px;
        h2 {
          ${global.text.mo_title_md2_kr};
        }
        .content-title {
          margin-top: 0;
          .icon-image {
            width: 24px;
          }
          h1 {
            margin-left: 5px;
            ${global.text.mo_title_md2_en};
          }
        }
      }
      .right-content {
        margin-top: 30px;
        p {
          padding: 0 22px;
          ${global.text.mo_text_sm};
        }
      }
    }
    .link-list {
      margin-top: ${global.margin.mo.sm};
      padding: 0 22px;
      a {
        width: 130px;
        margin-right: 12px;
      }
    }
  }
`;

// 포트폴리오(Portfolio) 스타일
export const StyledPortfolio = styled.div`
  .portfolio-swiper {
    overflow: visible;
    .swiper-slide {
      width: 42%;
      padding-right: 60px;
      &:last-child {
        padding-right: 0;
      }
      .slide-inner {
        height: 100%;
        border-bottom-right-radius: 76px;
        ${global.shadow.default};
        overflow: hidden;
        background: #fff;
        .image-wrap {
          img {
            object-fit: cover;
          }
        }
        .text-content {
          padding: 35px 30px;
          text-align: justify;
          h2 {
            ${global.text.pc_text_lg};
            margin-bottom: 10px;
            span {
              color: ${palette.text.point2};
            }
          }
          p {
            ${global.text.pc_text_sm};
          }
        }
      }
    }
  }
  // 포트폴리오(Portfolio) 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    .portfolio-swiper {
      .swiper-slide {
        width: 52%;
      }
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    .portfolio-swiper {
      .swiper-slide {
        width: 62%;
        padding-right: 40px;
        .slide-inner {
          border-bottom-right-radius: 60px;
          box-shadow: 0 20px 32px rgba(0,0,0,0.08);
          .image-wrap {
            position: relative;
            .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 12px;
              background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%);
              h2 {
                ${global.text.mo_title_md_bold_kr};
              }
            }
          }
          .text-content {
            padding: 25px 20px;
            h2 {
              font-size: 24px;
              line-height: 34px;
              margin-bottom: 10px;
            }
            p {
              font-size: 16px;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .portfolio-swiper {
      .swiper-slide {
        width: 72%;
        padding-right: 16px;
        .slide-inner {
          border-bottom-right-radius: 24px;
          .text-content {
            padding: 16px;
            h2 {
              display: none;
            }
            p {
              ${global.text.mo_text_sm};
            }
          }
        }
      }
    }
  }
`;


// 히스토리(History) 스타일
export const StyledHistory = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    width: 100%;
    height: 650px;
    background: ${palette.background.paper2};
    border-top-left-radius: 200px;
  }
  .history-list {
    .history {
      ${global.flex.flex};
      width: 100%;
      margin-bottom: ${global.margin.pc.md};
      &:last-child {
        margin-bottom: 0;
      }
      .year {
        ${global.text.pc_title_sm};
        margin-right: 200px;
        line-height: 20px;
      }
      .content-list {
        width: 100%;
        li {
          ${global.flex.aline};
          width: 100%;
          margin-bottom: ${global.margin.pc.sm};
          &:last-child {
            margin-bottom: 0;
          }
          .date {
            ${global.text.pc_text_md_bold};
            margin-right: 35px;
            white-space: nowrap;
          }
          .text-content-wrap {
            position: relative;
            width: 100%;
            .text-content {
              ${global.text.pc_text_md};
              &:not(:first-child) {
                p {
                  margin-top: 5px;
                }
              }
              p {
                line-height: normal;
                &.hover {
                  cursor: pointer;
                  &:hover {
                    font-weight: 700;
                    ~.hover-desc {
                      opacity: 1;
                      pointer-events: auto;
                      user-select: auto;
                    }
                  }
                }
              }
              .hover-desc {
                position: absolute;
                top: 100%;
                z-index: 1;
                min-width: 500px;
                opacity: 0;
                padding-top: 16px;
                pointer-events: none;
                user-select: none;
              
                .inner {
                  display: block;
                  background: rgba(35, 35, 35, 0.8);
                  padding: 20px;
                  color: #fff;
                  line-height: 1.5em;
              
                  &::before {
                    content: '';
                    position: absolute;
                    bottom: calc(100% - 16px);
                    left: 0;
                    width: 0;
                    height: 0;
                    border-bottom: 10px solid rgba(35, 35, 35, 0.8);
                    border-top: 10px solid rgba(0, 0, 0, 0);
                    border-left: 10px solid rgba(0, 0, 0, 0);
                    border-right: 10px solid rgba(0, 0, 0, 0);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 히스토리(History) 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    &::before {
      display: none;
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    .history-list {
      .history {
        .year {
          font-size: 26px;
          margin-right: 120px;
        }
        .content-list {
          li {
            ${global.flex.flex};
            align-items: baseline;
            margin-bottom: ${global.margin.mo.md};
            .date {
              font-size: 18px;
            }
            .text-content-wrap {
              .text-content {
                font-size: 18px;
                margin-left: 30px;
                &:not(:first-child) {
                  p {
                    margin-top: 10px;
                  }
                }
                p {
                  &.hover {
                    cursor: auto;
              
                    &:hover {
                      font-weight: 400;
                    }
                  }
                }
                .hover-desc {
                  position: static;
                  min-width: auto;
                  opacity: 1;
                  padding-top: 0;
                  pointer-events: auto;
                  user-select: auto;
                
                  .inner {
                    background: none;
                    padding: 0;
                    color: #777;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5em;
                
                    &::before {
                      display: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// 미디어(Media) 스타일
export const StyledMedia = styled.div`
  .media-tab-navi {
    ${global.flex.aline};
    li {
      ${global.text.pc_title_md};
      color: ${palette.text.lightly};
      margin-right: 45px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: ${palette.text.primary};
      }
    }
  }
  .tab-content {
    ${global.flex.flex};
    height: 520px;
    margin-top: ${global.margin.pc.sm};
    .left-swiper {
      width: 42%;
      .swiper.media-swiper {
        height: 100%;
        .swiper-slide {
          border-radius: 25px;
          overflow: hidden;
          img {
            height: 100%;
            object-fit: cover;
          }
        }
      }
      
    }
    .right-scroll {
      width: 58%;
      padding: 35px 70px;
      overflow-y: auto;
      ul {
        li {
          margin-bottom: 40px;
          a {
            display: block;
            width: 100%;
            ${global.flex.aline};
            &:hover {
              h4 {
                &::before {
                  display: block;
                }
              }
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
          h3 {
            ${global.text.pc_text_md_bold};
            white-space: nowrap;
          }
          h4 {
            position: relative;
            ${global.text.pc_text_md};
            margin-left: 28px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: normal;
            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0.5px;
              background: ${palette.text.primary};
              display: none;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.desktop}) {
    .tab-content {
      display: block;
      height: auto;
      .left-swiper {
        display: none;
      }
      .right-scroll {
        width: 100%;
        padding: 35px 0;
      }
    }
  }
`;

// 비디오(Video) 스타일
export const StyledVideo = styled.div`
  .inner-container {
    .section-title {
      margin-bottom: ${global.margin.pc.sm};
    }
  }
  .youtube-content {
    ${global.flex.between};
    .item-wrap {
      flex: 1;
      margin-right: 60px;
      &:last-child {
        margin-right: 0;
      }
      .iframe-wrap {
        position: relative;
        height: 0;
        padding-bottom: 55.7%;
        overflow: hidden;
        >div {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        margin-top: 20px;
        ${global.text.pc_text_md};
        line-height: normal;
      }
    }
  }
  // 비디오(Video) 반응형 스타일
  @media screen and (max-width: ${palette.screen.desktop}) {
    .youtube-content {
      .item-wrap {
        margin-right: 30px;
        h2 {
          margin-top: 12px;
          font-size: 19px;
          line-height: 25px;
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.tablet}) {
    .youtube-content {
      display: block;
      .item-wrap {
        margin-right: 0;
        margin-bottom: ${global.margin.mo.md};
        &:last-child {
          margin-bottom: 0;
        }
        h2 {
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .inner-container {
      .section-title {
        margin-bottom: ${global.margin.mo.md};
      }
    }
    .youtube-content {
      .item-wrap {
        margin-bottom: ${global.margin.mo.sm};
        h2 {
          ${global.text.mo_text_sm_bold};
        }
      }
    }
  }
`;

// 컴퍼니(Company) 스타일
export const StyledCompany = styled.div`
  .inner-container {
    .section-title {
      text-align: center;
      .sub-title {
        margin-top: ${global.margin.pc.sm};
        margin-bottom: ${global.margin.pc.md};
        h2 {
          ${global.text.pc_text_lg};
        }
      }
    }
    .ceo-info {
      text-align: center;
      h1 {
        display: inline-block;
        ${global.text.pc_title_sm_en};
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          margin-top: 10px;
          background: ${palette.text.lightly};
        }
      }
      .ceo-content {
        ${global.flex.justify};
        margin-top: ${global.margin.pc.sm};
        .ceo-image {
          width: 370px;
          border-radius: 10px;
          overflow: hidden;
          h3 {
            display: none;
          }
        }
        .ceo-description {
          align-self: flex-end;
          margin-left: 40px;
          text-align: justify;
          h2 {
            ${global.text.pc_text_md_bold};
          }
          .ceo-education {
            margin: 22px 0;
            p {
              ${global.text.pc_text_sm};
            }
          }
          .ceo-thesis {
            li {
              ${global.flex.flex};
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              .tit {
                font-size: 10px;
                font-weight: 500;
                color: #777;
                padding: 4px 10px;
                border: 1px solid ${palette.border.primary};
                border-radius: 10px;
                align-self: flex-start;
                margin-right: 8px;
              }
              .text {
                font-size: 14px;
                font-weight: 400;
                color: ${palette.text.secondary};
                line-height: 21px;
              }
            }
          }
        }
      }
    }
    .ideal-talent-info {
      margin: ${global.margin.pc.md} 0;
      text-align: center;
      h1 {
        display: inline-block;
        ${global.text.pc_title_sm_en};
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          margin-top: 10px;
          background: ${palette.text.lightly};
        }
      }
      .ideal-talent-content {
        width: 70%;
        margin: 0 auto;
        margin-top: ${global.margin.pc.sm};
        ${global.flex.around};
        li {
          ${global.flex.justify};
          flex-direction: column;
          flex: 1;
          .icon-image {
            width: 80px;
          }
          h2 {
            ${global.text.pc_text_md_bold};
            margin: 20px 0;
          }
          p {
            ${global.text.pc_text_sm};
          }
        }
      }
    }
    .work-life-info {
      text-align: center;
      h1 {
        display: inline-block;
        ${global.text.pc_title_sm_en};
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          margin-top: 10px;
          background: ${palette.text.lightly};
        }
      }
      >h2 {
        ${global.text.pc_title_sm};
        margin-top: ${global.margin.pc.sm};
        margin-bottom: 35px;
      }
      .work-life-content {
        ${global.flex.justify};
        text-align: justify;
        >div {
          &:last-child {
            margin-left: 100px;
          }
          h2 {
            ${global.text.pc_text_md_bold};
            margin-bottom: 20px;
          }
          ul {
            li {
              ${global.text.pc_text_sm};
              list-style: disc;
              list-style-position: inside;
              margin-bottom: 6px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  // 컴퍼니(Company) 반응형 스타일
  @media screen and (max-width: ${palette.screen.tablet}) {
    .inner-container {
      .section-title {
        .sub-title {
          margin-top: ${global.margin.mo.md};
        }
      }
      .ceo-info {
        h1 {
          font-size: 26px;
        }
        .ceo-content {
          align-items: baseline;
          margin-top: ${global.margin.mo.md};
          .ceo-image {
            flex-shrink: 0;
            width: 320px;
          }
          .ceo-description {
            margin-left: 20px;
            .ceo-education {
              p {
                font-size: 15px;
              }
            }
            .ceo-thesis {
              li {
                ${global.flex.flex};
                margin-bottom: 15px;
                word-break: break-all;
                .tit {
                  white-space: nowrap;
                  margin-right: 5px;
                }
                .text {
                }
              }
            }
          }
        }
      }
      .ideal-talent-info {
        h1 {
          font-size: 26px;
        }
        .ideal-talent-content {
          width: 100%;
          margin: 0;
          margin-top: ${global.margin.mo.md};
          li {
            .icon-image {
              width: 68px;
            }
            h2 {
              font-size: 20px;
            }
            p {
              ${global.text.mo_text_sm};
            }
          }
        }
      }
      .work-life-info {
        h1 {
          font-size: 26px;
        }
        >h2 {
          font-size: 26px;
          margin-top: ${global.margin.mo.md};
        }
        .work-life-content {
          >div {
            &:last-child {
              margin-left: 60px;
            }
            h2 {
              ${global.text.mo_title_md_kr};
            }
            ul {
              li {
                ${global.text.mo_text_sm};
                margin-bottom: 4px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: ${palette.screen.mobile}) {
    .inner-container {
      padding: 0 22px;
      .section-title {
        .sub-title {
          margin-top: ${global.margin.mo.sm};
          margin-bottom: ${global.margin.mo.md};
          h2 {
            ${global.text.mo_title_md_kr};
          }
        }
      }
      .ceo-info {
        h1 {
          ${global.text.mo_title_md2_en};
          &::after {
            margin-top: 2px;
          }
        }
        .ceo-content {
          display: block;
          margin-top: ${global.margin.mo.sm};
          .ceo-image {
            position: relative;
            width: 100%;
            border-radius: 0;
            h3 {
              position: absolute;
              left: 16px;
              bottom: 5px;
              display: block;
              ${global.text.mo_text_md};
              color: #fff;
            }
          }
          .ceo-description {
            text-align: center;
            margin-left: 0;
            h2 {
              display: none;
            }
            .ceo-education {
              margin: ${global.margin.mo.sm} 0;
              p {
                ${global.text.mo_text_sm};
                margin-bottom: 8px;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
            .ceo-thesis {
              li {
                display: block;
                margin-bottom: 15px;
                .tit {
                  display: inline-block;
                  margin-right: 0;
                  margin-bottom: 5px;
                }
                .text {
                  ${global.text.mo_caption_light};
                }
              }
            }
          }
        }
      }
      .ideal-talent-info {
        margin-top: ${global.margin.mo.md};
        h1 {
          ${global.text.mo_title_md2_kr};
          &::after {
            margin-top: 2px;
          }
        }
        .ideal-talent-content {
          display: block;
          margin-top: ${global.margin.mo.md};
          li {
            margin-bottom: ${global.margin.mo.md};
            &:last-child {
              margin-bottom: 0;
            }
            .icon-image {
              width: 80px;
            }
            h2 {
              margin: 10px 0;
              ${global.text.mo_title_md_kr};
            }
          }
        }
      }
      .work-life-info {
        h1 {
          ${global.text.mo_title_md2_en};
          &::after {
            margin-top: 2px;
          }
        }
        >h2 {
          ${global.text.mo_title_md2_kr};
          margin-top: ${global.margin.mo.sm};
        }
        .work-life-content {
          display: block;
          text-align: center;
          >div {
            margin-bottom: ${global.margin.mo.md};
            &:last-child {
              margin: 0;
            }
            h2 {
              margin-bottom: 8px;
            }
            ul {
              li {
                list-style: none;
              }
            }
          }
        }
      }
    }
  }
  .company-image {
  }
`;