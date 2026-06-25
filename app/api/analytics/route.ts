import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Helper function to sign a JWT using Node's native crypto module (RS256)
function signJwt(payload: object, privateKey: string, serviceAccountEmail: string) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${encodedHeader}.${encodedPayload}`);
  
  // Format key correctly (handles escaped newlines from env variables)
  const formattedKey = privateKey.replace(/\\n/g, '\n');
  const signature = sign.sign(formattedKey, 'base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Helper to exchange JWT assertion for a Google API Access Token
async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  
  const assertion = signJwt(payload, privateKey, email);
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${assertion}`
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth failed: ${errorText}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

// Generate dynamic path coords for SVG drawing
function generateSvgPaths(points: { x: number; y: number }[]) {
  if (points.length === 0) return { pathD: '', fillD: '' };
  
  // Build simple straight-line paths
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }
  
  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;
  const fillD = `${pathD} L ${lastX} 185 L ${firstX} 185 Z`;
  
  return { pathD, fillD };
}

// Standard fallback mock dataset matching the initial UI
const MOCK_DATA = {
  isMock: true,
  daily: {
    title: 'Daily Traffic Analytics',
    subtitle: 'User traffic stats tracked across the last 24 hours',
    activeVisitors: 84,
    growth: '+12.4%',
    yLabels: ['2,000', '1,500', '1,000', '0'],
    sparklines: {
      today: { val: '1,842', growth: '+12.4%', path: 'M0 15 Q12 5, 25 12 T50 3', fill: 'M0 15 Q12 5, 25 12 T50 3 L 50 20 L 0 20 Z' },
      week: { val: '9,840', growth: '+8.2%', path: 'M0 18 C10 8, 20 15, 30 5 C40 10, 45 2, 50 4', fill: 'M0 18 C10 8, 20 15, 30 5 C40 10, 45 2, 50 4 L 50 20 L 0 20 Z' },
      month: { val: '38,420', growth: '+15.7%', path: 'M0 14 Q15 2, 30 18 T50 4', fill: 'M0 14 Q15 2, 30 18 T50 4 L 50 20 L 0 20 Z' }
    },
    points: [
      { label: '00:00', value: 142, x: 60, y: 170 },
      { label: '04:00', value: 384, x: 138, y: 145 },
      { label: '08:00', value: 928, x: 216, y: 100 },
      { label: '12:00', value: 1842, x: 294, y: 35 },
      { label: '16:00', value: 1240, x: 372, y: 75 },
      { label: '20:00', value: 680, x: 450, y: 115 }
    ],
    pathD: 'M 60 170 C 90 160, 110 155, 138 145 C 166 135, 190 115, 216 100 C 242 85, 270 50, 294 35 C 318 20, 350 60, 372 75 C 394 90, 420 105, 450 115',
    fillD: 'M 60 170 C 90 160, 110 155, 138 145 C 166 135, 190 115, 216 100 C 242 85, 270 50, 294 35 C 318 20, 350 60, 372 75 C 394 90, 420 105, 450 115 L 450 185 L 60 185 Z'
  },
  weekly: {
    title: 'Weekly Traffic Analytics',
    subtitle: 'User traffic stats tracked across the seven days of the week',
    activeVisitors: 512,
    growth: '+18.7%',
    yLabels: ['3,000', '2,000', '1,000', '0'],
    sparklines: {
      today: { val: '2,140', growth: '+15.2%', path: 'M0 18 Q12 10, 25 8 T50 14', fill: 'M0 18 Q12 10, 25 8 T50 14 L 50 20 L 0 20 Z' },
      week: { val: '14,890', growth: '+18.7%', path: 'M0 12 Q15 2, 30 18 T50 5', fill: 'M0 12 Q15 2, 30 18 T50 5 L 50 20 L 0 20 Z' },
      month: { val: '46,120', growth: '+22.3%', path: 'M0 10 Q12 18, 25 6 T50 2', fill: 'M0 10 Q12 18, 25 6 T50 2 L 50 20 L 0 20 Z' }
    },
    points: [
      { label: 'Mon', value: 840, x: 60, y: 130 },
      { label: 'Tue', value: 1240, x: 125, y: 100 },
      { label: 'Wed', value: 1890, x: 190, y: 60 },
      { label: 'Thu', value: 2420, x: 255, y: 30 },
      { label: 'Fri', value: 1810, x: 320, y: 65 },
      { label: 'Sat', value: 980, x: 385, y: 120 },
      { label: 'Sun', value: 1450, x: 450, y: 85 }
    ],
    pathD: 'M 60 130 C 85 115, 105 110, 125 100 C 145 90, 170 75, 190 60 C 215 45, 240 35, 255 30 C 275 25, 300 55, 320 65 C 345 75, 365 105, 385 120 C 410 135, 430 100, 450 85',
    fillD: 'M 60 130 C 85 115, 105 110, 125 100 C 145 90, 170 75, 190 60 C 215 45, 240 35, 255 30 C 275 25, 300 55, 320 65 C 345 75, 365 105, 385 120 C 410 135, 430 100, 450 85 L 450 185 L 60 185 Z'
  },
  monthly: {
    title: 'Monthly Traffic Analytics',
    subtitle: 'Total monthly visit counts tracked across the last 6 months',
    activeVisitors: 2840,
    growth: '+25.3%',
    yLabels: ['40,000', '30,000', '20,000', '0'],
    sparklines: {
      today: { val: '1,980', growth: '+9.4%', path: 'M0 12 Q12 18, 25 10 T50 4', fill: 'M0 12 Q12 18, 25 10 T50 4 L 50 20 L 0 20 Z' },
      week: { val: '11,420', growth: '+11.2%', path: 'M0 15 Q15 5, 30 12 T50 2', fill: 'M0 15 Q15 5, 30 12 T50 2 L 50 20 L 0 20 Z' },
      month: { val: '58,400', growth: '+25.3%', path: 'M0 16 Q15 2, 35 12 T50 6', fill: 'M0 16 Q15 2, 35 12 T50 6 L 50 20 L 0 20 Z' }
    },
    points: [
      { label: 'Jan', value: 8200, x: 60, y: 155 },
      { label: 'Feb', value: 12400, x: 138, y: 130 },
      { label: 'Mar', value: 18900, x: 216, y: 95 },
      { label: 'Apr', value: 28400, x: 294, y: 55 },
      { label: 'May', value: 31200, x: 372, y: 40 },
      { label: 'Jun', value: 38420, x: 450, y: 25 }
    ],
    pathD: 'M 60 155 C 90 145, 115 140, 138 130 C 168 120, 190 110, 216 95 C 246 80, 270 65, 294 55 C 324 45, 345 45, 372 40 C 402 35, 425 30, 450 25',
    fillD: 'M 60 155 C 90 145, 115 140, 138 130 C 168 120, 190 110, 216 95 C 246 80, 270 65, 294 55 C 324 45, 345 45, 372 40 C 402 35, 425 30, 450 25 L 450 185 L 60 185 Z'
  }
};

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    return NextResponse.json({
      ...MOCK_DATA,
      diagnostics: {
        hasPropertyId: !!propertyId,
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
        error: 'Missing environment variables'
      }
    });
  }

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);
    
    // Fetch data for three ranges: last 24h, last 7d, last 30d
    // URL endpoint for GA4 report queries
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    // Query 1: Daily Active Users (by hour, last 24 hours)
    const dailyReportReq = fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '1dayAgo', endDate: 'today' }],
        dimensions: [{ name: 'hour' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'hour' }, desc: false }]
      })
    });

    // Query 2: Weekly Active Users (by day, last 7 days)
    const weeklyReportReq = fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'dayOfWeekName' }],
        metrics: [{ name: 'activeUsers' }],
        // We will sort days logically in the app
      })
    });

    // Query 3: Monthly Active Users (by month, last 6 months)
    const monthlyReportReq = fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '180daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'yearMonth' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'yearMonth' }, desc: false }]
      })
    });

    const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
      dailyReportReq,
      weeklyReportReq,
      monthlyReportReq
    ]);

    if (!dailyRes.ok || !weeklyRes.ok || !monthlyRes.ok) {
      throw new Error('Google Analytics API returned error response');
    }

    const [dailyData, weeklyData, monthlyData] = await Promise.all([
      dailyRes.json(),
      weeklyRes.json(),
      monthlyRes.json()
    ]);

    // Parse Daily data points
    const rawDailyRows = dailyData.rows || [];
    const dailyPoints = rawDailyRows.map((row: any, i: number) => {
      const hour = row.dimensionValues?.[0]?.value || '';
      const value = parseInt(row.metricValues?.[0]?.value || '0', 10);
      const label = `${hour}:00`;
      const x = 60 + (i * (450 - 60)) / Math.max(1, rawDailyRows.length - 1);
      return { label, value, x, y: 185 };
    });
    
    // Normalize Y heights for daily
    const dailyMax = Math.max(...dailyPoints.map((p: any) => p.value), 10);
    dailyPoints.forEach((p: any) => {
      p.y = 185 - (p.value / dailyMax) * 160;
    });
    
    const dailyPaths = generateSvgPaths(dailyPoints);

    // Parse Weekly data points
    const rawWeeklyRows = weeklyData.rows || [];
    const weeklyPoints = rawWeeklyRows.map((row: any, i: number) => {
      const rawDay = row.dimensionValues?.[0]?.value || '';
      // Capitalize first letter
      const label = rawDay.charAt(0).toUpperCase() + rawDay.slice(1).substring(0, 2);
      const value = parseInt(row.metricValues?.[0]?.value || '0', 10);
      const x = 60 + (i * (450 - 60)) / Math.max(1, rawWeeklyRows.length - 1);
      return { label, value, x, y: 185 };
    });

    const weeklyMax = Math.max(...weeklyPoints.map((p: any) => p.value), 10);
    weeklyPoints.forEach((p: any) => {
      p.y = 185 - (p.value / weeklyMax) * 160;
    });

    const weeklyPaths = generateSvgPaths(weeklyPoints);

    // Parse Monthly data points
    const rawMonthlyRows = monthlyData.rows || [];
    const monthsMap: Record<string, string> = {
      '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
      '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    const monthlyPoints = rawMonthlyRows.map((row: any, i: number) => {
      const yearMonth = row.dimensionValues?.[0]?.value || ''; // e.g. "202606"
      const monthNum = yearMonth.substring(4, 6);
      const label = monthsMap[monthNum] || monthNum;
      const value = parseInt(row.metricValues?.[0]?.value || '0', 10);
      const x = 60 + (i * (450 - 60)) / Math.max(1, rawMonthlyRows.length - 1);
      return { label, value, x, y: 185 };
    });

    const monthlyMax = Math.max(...monthlyPoints.map((p: any) => p.value), 10);
    monthlyPoints.forEach((p: any) => {
      p.y = 185 - (p.value / monthlyMax) * 160;
    });

    const monthlyPaths = generateSvgPaths(monthlyPoints);

    // Dynamic stats sums
    const totalDailySum = dailyPoints.reduce((sum: number, p: any) => sum + p.value, 0);
    const totalWeeklySum = weeklyPoints.reduce((sum: number, p: any) => sum + p.value, 0);
    const totalMonthlySum = monthlyPoints.reduce((sum: number, p: any) => sum + p.value, 0);

    const formatter = new Intl.NumberFormat('en-US');

    return NextResponse.json({
      isMock: false,
      daily: {
        title: 'Daily Traffic Analytics',
        subtitle: 'User traffic stats tracked across the last 24 hours',
        activeVisitors: rawDailyRows.length > 0 ? dailyPoints[dailyPoints.length - 1].value : 0,
        growth: '+Live',
        yLabels: [formatter.format(dailyMax), formatter.format(Math.round(dailyMax * 0.75)), formatter.format(Math.round(dailyMax * 0.5)), '0'],
        sparklines: {
          today: { val: formatter.format(totalDailySum), growth: 'live', path: '', fill: '' },
          week: { val: formatter.format(totalWeeklySum), growth: 'live', path: '', fill: '' },
          month: { val: formatter.format(totalMonthlySum), growth: 'live', path: '', fill: '' }
        },
        points: dailyPoints,
        pathD: dailyPaths.pathD,
        fillD: dailyPaths.fillD
      },
      weekly: {
        title: 'Weekly Traffic Analytics',
        subtitle: 'User traffic stats tracked across the seven days of the week',
        activeVisitors: totalWeeklySum,
        growth: '+Live',
        yLabels: [formatter.format(weeklyMax), formatter.format(Math.round(weeklyMax * 0.75)), formatter.format(Math.round(weeklyMax * 0.5)), '0'],
        sparklines: {
          today: { val: formatter.format(rawWeeklyRows.length > 0 ? weeklyPoints[weeklyPoints.length - 1].value : 0), growth: 'live', path: '', fill: '' },
          week: { val: formatter.format(totalWeeklySum), growth: 'live', path: '', fill: '' },
          month: { val: formatter.format(totalMonthlySum), growth: 'live', path: '', fill: '' }
        },
        points: weeklyPoints,
        pathD: weeklyPaths.pathD,
        fillD: weeklyPaths.fillD
      },
      monthly: {
        title: 'Monthly Traffic Analytics',
        subtitle: 'Total monthly visit counts tracked across the last 6 months',
        activeVisitors: totalMonthlySum,
        growth: '+Live',
        yLabels: [formatter.format(monthlyMax), formatter.format(Math.round(monthlyMax * 0.75)), formatter.format(Math.round(monthlyMax * 0.5)), '0'],
        sparklines: {
          today: { val: formatter.format(rawMonthlyRows.length > 0 ? monthlyPoints[monthlyPoints.length - 1].value : 0), growth: 'live', path: '', fill: '' },
          week: { val: formatter.format(totalWeeklySum), growth: 'live', path: '', fill: '' },
          month: { val: formatter.format(totalMonthlySum), growth: 'live', path: '', fill: '' }
        },
        points: monthlyPoints,
        pathD: monthlyPaths.pathD,
        fillD: monthlyPaths.fillD
      }
    });

  } catch (error) {
    console.error('Failed querying live Google Analytics Data API, using fallback mock data:', error);
    return NextResponse.json({
      ...MOCK_DATA,
      diagnostics: {
        hasPropertyId: !!propertyId,
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }
    });
  }
}
