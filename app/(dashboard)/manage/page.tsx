"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusSquare, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";
import { Button } from "react-day-picker";

export default function page() {
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex-center-between flex-wrap gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>

        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
}

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isFetching}>
      <Card>
        <CardHeader>
          <CardTitle className="flex-center-between gap-2">
            <div className="flex-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="size-12 rounded-lg bg-red-400/10 text-red-500 p-2" />
              ) : (
                <TrendingUp className="size-12 rounded-lg bg-emerald-400/10 text-emerald-500 p-2" />
              )}
              <div>
                {type === "income" ? "Incomes" : "Expenses"} categories
                <div className="text-sm text-muted-foreground">
                  Sorted by name
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="size-4" />
                  Create Category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
      </Card>
    </SkeletonWrapper>
  );
}
