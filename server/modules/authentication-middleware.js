const rejectUnauthenticated = (req, res, next) => {
  // check if logged in

  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    if (req.user.role_id === null || req.user.role_id < 2) {
      res.sendStatus(403);
    } else if (req.user.role_id > 1) {
      next();
    }
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

// const rejectUnauthenticated = (req, res, next) => {
//   // Check if the user is logged in
//   if (req.isAuthenticated()) {
//     // Check if the user has a role and it's not 'unassigned'
//     if (req.user.role && req.user.role !== "unassigned") {
//       // The user is authenticated and has a role other than 'unassigned', allow access
//       next();
//     } else {
//       // The user is authenticated but doesn't have an assigned role
//       res.status(403).send("Access denied. No role assigned.");
//     }
//   } else {
//     // The user is not authenticated
//     res.sendStatus(401);
//   }
// };

module.exports = { rejectUnauthenticated };
