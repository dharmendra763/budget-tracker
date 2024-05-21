"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import CategoriesStats from "./CategoriesStats";

interface Props {
  userSettings: UserSettings;
}

export default function Overview({ userSettings }: Props) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div className="container flex-end-between flex-wrap gap-2 py-6">
      <h2 className="text-3xl font-bold">Overview</h2>

      <div className="flex items-center gap-3">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;

            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days`
              );
              return;
            }

            setDateRange({ to, from });
          }}
        />
      </div>
      <StatsCards
        from={dateRange.from}
        to={dateRange.to}
        userSettings={userSettings}
      />

      <CategoriesStats
        from={dateRange.from}
        to={dateRange.to}
        userSettings={userSettings}
      />
    </div>
  );
}
