const checkAutho = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User data not found' });
        }

        res.status(200).json({
            message: 'User is authorized',
            user: {
                id: req.user.id,
                email: req.user.email,
                username: req.user.username
            }
        });
    } catch (err) {
        console.error('CheckAuth Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { checkAutho }
