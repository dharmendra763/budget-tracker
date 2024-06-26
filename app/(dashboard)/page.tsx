import CreateTransactionDialog from "@/app/(dashboard)/_components/CreateTransactionDialog";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Overview from "./_components/Overview";
import History from "./_components/History";

async function page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex-center-between flex-wrap gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}!</p>

          <div className="flex-center gap-3">
            <CreateTransactionDialog
              type="income"
              trigger={
                <Button
                  variant="outline"
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New Income
                </Button>
              }
            />

            <CreateTransactionDialog
              type="expense"
              trigger={
                <Button
                  variant="outline"
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                >
                  New Expense
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
}

export default page;
