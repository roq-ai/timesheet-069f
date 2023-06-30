const mapping: Record<string, string> = {
  companies: 'company',
  timesheets: 'timesheet',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
