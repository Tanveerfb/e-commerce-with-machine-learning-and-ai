"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  Avatar,
  Rating,
  Link as MuiLink
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';

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
} from 'chart.js';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), { ssr: false });
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), { ssr: false });

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
  Filler
);

// --- MOCK DATA: Forecast ---
const kpiData = [
  { title: 'Total Sales', value: '$124,500', trend: '+12.5%', isUp: true, icon: <AttachMoneyIcon sx={{ color: '#10b981' }} />, color: 'rgba(16, 185, 129, 0.1)' },
  { title: 'Forecasted Sales', value: '$142,000', trend: '+14.0%', isUp: true, icon: <ShowChartIcon sx={{ color: '#8b5cf6' }} />, color: 'rgba(139, 92, 246, 0.1)' },
  { title: 'Growth Rate', value: '14.5%', trend: '+2.1%', isUp: true, icon: <TrendingUpIcon sx={{ color: '#0ea5e9' }} />, color: 'rgba(14, 165, 233, 0.1)' },
  { title: 'Best Product', value: 'Quantum Head...', trend: 'Leading', isUp: true, icon: <Inventory2Icon sx={{ color: '#f59e0b' }} />, color: 'rgba(245, 158, 11, 0.1)' },
  { title: 'Low Category', value: 'Accessories', trend: '-3.0%', isUp: false, icon: <WarningAmberIcon sx={{ color: '#ef4444' }} />, color: 'rgba(239, 68, 68, 0.1)' },
];

const insights = [
  { type: 'positive', text: 'Sales are expected to increase by 14.5% next quarter.', icon: <TrendingUpIcon color="success" /> },
  { type: 'positive', text: 'Electronics category is the strongest performer, contributing 45% of total revenue.', icon: <CheckCircleIcon color="success" /> },
  { type: 'warning', text: 'Office Accessories sales are projected to dip by 3%; consider promotional discounts.', icon: <WarningAmberIcon color="warning" /> },
  { type: 'info', text: 'New "Quantum Headphones" show a 22% higher adoption rate than forecasted.', icon: <LightbulbIcon color="info" /> },
];

const topProducts = [
  { id: 1, name: 'Quantum Headphones', current: '$24,500', forecast: '$32,000', trend: 'up', category: 'Electronics', performance: 'Excellent' },
  { id: 2, name: 'ErgoPro Chair', current: '$18,200', forecast: '$19,500', trend: 'up', category: 'Furniture', performance: 'Good' },
  { id: 3, name: 'Mechanical Keyboard X', current: '$15,000', forecast: '$14,200', trend: 'down', category: 'Electronics', performance: 'Needs Attention' },
  { id: 4, name: 'Desk Organizer', current: '$3,200', forecast: '$2,800', trend: 'down', category: 'Accessories', performance: 'Poor' },
];

const forecastChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Historical Sales',
      data: [12000, 15000, 14000, 18000, 16000, 20000, 22000, 21000, null, null, null, null],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Forecasted Sales',
      data: [null, null, null, null, null, null, null, 21000, 24000, 26000, 29000, 31000],
      borderColor: '#9c27b0',
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      tension: 0.4,
      pointBackgroundColor: '#9c27b0',
    }
  ]
};

const categoryBarData = {
  labels: ['Electronics', 'Furniture', 'Accessories', 'Apparel', 'Home Goods'],
  datasets: [
    {
      label: 'Current Quarter',
      data: [45000, 28000, 15000, 22000, 18000],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderRadius: 4,
    },
    {
      label: 'Forecasted (Next Q)',
      data: [52000, 30000, 14000, 25000, 19000],
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderRadius: 4,
    }
  ]
};

