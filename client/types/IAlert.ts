export interface IAlert {
  text: string;
  error: boolean;
  timer: ReturnType<typeof setTimeout> | null;
}
