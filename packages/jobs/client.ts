import { EventSchemas, Inngest } from 'inngest';

type ProspectCreatedEvent = {
  data: {
    prospect: {
      id: string;
    };
  };
};

type Events = {
  'prospect/created': ProspectCreatedEvent;
};

export const inngest = new Inngest({
  id: 'hype',
  isDev: process.env.NODE_ENV !== 'production',
  schemas: new EventSchemas().fromRecord<Events>(),
});
