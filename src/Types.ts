export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type Content = {
  id: string;
  title: string;
  text: string;
  date?: Date | null;
  type?: Type | null;
};

export type Type = {
  id: string; 
  name: string; 
  icon: string ; 
}

export type BlockProps = {
  id: string;
  date?: Date;
  color?: string | null;
  status?: string | null;
  className?: string | null;
  content?: Content[] | null;
};

export type CalendarProps = {
  className?: string;
  contents?: Content[];
};

export type BlockDetailsProps = {
  contents?: Content[];
};
