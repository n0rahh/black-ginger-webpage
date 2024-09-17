import { https } from 'firebase-functions';
import axios from 'axios';
import functions from 'firebase-functions';

export const calculateDistance = https.onRequest(async (req, res) => {
  const { origin, destination } = req.query;

  const apiKey = functions.config().googlemaps.key;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&units=metric&key=${apiKey}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error calculating distance');
  }
});
