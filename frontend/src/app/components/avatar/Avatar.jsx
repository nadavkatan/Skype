import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export default function BadgeAvatars({
  avatarDimensions,
  imgSrc,
  loggedIn,
  noBadge,
}) {
  return (
    <Stack direction="row" spacing={2}>
      {noBadge ? (
        <Avatar alt="Avatar" src={imgSrc} style={avatarDimensions} />
      ) : (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color={loggedIn ? "success" : "error"}
        >
          <Avatar alt="Avatar" src={imgSrc} style={avatarDimensions} />
        </StyledBadge>
      )}
    </Stack>
  );
}