const distributionData = {
  labels: ['Online Store', 'Retail Partners', 'Direct B2B', 'Other'],
  datasets: [
    {
      data: [55, 25, 15, 5],
      backgroundColor: [
        'rgba(25, 118, 210, 0.9)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(237, 108, 2, 0.9)',
        'rgba(46, 125, 50, 0.9)',
      ],
      borderWidth: 0,
      hoverOffset: 4,
    }
  ]
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
        { rating: 4, comment: "Great, but a bit pricey." }
      ],
      stock: 350
    },
    {
      id: "PROD-205",
      name: "ErgoPro Office Chair",
      details: ["Lumbar Support", "Adjustable Armrests", "Breathable Mesh"],
      price: 199.00,
      itemsSold: 850,
      productUrl: "/products/PROD-205",
      reviews: [
        { rating: 5, comment: "Saved my back during long work hours." },
        { rating: 3, comment: "Assembly was slightly difficult." }
      ],
      stock: 120
    },
    {
      id: "PROD-310",
      name: "Mechanical Keyboard X",
      details: ["Cherry MX Red", "RGB Backlight", "Tenkeyless"],
      price: 129.50,
      itemsSold: 2100,
      productUrl: "/products/PROD-310",
      reviews: [
        { rating: 5, comment: "Amazing switches and build quality." },
        { rating: 4, comment: "Software for RGB could be better." }
      ],
      stock: 800
    }
  ],
  salesTrends: {
    day: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [15, 22, 18, 30, 25, 45, 40]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [450, 520, 480, 610]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [3200, 3100, 3500, 4100, 3800, 4500, 4800, 5100, 4900, 5300, 6000, 7200]
    }
  }
};

