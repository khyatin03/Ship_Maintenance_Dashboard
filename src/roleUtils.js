export const canEditShip = (role) => role === "Admin";
export const canEditJob  = (role) => role === "Admin" || role === "Engineer";
