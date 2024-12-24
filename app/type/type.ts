export interface MoimDataType {
  title: string;
  status: string;
  members: {
    memberId: string;
    name: string;
    dates: string[];
    choose: boolean;
  }[];
  startDate: Date;
  endDate: Date;
  time: string;
  pickDate: Date[];
  top3: Date[];
}