export default function SalesDashboardPage() {
  const theme = useTheme();

  // Forecast states
  const [forecastTimeframe, setForecastTimeframe] = useState<'month' | 'quarter' | 'year'>('year');
  const handleForecastTimeframeChange = (e: React.MouseEvent<HTMLElement>, val: any) => {
    if (val !== null) setForecastTimeframe(val);
  };

  // Seller Dashboard states
  const [sellerTimeframe, setSellerTimeframe] = useState<'day' | 'month' | 'year'>('month');
  const handleSellerTimeframeChange = (e: React.MouseEvent<HTMLElement>, val: any) => {
    if (val !== null) setSellerTimeframe(val);
  };

  const cardStyle = {
    height: '100%',
    borderRadius: 4,
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.03)',
    border: '1px solid',
    borderColor: 'divider',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px 0 rgba(0,0,0,0.08)',
    }
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { usePointStyle: true, boxWidth: 8 } },
    },
    scales: {
      y: { grid: { borderDash: [4, 4], color: theme.palette.divider } },
      x: { grid: { display: false } }
    }
  };

  // Seller Line Chart Data
  const sellerLineChartData = {
    labels: sellerData.salesTrends[sellerTimeframe].labels,
    datasets: [
      {
        label: `Sales (${sellerTimeframe})`,
        data: sellerData.salesTrends[sellerTimeframe].data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Seller Pie Chart Data
  const sellerPieChartData = {
    labels: sellerData.products.map(p => p.name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: sellerData.products.map(p => p.stock),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto', mt: { xs: 8, md: 10 } }}>
      {/* Global Header */}
      <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 5, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #1976d2, #9c27b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sales Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Predictive analytics and current inventory performance
          </Typography>
        </Box>
        <Tooltip title="Export Report">
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}>
            Export Full Report
          </Button>
        </Tooltip>
      </Stack>

      {/* =====================================
          SECTION 1: SALES FORECAST OVERVIEW
      ===================================== */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon color="primary" /> Sales Forecast Overview
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiData.map((kpi, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
            <Card sx={cardStyle}>
              <CardContent>
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ bgcolor: kpi.color, width: 40, height: 40 }}>
                    {kpi.icon}
                  </Avatar>
                  <Chip 
                    label={kpi.trend} 
                    size="small" 
                    color={kpi.isUp ? "success" : "error"} 
                    icon={kpi.isUp ? <TrendingUpIcon /> : <TrendingDownIcon />} 
                    sx={{ fontWeight: 600, borderRadius: 1 }}
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
                  {kpi.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
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
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShowChartIcon color="primary" /> Historical vs Forecasted Sales
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={forecastTimeframe}
                  exclusive
                  onChange={handleForecastTimeframeChange}
                  size="small"
                >
                  <ToggleButton value="month" sx={{ px: 2 }}>Month</ToggleButton>
                  <ToggleButton value="quarter" sx={{ px: 2 }}>Quarter</ToggleButton>
                  <ToggleButton value="year" sx={{ px: 2 }}>Year</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Box sx={{ height: 350 }}>
                <Line 
                  data={forecastChartData} 
                  options={{
                    ...commonChartOptions,
                    interaction: { mode: 'index', intersect: false },
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssessmentIcon color="primary" /> Sales Distribution
              </Typography>
              <Box sx={{ height: 350, display: 'flex', justifyContent: 'center' }}>
                <Doughnut 
                  data={distributionData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' as const } },
                    cutout: '70%'
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
          <Card sx={{ ...cardStyle, bgcolor: 'primary.50' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LightbulbIcon color="primary" /> Key Insights
              </Typography>
              <Stack sx={{ gap: 2.5 }}>
                {insights.map((insight, index) => (
                  <Stack key={index} sx={{ flexDirection: 'row', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ mt: 0.5 }}>{insight.icon}</Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>
                      {insight.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Summary: Based on current trends and seasonal factors, Q3 is expected to outperform previous quarters significantly.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Inventory2Icon color="primary" /> Category Performance Forecast
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={categoryBarData} 
                  options={{
                    ...commonChartOptions,
                    interaction: { mode: 'index', intersect: false },
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
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Top Products Forecast</Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="forecast table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Current Sales</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Forecasted Sales</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Trend</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                        <TableCell><Chip label={product.category} size="small" variant="outlined" /></TableCell>
                        <TableCell align="right">{product.current}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.main' }}>{product.forecast}</TableCell>
                        <TableCell align="center">
                          {product.trend === 'up' ? <TrendingUpIcon color="success" fontSize="small" /> : <TrendingDownIcon color="error" fontSize="small" />}
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={product.performance} 
                            size="small" 
                            color={product.performance === 'Excellent' ? 'success' : product.performance === 'Good' ? 'primary' : product.performance === 'Needs Attention' ? 'warning' : 'error'} 
                            sx={{ borderRadius: 1, minWidth: 100 }}
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
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Inventory2Icon color="primary" /> Seller Inventory & Performance
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Seller ID: {sellerData.sellerId} | {sellerData.name}
        </Typography>
      </Stack>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Sales Chart Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Sales Trends</Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={sellerTimeframe}
                  exclusive
                  onChange={handleSellerTimeframeChange}
                  size="small"
                >
                  <ToggleButton value="day">Day</ToggleButton>
                  <ToggleButton value="month">Month</ToggleButton>
                  <ToggleButton value="year">Year</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={sellerLineChartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' as const },
                      title: { display: false }
                    }
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
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Stock Visualization</Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <Pie 
                  data={sellerPieChartData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' as const }
                    }
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
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Product Catalog</Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="products table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Sold</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reviews</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>URL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sellerData.products.map((product) => (
                      <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {product.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 0.5 }}>
                            {product.details.map((detail, index) => (
                              <Chip key={index} label={detail} size="small" variant="outlined" />
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                        <TableCell align="right">{product.itemsSold.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={product.stock} 
                            color={product.stock < 200 ? 'warning' : 'success'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Stack sx={{ minWidth: 120 }}>
                            {product.reviews.slice(0, 1).map((review, i) => (
                              <Box key={i}>
                                <Stack sx={{ flexDirection: 'row', alignItems: 'center', mb: 0.5 }}>
                                  <Rating value={review.rating} readOnly size="small" />
                                </Stack>
                                <Typography variant="caption" sx={{ display: 'block', fontStyle: 'italic', color: 'text.secondary' }}>
                                  &quot;{review.comment}&quot;
                                </Typography>
                              </Box>
                            ))}
                            {product.reviews.length > 1 && (
                              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', mt: 0.5 }}>
                                + {product.reviews.length - 1} more
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <MuiLink component={Link} href={product.productUrl} underline="hover" color="primary">
                            View
                          </MuiLink>
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
  );
}
