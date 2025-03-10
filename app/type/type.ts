export interface MoimDataType {
  title: string;
  status: "ready" | "completed";
  members: MoimMemberType[];
  startDate: Date | null;
  endDate: Date | null;
  time: string;
  allPickDate: MoimPickDateType[];
  topDate: MoimPickDateType[];
}

export interface MoimMemberType {
  memberId: string;
  name: string;
  dates: Date[];
  choose: boolean;
}

export interface MoimPickDateType {
  date: Date;
  count: number;
  members: string[];
}
