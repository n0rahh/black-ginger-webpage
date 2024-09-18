import { https } from 'firebase-functions';
import axios from 'axios';
import cors from 'cors';

const allowedOrigins = [
  'https://black-ginger.web.app',
  'http://localhost:5173',
];

const handleCors = cors({
  origin: (origin, callback) => {
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed);
  },
});

export const calculateDistance = https.onRequest(async (req, res) => {
  handleCors(req, res, async () => {
    const { origin, destination } = req.query;

    // eslint-disable-next-line no-undef
    const apiKey = process.env.GOOGLEMAPS_KEY;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&units=metric&key=${apiKey}`,
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error calculating distance');
    }
  });
});
