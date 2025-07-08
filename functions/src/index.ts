import * as cors from "cors";
import * as admin from "firebase-admin";
import {google} from "googleapis";
import {onRequest} from "firebase-functions/https";
import {logger} from "firebase-functions";
import * as dotenv from "dotenv";
import {getFirestore} from "firebase-admin/firestore";
dotenv.config();

// Habilita CORS
const corsHandler = cors({origin: true});

admin.initializeApp();
const db = getFirestore();

const auth = new google.auth.JWT({
  email: process.env.CALENDAR_CLIENT_EMAIL,
  key: (process.env.CALENDAR_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const CALENDAR_ID = process.env.CALENDAR_ID || "iisystemsbg@gmail.com";

export const getCalendarSlots = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const calendar = google.calendar({version: "v3", auth});

      const date = req.query.date as string;
      if (!date) {
        res
          .status(400)
          .send("Select a date (?date=YYYY-MM-DD)");
        return;
      }

      const dayStart = new Date(`${date}T00:00:00+02:00`);
      const dayEnd = new Date(`${date}T23:59:59+02:00`);

      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: dayStart.toISOString(),
          timeMax: dayEnd.toISOString(),
          timeZone: "Europe/Madrid",
          items: [{id: CALENDAR_ID}],
        },
      });
      res.json({
        date,
        busy: response.data?.calendars?.[CALENDAR_ID].busy || null,
      });
    } catch (err) {
      logger.error("Error accessing the calendar:", err);
      res.status(500).send("Error accessing Google Calendar");
    }
  });
});
export const reserveSlot = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const {name, email, dateStart, endDateTime} = req.body;
      console.log("Received data:", req.body);

      if (!name || !email || !dateStart || !endDateTime) {
        res.status(400).send("Missing required fields");
        return;
      }
      await db.collection("calendar-requests").add({
        name,
        email,
        dateStart,
        createdAt: new Date().toISOString(),
      });

      const startDateTime = new Date(dateStart);
      const endDateTimeF = new Date(endDateTime);

      const calendar = google.calendar({version: "v3", auth});

      const event = {
        summary: `Slot request from ${name}`,
        description: "Web slot request",
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "Europe/Madrid",
        },
        end: {
          dateTime: endDateTimeF.toISOString(),
          timeZone: "Europe/Madrid",
        },
      };

      const response = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
      });

      res.status(200).json({
        message: "Event created",
        eventId: response.data.id,
        htmlLink: response.data.htmlLink,
      });
    } catch (err) {
      logger.error("Error creating the event:", err);
      res.status(500).send("Couldn't create the event");
    }
  });
});
