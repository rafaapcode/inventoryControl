export default function adm(req, res, next) {
  if (!req.user.admin) {
    return res.status(401).json({ error: 'You must be an admin to do this action.' });
  }

  next();
}
