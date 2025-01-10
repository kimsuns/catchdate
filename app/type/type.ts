export interface MoimDataType {
  title: string;
  status: "ready" | "completed";
  members: MoimMemberType[];
  startDate: Date | null;
  endDate: Date | null;
  time: string;
  pickDate: Date[];
  top3: Date[];
}

export interface MoimMemberType {
  memberId: string;
  name: string;
  dates: Date[];
  choose: boolean;
}
