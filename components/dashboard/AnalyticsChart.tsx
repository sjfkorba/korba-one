"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

type Props = {
  data: { date: string; views: number }[]
}

export default function AnalyticsChart({ data }: Props) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Profile Views",
        data: data.map((item) => item.views),
      },
    ],
  }

  return <Line data={chartData} />
}
