import styled from "@emotion/styled";

export const MUList = styled.ul({
  listStyleType: "none",
  padding:0,
  margin:0
});
export const MUListItem = styled.li({
    
  "&:before": {
    content: "'-'",
    float: 'left',
  },
});
