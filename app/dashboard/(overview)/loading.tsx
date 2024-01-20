// loading.tsx is a special Next.js file built on top of Suspense,
// it allows you to create fallback UI to show as a replacement while page content loads.

import React from 'react';
import DashboardSkeleton from "@/app/ui/skeletons";

function Loading() {
    return <DashboardSkeleton/>
}

export default Loading;