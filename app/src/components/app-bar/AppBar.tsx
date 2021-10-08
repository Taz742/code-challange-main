import React, { memo } from "react";
import { Box, Container, Toolbar, Typography, AppBar } from "@mui/material";

export const DocumentsAppBar = memo(() => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{
          height: 210,
          background: "#fff",
        }}
      >
        <Container sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Toolbar>
            <Typography variant="h4" noWrap>
              Documents List
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});
