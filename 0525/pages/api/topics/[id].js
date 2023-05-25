import db from "@/data/db";

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const topic = db.topics.find((t) => t.id == id);
      res.status(200).json(topic);
      break;
    case "PATCH":
      for (let i = 0; i < db.topics.length; i++) {
        if (db.topics[i].id == id) {
          db.topics[i].title = req.body.title;
          db.topics[i].body = req.body.body;
          res.status(200).json(db.topics[i]);
          break;
        }
      }
      res.status(404).json({ message: "Not found" });
      break;
    case "DELETE":
      // Delete Topic
      const newTopics = [];
      for (let i = 0; i < db.topics.length; i++) {
        if (db.topics[i].id != id) {
          newTopics.push(db.topics[i]);
        }
      }
      db.topics = newTopics;
      res.status(200).json({ message: "ok" });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
