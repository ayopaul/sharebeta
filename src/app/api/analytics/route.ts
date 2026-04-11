import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID!;

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL!,
    private_key: process.env.GA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  try {
    // Run all queries in parallel
    const [overviewRes, pagesRes, dailyRes] = await Promise.all([
      // Overview metrics (last 30 days)
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      // Top pages
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      // Daily visitors (last 14 days)
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "14daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
      }),
    ]);

    const overviewRow = overviewRes[0]?.rows?.[0];
    const overview = {
      users: Number(overviewRow?.metricValues?.[0]?.value ?? 0),
      sessions: Number(overviewRow?.metricValues?.[1]?.value ?? 0),
      pageViews: Number(overviewRow?.metricValues?.[2]?.value ?? 0),
      avgDuration: Number(overviewRow?.metricValues?.[3]?.value ?? 0),
      bounceRate: Number(overviewRow?.metricValues?.[4]?.value ?? 0),
    };

    const topPages = (pagesRes[0]?.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      views: Number(row.metricValues?.[0]?.value ?? 0),
      users: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    const daily = (dailyRes[0]?.rows ?? []).map((row) => {
      const d = row.dimensionValues?.[0]?.value ?? "";
      return {
        date: `${d.slice(4, 6)}/${d.slice(6, 8)}`,
        users: Number(row.metricValues?.[0]?.value ?? 0),
        sessions: Number(row.metricValues?.[1]?.value ?? 0),
      };
    });

    return NextResponse.json({ overview, topPages, daily });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
