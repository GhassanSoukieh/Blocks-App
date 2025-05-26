export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type Content = {
  id: string;
  title: string;
  text: string;
  date: Date;
};

export type BlockProps = {
  id: string | null;
  date?: Date | null;
  content?: Content[] | null;
  color?: string | null;
  status?: string | null;
  className?: string | null;
};
