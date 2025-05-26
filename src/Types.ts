export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type BlockProps = {
  id: string | null;
  date?: Date | null;
  color?: string | null;
  status?: string | null;
  className?: string | null;
  text?: string | null;
  title?: string | null;
};
