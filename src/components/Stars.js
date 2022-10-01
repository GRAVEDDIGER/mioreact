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
  @media (max-width: 1000px) {
    justify-content: center;
    text-align: center;
  }
`;
function Stars({ color, firebaseStars }) {
  let analizeStars = [];
  let [stars, fraction] = firebaseStars.split(".");
  fraction = fraction || "0";
  for (let i = 0; i < parseInt(stars); i++) {
    analizeStars = [...analizeStars, true];
  }
  if (parseInt(fraction) > 0) {
    analizeStars = [...analizeStars, false];
  }
  return (
    <StarsContainer>
      <StarsWraper>
        {analizeStars.map((mappedStar) => {
          if (mappedStar) {
            return <StarIcon key={uuid()} style={{ fill: color }} />;
          } else return <StarHalfIcon key={uuid()} style={{ color: color }} />;
        })}
      </StarsWraper>
      {`${stars}.${fraction}`}
    </StarsContainer>
  );
}

export default Stars;
