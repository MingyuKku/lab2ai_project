import styled from "styled-components/macro";
import { global } from "../global";
import palette from "../palette";

export const StyledDropDown = styled.div`
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .box {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        padding: 4px 0;
        background-color: #fff;
        ${global.shadow.default};
        .locale-item {
            ${global.flex.aline};
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 8px;
            padding-right: 22px;
            cursor: pointer;
            .check-icon {
                width: 18px;
                svg {
                    display: block;
                }
            }
            .text {
                color: #000;
                font-weight: 400;
                font-size: 14px;
                margin-left: 4px;
                &.active {
                    font-weight: 500;
                    color: ${palette.text.error};
                }
            }
        }
    }
`;