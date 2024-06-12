import prisma from "@/lib/prisma";
import { Period, TimeFrame } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { getDaysInMonth } from "date-fns";
import { redirect } from "next/navigation";
import { z } from "zod";

const getHistoryDataSchema = z.object({
  timeframe: z.enum(["month", "year"]),
  month: z.coerce.number().min(0).max(11).default(0),
  year: z.coerce.number().min(2000).max(3000),
});

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    const queryParams = getHistoryDataSchema.safeParse({
      timeframe,
      year,
      month,
    });

    if (!queryParams.success) {
      return Response.json(queryParams.error.message, {
        status: 400,
      });
    }

    const data = await getHistoryData(user.id, queryParams.data.timeframe, {
      year: queryParams.data.year,
      month: queryParams.data.month,
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({}, {status: 500, "statusText": "Internal Server Error"});
  }
}

export type getHistoryDataResponseType = Awaited<
  ReturnType<typeof getHistoryData>
>;

async function getHistoryData(
  userId: string,
  timeFrame: TimeFrame,
  period: Period
) {
  switch (timeFrame) {
    case "year":
      return getYearHistoryDate(userId, period.year);
    case "month":
      return getMonthHistoryDate(userId, period.year, period.month);
  }
}

type HistoryData = {
  expense: number;
  income: number;
  year: number;
  month: number;
  day?: number;
};

async function getYearHistoryDate(userId: string, year: number) {
  const result = await prisma.yearHistory.groupBy({
    by: ["month"],
    where: {
      userId,
      year,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [{ month: "asc" }],
  });

  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];

  for (let i = 0; i < 12; i++) {
    let expense = 0;
    let income = 0;
    const month = result.find((row) => row.month === i);
    if (month) {
      expense = month._sum.expense || 0;
      income = month._sum.income || 0;
    }

    history.push({
      expense,
      income,
      month: i,
      year: year,
    });
  }

  return history;
}

async function getMonthHistoryDate(
  userId: string,
  year: number,
  month: number
) {
  const result = await prisma.monthHistory.groupBy({
    by: ["day"],
    where: {
      userId,
      year,
      month,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [
      {
        day: "asc",
      },
    ],
  });

  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];

  const daysInMonth = getDaysInMonth(new Date(year, month));

  for (let i = 0; i < daysInMonth; i++) {
    let expense = 0;
    let income = 0;
    const day = result.find((row) => row.day === i);
    if (day) {
      expense = day._sum.expense || 0;
      income = day._sum.income || 0;
    }

    history.push({
      expense,
      income,
      month,
      year,
      day: i,
    });
  }

  return history;
}
