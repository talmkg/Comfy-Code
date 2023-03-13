import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import React from "react";
export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    display: "none",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1F1D2D",
    border: "1px solid rgba(255, 255, 255, 0.192)",
  },
}));
