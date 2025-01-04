export interface WebhookSubscriber {
  id: string;
  url: string;
}

export interface WebhookEvent {
  event: string;
  payload: any;
}
