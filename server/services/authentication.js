exports.requireAdmin = (req, res, next) => {
	if (!req.user.isAdmin) {
		return res.status(401).json({ error: 'Permission Denied' });
	}
	next();
};

exports.requireLogin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ error: 'You must Login' });
	}
	next();
};
