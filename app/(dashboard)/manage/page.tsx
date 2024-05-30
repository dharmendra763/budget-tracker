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
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "@/app/(dashboard)/_components/CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import DeleteCategoryDialog from "../_components/DeleteCategoryDialog";

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
  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
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

        <Separator />

        {
          !dataAvailable &&
          <div className="flex-col-center-center h-40 w-full">
            <p>
              No
              <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-red-500")}>
                {type}
              </span>
              categories yet
            </p>

            <p className="text-muted-foreground text-sm">
              Create one to get started
            </p>
          </div>
        }

        {
          dataAvailable && (
            <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {
                categoriesQuery.data.map((category) => <CategoryCard key={category.name} category={category} />)
              }
            </div>
          )

        }
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-black/[0.1] dark:shadow-white-[0.1]">
      <div className="flex-col-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button className="flex-center w-full border-separate gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20" variant={"secondary"}>
            <TrashIcon className="size-4" />
            Remove
          </Button>
        }
      />
    </div>
  )
}