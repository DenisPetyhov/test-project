module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b01e35398e7dce4d06ed44db5df2a523'),
  },
});
