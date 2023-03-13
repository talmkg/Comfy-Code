import React from "react";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1F1D2D",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1F1D2D",
    border: "1px solid rgba(255, 255, 255, 0.192)",
  },
}));
