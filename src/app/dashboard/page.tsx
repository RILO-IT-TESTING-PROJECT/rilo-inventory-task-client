"use client";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="mt-6 p-5">
      This is dashboard root content. Welcome{" "}
      <span className="font-bold">
        {session?.user?.user?.firstName && session?.user?.user?.lastName
          ? `${session.user.user.firstName} ${session.user.user.lastName}`
          : session?.user?.name || "User"}
      </span>{" "}
      to the dashboard.
    </div>
  );
};

export default page;
