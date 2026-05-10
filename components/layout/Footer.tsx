"use client";

import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footerSections = [
  {
    title: "Shop",
    links: ["Products", "Categories", "Deals", "New Arrivals"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Returns", "Track Order"],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        py: { xs: 6, md: 8 },
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <StorefrontIcon sx={{ color: "primary.light" }} />
              <Typography
                variant="h6"
                color="primary.light"
                sx={{ fontWeight: 700 }}
              >
                Truqorun
              </Typography>
            </Stack>
            <Typography variant="body2" color="grey.400" sx={{ maxWidth: 280 }}>
              Discover curated products powered by machine learning
              recommendations, tailored just for you.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                size="small"
                aria-label="GitHub"
                sx={{ color: "grey.400" }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Twitter"
                sx={{ color: "grey.400" }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="LinkedIn"
                sx={{ color: "grey.400" }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Nav columns */}
          {footerSections.map((section) => (
            <Grid key={section.title} size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography
                variant="overline"
                color="grey.100"
                sx={{ fontWeight: 700, display: "block", mb: 1.5 }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((label) => (
                  <Link
                    key={label}
                    href="#"
                    underline="hover"
                    variant="body2"
                    color="grey.400"
                    sx={{ "&:hover": { color: "grey.100" } }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "grey.800", my: 4 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Truqorun. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="hover" variant="body2" color="grey.500">
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" variant="body2" color="grey.500">
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
