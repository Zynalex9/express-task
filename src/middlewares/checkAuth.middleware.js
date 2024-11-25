const isAuthenticated = (req, res, next) => {
    try {
      const accessToken = req.cookies?.accessToken;
      if (!accessToken) {
        return res.status(401).json({ isAuthenticated: false });
      }
  
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      if (!decodedToken) {
        return res.status(401).json({ isAuthenticated: false });
      }
  
      next();
    } catch (error) {
      return res.status(401).json({ isAuthenticated: false });
    }
  };
  export {isAuthenticated}