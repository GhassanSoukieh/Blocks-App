class block {
  blockname;
  date;
  blocktype;
  content;

  constructor() {
    this.blockname = "";
    this.date = "";
    this.blocktype = "";
    this.content = "";
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      date: this.date,
      content: this.content,
    };
  }
} // end of class block
export default block;
