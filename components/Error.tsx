import styled from "@emotion/styled";

export const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 12px;
  text-align: left;
  &::before {
    display: inline-block;
    margin-right: 4px;
    font-size: 14px;
    line-height: 1;
    content: "*";
  }
`;
