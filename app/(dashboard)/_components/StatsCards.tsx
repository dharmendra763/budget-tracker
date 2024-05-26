import { GetBalanceStateResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, TrendingUpIcon, Wallet } from "lucide-react";
import { ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

export default function StatsCards({ from, to, userSettings }: Props) {
  const statsQuery = useQuery<GetBalanceStateResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const stats = useMemo(() => {
    const income = statsQuery.data?.income || 0;
    const expense = statsQuery.data?.expense || 0;
    const balance = income - expense;
    return {
      income,
      expense,
      balance,
    };
  }, [statsQuery.data]);

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={stats.income}
          title="Income"
          icon={
            <TrendingUp className="size-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={stats.expense}
          title="Expense"
          icon={
            <TrendingDown className="size-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={stats.balance}
          title="Balance"
          icon={
            <Wallet className="size-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

function StatCard({
  formatter,
  icon,
  title,
  value,
}: {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
}) {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex-col-start gap-0">
        <p className="text-muted-foreground">{title}</p>

        <CountUp
          preserveValue
          redraw={false}
          end={value}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
}
