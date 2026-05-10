"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
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
  Rating,
  Link as MuiLink,
  Stack,
  Grid
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dynamic from 'next/dynamic';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), { ssr: false });

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data
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

export default function SellerDashboard() {
  const [timeframe, setTimeframe] = useState<'day' | 'month' | 'year'>('month');

  const handleTimeframeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeframe: 'day' | 'month' | 'year' | null,
  ) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe);
    }
  };

  // Line Chart Data for Sales
  const lineChartData = {
    labels: sellerData.salesTrends[timeframe].labels,
    datasets: [
      {
        label: `Sales (${timeframe})`,
        data: sellerData.salesTrends[timeframe].data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Pie Chart Data for Stock
  const pieChartData = {
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
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Stack sx={{ mb: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Seller Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Seller ID: {sellerData.sellerId} | {sellerData.name}
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        {/* Sales Chart Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Sales Trends</Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={timeframe}
                  exclusive
                  onChange={handleTimeframeChange}
                  aria-label="Sales Timeframe"
                  size="small"
                >
                  <ToggleButton value="day">Day</ToggleButton>
                  <ToggleButton value="month">Month</ToggleButton>
                  <ToggleButton value="year">Year</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={lineChartData} 
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
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Stock Visualization</Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <Pie 
                  data={pieChartData} 
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

        {/* Products Table */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Product Catalog</Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
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
                      <TableRow
                        key={product.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
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
