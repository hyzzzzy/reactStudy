import db from "@/data/db";

// nextjs는 frontend + backend이다. backend는 pages/api 폴더에 routing 규칙에 맞게 만든다.
export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(db.topics);
      break;
    case "POST":
      const newTopic = {
        id: Date.now().toString(),
        title: req.body.title,
        body: req.body.body,
      };
      db.topics.push(newTopic);
      res.status(201).json(newTopic);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
