import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import uuid from "react-uuid";
const StarsWraper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5em;
  margin-right: 0;
`;
const StarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: bold;
  text-align: end;
`;
function Stars({ stars, fraction }) {
  let estrellas = [];
  for (let i = 0; i < parseInt(stars); i++) {
    estrellas = [...estrellas, true];
  }
  if (fraction > 0) {
    estrellas = [...estrellas, false];
  }
  return (
    <StarsContainer>
      <StarsWraper>
        {estrellas.map((estrella) => {
          if (estrella) {
            return <StarIcon key={uuid()} />;
          } else return <StarHalfIcon key={uuid()} />;
        })}
      </StarsWraper>
      {`${stars}.${fraction}`}
    </StarsContainer>
  );
}

export default Stars;
