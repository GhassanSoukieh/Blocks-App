export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type Content = {
  title: string;
  text: string;
};

export type BlockProps = {
  id: string;
  date: Date;
  content: Content[];
  color: string;
  status: string;
};
