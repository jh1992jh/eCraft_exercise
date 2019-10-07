interface Participant {
  name: string;
  title: string;
}

export class Meeting {
  constructor(
    public Id: string,
    public Subject: string,
    public Organizer: string,
    public StartTime: string,
    public EndTime: string,
    public Participants: Participant[] | null
  ) {}
}
