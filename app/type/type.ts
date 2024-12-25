export interface MoimDataType {
  title: string;
  status: string;
  members: MoimMemberType[];
  startDate: Date;
  endDate: Date;
  time: string;
  pickDate: Date[];
  top3: Date[];
}

export interface MoimMemberType {
  memberId: string;
  name: string;
  dates: string[];
  choose: boolean;
}
