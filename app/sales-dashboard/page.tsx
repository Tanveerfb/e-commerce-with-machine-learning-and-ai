"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  Divider,
  useTheme,
  Avatar,
  Rating,
  alpha,
  Fade,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useSellerAuth } from "@/contexts/SellerAuthContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import dynamic from "next/dynamic";
import SellerGuard from "@/components/seller/SellerGuard";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  { ssr: false },
);
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
);

// --- MOCK DATA: Forecast ---
const kpiData = [
  {
    title: "Total Sales",
    value: "$124,500",
    trend: "+12.5%",
    isUp: true,
    icon: <AttachMoneyIcon sx={{ color: "#10b981" }} />,
    color: "rgba(16, 185, 129, 0.1)",
  },
  {
    title: "Forecasted Sales",
    value: "$142,000",
    trend: "+14.0%",
    isUp: true,
    icon: <ShowChartIcon sx={{ color: "#8b5cf6" }} />,
    color: "rgba(139, 92, 246, 0.1)",
  },
  {
    title: "Growth Rate",
    value: "14.5%",
    trend: "+2.1%",
    isUp: true,
    icon: <TrendingUpIcon sx={{ color: "#0ea5e9" }} />,
    color: "rgba(14, 165, 233, 0.1)",
  },
  {
    title: "Best Product",
    value: "Quantum Head...",
    trend: "Leading",
    isUp: true,
    icon: <Inventory2Icon sx={{ color: "#f59e0b" }} />,
    color: "rgba(245, 158, 11, 0.1)",
  },
  {
    title: "Low Category",
    value: "Accessories",
    trend: "-3.0%",
    isUp: false,
    icon: <WarningAmberIcon sx={{ color: "#ef4444" }} />,
    color: "rgba(239, 68, 68, 0.1)",
  },
];

const insights = [
  {
    type: "positive",
    text: "Sales are expected to increase by 14.5% next quarter.",
    icon: <TrendingUpIcon color="success" />,
  },
  {
    type: "positive",
    text: "Electronics category is the strongest performer, contributing 45% of total revenue.",
    icon: <CheckCircleIcon color="success" />,
  },
  {
    type: "warning",
    text: "Office Accessories sales are projected to dip by 3%; consider promotional discounts.",
    icon: <WarningAmberIcon color="warning" />,
  },
  {
    type: "info",
    text: 'New "Quantum Headphones" show a 22% higher adoption rate than forecasted.',
    icon: <LightbulbIcon color="info" />,
  },
];

const topProducts = [
  {
    id: 1,
    name: "Quantum Headphones",
    current: "$24,500",
    forecast: "$32,000",
    trend: "up",
    category: "Electronics",
    performance: "Excellent",
  },
  {
    id: 2,
    name: "ErgoPro Chair",
    current: "$18,200",
    forecast: "$19,500",
    trend: "up",
    category: "Furniture",
    performance: "Good",
  },
  {
    id: 3,
    name: "Mechanical Keyboard X",
    current: "$15,000",
    forecast: "$14,200",
    trend: "down",
    category: "Electronics",
    performance: "Needs Attention",
  },
  {
    id: 4,
    name: "Desk Organizer",
    current: "$3,200",
    forecast: "$2,800",
    trend: "down",
    category: "Accessories",
    performance: "Poor",
  },
];

const forecastChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Historical Sales",
      data: [
        12000,
        15000,
        14000,
        18000,
        16000,
        20000,
        22000,
        21000,
        null,
        null,
        null,
        null,
      ],
      borderColor: "#1976d2",
      backgroundColor: "rgba(25, 118, 210, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Forecasted Sales",
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        21000,
        24000,
        26000,
        29000,
        31000,
      ],
      borderColor: "#9c27b0",
      backgroundColor: "transparent",
      borderDash: [5, 5],
      tension: 0.4,
      pointBackgroundColor: "#9c27b0",
    },
  ],
};

const categoryBarData = {
  labels: ["Electronics", "Furniture", "Accessories", "Apparel", "Home Goods"],
  datasets: [
    {
      label: "Current Quarter",
      data: [45000, 28000, 15000, 22000, 18000],
      backgroundColor: "rgba(54, 162, 235, 0.8)",
      borderRadius: 4,
    },
    {
      label: "Forecasted (Next Q)",
      data: [52000, 30000, 14000, 25000, 19000],
      backgroundColor: "rgba(153, 102, 255, 0.8)",
      borderRadius: 4,
    },
  ],
};

