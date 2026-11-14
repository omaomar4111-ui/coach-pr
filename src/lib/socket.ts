export function getInboxSocket() {
  return {
    connected: true,
    on: () => {},
    off: () => {},
    emit: () => {},
  } as any;
}
