"use client";

import useFollowerInfo from "@/hooks/use-follower-info";
import { formatNumber } from "@/lib/utils";
import { FollowerInfo } from "@/types/follower.type";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