const distributionData = {
  labels: ["Online Store", "Retail Partners", "Direct B2B", "Other"],
  datasets: [
    {
      data: [55, 25, 15, 5],
      backgroundColor: [
        "rgba(25, 118, 210, 0.9)",
        "rgba(156, 39, 176, 0.9)",
        "rgba(237, 108, 2, 0.9)",
        "rgba(46, 125, 50, 0.9)",
      ],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

// --- MOCK DATA: Seller Dashboard ---
const sellerData = {
  sellerId: "SEL-98234A",
  name: "TechNova Electronics",
  products: [
    {
      id: "PROD-101",
      name: "Quantum Noise-Cancelling Headphones",
      details: ["Active Noise Cancellation", "40h Battery", "Bluetooth 5.3"],
      price: 249.99,
      itemsSold: 1240,
      productUrl: "/products/PROD-101",
      reviews: [
        { rating: 5, comment: "Incredible sound and comfort." },
        { rating: 4, comment: "Great, but a bit pricey." },
      ],
      stock: 350,
    },
    {
      id: "PROD-205",
      name: "ErgoPro Office Chair",
      details: ["Lumbar Support", "Adjustable Armrests", "Breathable Mesh"],
      price: 199.0,
      itemsSold: 850,
      productUrl: "/products/PROD-205",
      reviews: [
        { rating: 5, comment: "Saved my back during long work hours." },
        { rating: 3, comment: "Assembly was slightly difficult." },
      ],
      stock: 120,
    },
    {
      id: "PROD-310",
      name: "Mechanical Keyboard X",
      details: ["Cherry MX Red", "RGB Backlight", "Tenkeyless"],
      price: 129.5,
      itemsSold: 2100,
      productUrl: "/products/PROD-310",
      reviews: [
        { rating: 5, comment: "Amazing switches and build quality." },
        { rating: 4, comment: "Software for RGB could be better." },
      ],
      stock: 800,
    },
  ],
  salesTrends: {
    day: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [15, 22, 18, 30, 25, 45, 40],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [450, 520, 480, 610],
    },
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        3200, 3100, 3500, 4100, 3800, 4500, 4800, 5100, 4900, 5300, 6000, 7200,
      ],
    },
  },
};

export default function SalesDashboardPage() {
  const theme = useTheme();
  const { sellerLogout } = useSellerAuth();

  // Forecast states
  const [forecastTimeframe, setForecastTimeframe] = useState<
    "month" | "quarter" | "year"
  >("year");
  const handleForecastTimeframeChange = (
    _e: React.MouseEvent<HTMLElement>,
    val: "month" | "quarter" | "year" | null,
  ) => {
    if (val !== null) setForecastTimeframe(val);
  };

  // Seller Dashboard states
  const [sellerTimeframe, setSellerTimeframe] = useState<
    "day" | "month" | "year"
  >("month");
  const handleSellerTimeframeChange = (
    _e: React.MouseEvent<HTMLElement>,
    val: "day" | "month" | "year" | null,
  ) => {
    if (val !== null) setSellerTimeframe(val);
  };

  const cardStyle = {
    height: "100%",
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.04)",
    border: "1px solid",
    borderColor: "divider",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
      borderColor: "primary.light",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "linear-gradient(90deg, #1976d2, #9c27b0)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
      opacity: 1,
    },
  };

  const getKpiCardStyle = (color: string) => ({
    ...cardStyle,
    background: `linear-gradient(145deg, #ffffff 60%, ${color} 140%)`,
    "&::before": {
      display: "none",
    },
  });

  const modernToggleStyle = {
    p: 0.5,
    bgcolor: (theme: { palette: { action: { hover: string } } }) =>
      alpha(theme.palette.action.hover, 0.5),
    borderRadius: "12px !important",
    "& .MuiToggleButton-root": {
      border: "none",
      borderRadius: "8px !important",
      mx: 0.5,
      px: 2,
      py: 0.5,
      textTransform: "none",
      fontWeight: 600,
      color: "text.secondary",
      "&.Mui-selected": {
        bgcolor: "background.paper",
        color: "primary.main",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          bgcolor: "background.paper",
        },
      },
    },
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { usePointStyle: true, boxWidth: 8 },
      },
    },
    scales: {
      y: { grid: { borderDash: [4, 4], color: theme.palette.divider } },
      x: { grid: { display: false } },
    },
  };

  // Seller Line Chart Data
  const sellerLineChartData = {
    labels: sellerData.salesTrends[sellerTimeframe].labels,
    datasets: [
      {
        label: `Sales (${sellerTimeframe})`,
        data: sellerData.salesTrends[sellerTimeframe].data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Seller Pie Chart Data
  const sellerPieChartData = {
    labels: sellerData.products.map((p) => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: sellerData.products.map((p) => p.stock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SellerGuard>
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            maxWidth: 1400,
            mx: "auto",
            mt: { xs: 8, md: 10 },
          }}
        >
          {/* Global Header */}
          <Box
            sx={{
              position: "relative",
              mb: 6,
              p: 4,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(156,39,176,0.1) 0%, rgba(255,255,255,0) 70%)",
                zIndex: 0,
              }}
            />
            <Stack
              sx={{
                position: "relative",
                zIndex: 1,
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    background: "linear-gradient(45deg, #1976d2, #9c27b0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Sales Dashboard
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", fontWeight: 500 }}
                >
                  Predictive analytics and real-time inventory performance
                </Typography>
              </Box>
              <Stack
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                <Chip
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "success.main",
                        width: 22,
                        height: 22,
                        fontSize: 12,
                      }}
                    >
                      S
                    </Avatar>
                  }
                  label="Logged in as Seller"
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: 2 }}
                />
                <Tooltip title="Download comprehensive CSV report">
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "0 8px 16px rgba(25, 118, 210, 0.24)",
                      "&:hover": {
                        boxShadow: "0 12px 24px rgba(25, 118, 210, 0.32)",
                      },
                    }}
                  >
                    Export Report
                  </Button>
                </Tooltip>
                <Tooltip title="Sign out of seller dashboard">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={sellerLogout}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Logout
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>

          {/* =====================================
          SECTION 1: SALES FORECAST OVERVIEW
      ===================================== */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TrendingUpIcon color="primary" /> Sales Forecast Overview
          </Typography>

          {/* KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {kpiData.map((kpi, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
                <Card sx={getKpiCardStyle(kpi.color)}>
                  <CardContent>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#ffffff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          width: 48,
                          height: 48,
                        }}
                      >
                        {kpi.icon}
                      </Avatar>
                      <Chip
                        label={kpi.trend}
                        size="small"
                        color={kpi.isUp ? "success" : "error"}
                        icon={
                          kpi.isUp ? <TrendingUpIcon /> : <TrendingDownIcon />
                        }
                        sx={{
                          fontWeight: 700,
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                      />
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        mb: 0.5,
                      }}
                    >
                      {kpi.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: "text.primary",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {kpi.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Main Forecast Charts Area */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <ShowChartIcon color="primary" /> Historical vs Forecasted
                      Sales
                    </Typography>
                    <ToggleButtonGroup
                      value={forecastTimeframe}
                      exclusive
                      onChange={handleForecastTimeframeChange}
                      sx={modernToggleStyle}
                    >
                      <ToggleButton value="month" disableRipple>
                        Month
                      </ToggleButton>
                      <ToggleButton value="quarter" disableRipple>
                        Quarter
                      </ToggleButton>
                      <ToggleButton value="year" disableRipple>
                        Year
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  <Box sx={{ height: 350 }}>
                    <Line
                      data={forecastChartData}
                      options={{
                        ...commonChartOptions,
                        interaction: { mode: "index", intersect: false },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AssessmentIcon color="primary" /> Sales Distribution
                  </Typography>
                  <Box
                    sx={{
                      height: 350,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Doughnut
                      data={distributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: "bottom" as const } },
                        cutout: "70%",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Secondary Charts & Insights Area */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ ...cardStyle, bgcolor: "primary.50" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LightbulbIcon color="primary" /> Key Insights
                  </Typography>
                  <Stack sx={{ gap: 2.5 }}>
                    {insights.map((insight, index) => (
                      <Stack
                        key={index}
                        sx={{
                          flexDirection: "row",
                          gap: 1.5,
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ mt: 0.5 }}>{insight.icon}</Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary", lineHeight: 1.5 }}
                        >
                          {insight.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 3 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontStyle: "italic" }}
                  >
                    Summary: Based on current trends and seasonal factors, Q3 is
                    expected to outperform previous quarters significantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Inventory2Icon color="primary" /> Category Performance
                    Forecast
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={categoryBarData}
                      options={{
                        ...commonChartOptions,
                        interaction: { mode: "index", intersect: false },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Top Products Forecast Table */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12 }}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Top Products Forecast
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: alpha(theme.palette.divider, 0.5),
                      overflow: "hidden",
                    }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="forecast table">
                      <TableHead>
                        <TableRow
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                          }}
                        >
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Product Name
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Category
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Current Sales
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Forecasted Sales
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Trend
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Performance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topProducts.map((product) => (
                          <TableRow
                            key={product.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": { bgcolor: "action.hover" },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontWeight: 500 }}
                            >
                              {product.name}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={product.category}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              {product.current}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: 600, color: "primary.main" }}
                            >
                              {product.forecast}
                            </TableCell>
                            <TableCell align="center">
                              {product.trend === "up" ? (
                                <TrendingUpIcon
                                  color="success"
                                  fontSize="small"
                                />
                              ) : (
                                <TrendingDownIcon
                                  color="error"
                                  fontSize="small"
                                />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={product.performance}
                                size="small"
                                color={
                                  product.performance === "Excellent"
                                    ? "success"
                                    : product.performance === "Good"
                                      ? "primary"
                                      : product.performance ===
                                          "Needs Attention"
                                        ? "warning"
                                        : "error"
                                }
                                sx={{
                                  borderRadius: "8px",
                                  minWidth: 100,
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6 }} />

          {/* =====================================
          SECTION 2: SELLER INVENTORY & DASHBOARD
      ===================================== */}
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 4,
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Inventory2Icon color="primary" sx={{ fontSize: 32 }} /> Seller
              Inventory & Performance
            </Typography>
            <Chip
              label={`Seller: ${sellerData.name} (${sellerData.sellerId})`}
              variant="outlined"
              color="primary"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }}
            />
          </Stack>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Sales Chart Section */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Sales Trends
                    </Typography>
                    <ToggleButtonGroup
                      value={sellerTimeframe}
                      exclusive
                      onChange={handleSellerTimeframeChange}
                      sx={modernToggleStyle}
                    >
                      <ToggleButton value="day" disableRipple>
                        Day
                      </ToggleButton>
                      <ToggleButton value="month" disableRipple>
                        Month
                      </ToggleButton>
                      <ToggleButton value="year" disableRipple>
                        Year
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  <Box sx={{ height: 300 }}>
                    <Line
                      data={sellerLineChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: "top" as const },
                          title: { display: false },
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Stock Pie Chart Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Stock Visualization
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pie
                      data={sellerPieChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: "bottom" as const },
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Products Table */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Product Catalog
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: alpha(theme.palette.divider, 0.5),
                      overflow: "hidden",
                    }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="products table">
                      <TableHead>
                        <TableRow
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                          }}
                        >
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Product Name
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Details
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Sold
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Stock
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Reviews
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: 700, color: "text.secondary" }}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sellerData.products.map((product) => (
                          <TableRow
                            key={product.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": { bgcolor: "action.hover" },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                              >
                                {product.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {product.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {product.details.map((detail, index) => (
                                  <Chip
                                    key={index}
                                    label={detail}
                                    size="small"
                                    sx={{
                                      borderRadius: 1,
                                      bgcolor: alpha(
                                        theme.palette.grey[500],
                                        0.1,
                                      ),
                                      border: "none",
                                    }}
                                  />
                                ))}
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              ${product.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              {product.itemsSold.toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={`${product.stock} in stock`}
                                color={
                                  product.stock < 200 ? "warning" : "success"
                                }
                                size="small"
                                sx={{ fontWeight: 600, borderRadius: "8px" }}
                              />
                            </TableCell>
                            <TableCell>
                              <Stack sx={{ minWidth: 120 }}>
                                {product.reviews
                                  .slice(0, 1)
                                  .map((review, i) => (
                                    <Box key={i}>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          mb: 0.5,
                                        }}
                                      >
                                        <Rating
                                          value={review.rating}
                                          readOnly
                                          size="small"
                                        />
                                      </Stack>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          display: "block",
                                          fontStyle: "italic",
                                          color: "text.secondary",
                                        }}
                                      >
                                        &quot;{review.comment}&quot;
                                      </Typography>
                                    </Box>
                                  ))}
                                {product.reviews.length > 1 && (
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{ cursor: "pointer", mt: 0.5 }}
                                  >
                                    + {product.reviews.length - 1} more
                                  </Typography>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Button
                                component={Link}
                                href={product.productUrl}
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 2, textTransform: "none" }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </SellerGuard>
  );
}
